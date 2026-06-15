const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const https = require('https');

// ==========================================
//  DATABASE CONNECTION CACHING
// ==========================================
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://yashsitaphale_db_user:Sarthak%40123@cluster0.xgnnvp0.mongodb.net/dsaquest?retryWrites=true&w=majority";
  
  // Set mongoose options
  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };
  
  cachedConnection = await mongoose.connect(MONGODB_URI, options);
  return cachedConnection;
}

// ==========================================
//  MONGOOSE SCHEMAS & MODELS
// ==========================================
const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: 'Warrior' },
  avatar: { type: String, default: '⚔️' },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  joinedAt: { type: Date, default: Date.now },
  progress: { type: Map, of: String, default: {} },
  badges: { type: Map, of: String, default: {} },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActive: { type: String, default: null },
    milestones: { type: [Number], default: [] }
  },
  heatmap: { type: Map, of: Number, default: {} },
  xpLog: { type: Map, of: Number, default: {} },
  squadCode: { type: String, default: null, index: true }
});

const SquadSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Squad = mongoose.models.Squad || mongoose.model('Squad', SquadSchema);

// ==========================================
//  FIREBASE TOKEN VERIFICATION
// ==========================================
let googleCertsCache = null;
let googleCertsExpiry = 0;

function fetchGoogleCerts() {
  return new Promise((resolve, reject) => {
    if (googleCertsCache && Date.now() < googleCertsExpiry) {
      return resolve(googleCertsCache);
    }
    
    https.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const certs = JSON.parse(data);
          googleCertsCache = certs;
          // Cache for 6 hours
          googleCertsExpiry = Date.now() + 6 * 60 * 60 * 1000;
          resolve(certs);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function verifyFirebaseToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or malformed Authorization header');
  }
  
  const token = authHeader.split('Bearer ')[1];
  const decoded = jwt.decode(token, { complete: true });
  
  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new Error('Invalid JWT structure');
  }
  
  const certs = await fetchGoogleCerts();
  const pubKey = certs[decoded.header.kid];
  
  if (!pubKey) {
    throw new Error('Corresponding public certificate not found');
  }
  
  const PROJECT_ID = 'ai-tmp-986a4';
  
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      pubKey,
      {
        algorithms: ['RS256'],
        audience: PROJECT_ID,
        issuer: `https://securetoken.google.com/${PROJECT_ID}`
      },
      (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      }
    );
  });
}

// ==========================================
//  ROUTING HANDLER
// ==========================================
exports.handler = async (event, context) => {
  // CORS configuration
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    await connectToDatabase();
    
    // Authenticate client
    const userPayload = await verifyFirebaseToken(event.headers.authorization);
    const uid = userPayload.sub;
    
    // Parse routing path
    const path = event.path.replace(/^\/\.netlify\/functions\/api/, '').replace(/^\/api/, '');
    
    // ----------------------------------------------------
    //  GET /api/progress - Fetch user progress
    // ----------------------------------------------------
    if (event.httpMethod === 'GET' && path === '/progress') {
      let user = await User.findOne({ uid });
      
      if (!user) {
        // Create user with initial state if new
        user = new User({
          uid,
          name: userPayload.name || 'Warrior',
          joinedAt: new Date(),
          streak: {
            current: 0,
            longest: 0,
            lastActive: null,
            milestones: []
          }
        });
        await user.save();
      }
      
      // Fetch squad name if they are in one
      let squad = null;
      if (user.squadCode) {
        squad = await Squad.findOne({ code: user.squadCode }, 'code name');
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          profile: {
            name: user.name,
            avatar: user.avatar,
            xp: user.xp,
            level: user.level,
            joinedAt: user.joinedAt
          },
          progress: user.progress || {},
          badges: user.badges || {},
          streak: user.streak || { current: 0, longest: 0, lastActive: null, milestones: [] },
          heatmap: user.heatmap || {},
          xpLog: user.xpLog || {},
          squad
        })
      };
    }
    
    // ----------------------------------------------------
    //  POST /api/progress - Sync user progress
    // ----------------------------------------------------
    if (event.httpMethod === 'POST' && path === '/progress') {
      const data = JSON.parse(event.body);
      
      let user = await User.findOne({ uid });
      
      if (!user) {
        user = new User({ uid });
      } else if (data.onlyIfNew) {
        // If we only want to set initial data for a new user and this user already exists, skip
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ status: 'ignored_existing' })
        };
      }
      
      if (data.profile) {
        if (data.profile.name) user.name = data.profile.name;
        if (data.profile.avatar) user.avatar = data.profile.avatar;
        if (data.profile.xp !== undefined) user.xp = data.profile.xp;
        if (data.profile.level !== undefined) user.level = data.profile.level;
      }
      
      if (data.progress) user.progress = data.progress;
      if (data.badges) user.badges = data.badges;
      if (data.streak) user.streak = data.streak;
      if (data.heatmap) user.heatmap = data.heatmap;
      if (data.xpLog) user.xpLog = data.xpLog;
      
      await user.save();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'synced' })
      };
    }
    
    // ----------------------------------------------------
    //  GET /api/leaderboard - Fetch rankings
    // ----------------------------------------------------
    if (event.httpMethod === 'GET' && path === '/leaderboard') {
      const user = await User.findOne({ uid }, 'squadCode');
      
      let squadMembers = [];
      let squadName = "Demo Squad";
      let squadCode = "DEMO01";
      
      if (user && user.squadCode) {
        const squad = await Squad.findOne({ code: user.squadCode });
        if (squad) {
          squadName = squad.name;
          squadCode = squad.code;
          // Find all users in this squad
          const members = await User.find({ squadCode: user.squadCode })
            .select('name avatar xp streak progress')
            .sort({ xp: -1 });
            
          squadMembers = members.map(m => ({
            name: m.name,
            avatar: m.avatar,
            xp: m.xp,
            streak: m.streak?.current || 0,
            completed: m.progress ? m.progress.size : 0
          }));
        }
      }
      
      // Fetch global top 100
      const globalUsers = await User.find({})
        .select('uid name avatar xp')
        .sort({ xp: -1 })
        .limit(100);
        
      const globalList = globalUsers.map((u, i) => ({
        name: u.name,
        avatar: u.avatar,
        xp: u.xp,
        isYou: u.uid === uid
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          squadName,
          squadCode,
          squadMembers,
          globalList
        })
      };
    }
    
    // ----------------------------------------------------
    //  POST /api/squad - Handle Squad Actions
    // ----------------------------------------------------
    if (event.httpMethod === 'POST' && path === '/squad') {
      const data = JSON.parse(event.body);
      const action = data.action; // 'create', 'join', 'leave'
      
      let user = await User.findOne({ uid });
      if (!user) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: 'User not found' }) };
      }
      
      if (action === 'create') {
        const squadName = data.name || 'My Squad';
        
        // Generate a unique squad code (6 characters)
        let squadCode;
        let isUnique = false;
        while (!isUnique) {
          const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
          squadCode = '';
          for (let i = 0; i < 6; i++) squadCode += chars[Math.floor(Math.random() * chars.length)];
          
          const existing = await Squad.findOne({ code: squadCode });
          if (!existing) isUnique = true;
        }
        
        const newSquad = new Squad({
          code: squadCode,
          name: squadName,
          createdBy: uid,
          createdAt: new Date()
        });
        
        await newSquad.save();
        
        user.squadCode = squadCode;
        await user.save();
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ squad: { code: squadCode, name: squadName } })
        };
      }
      
      if (action === 'join') {
        const code = (data.code || '').trim().toUpperCase();
        
        const squad = await Squad.findOne({ code });
        if (!squad) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Squad code not found. Check and retry.' })
          };
        }
        
        user.squadCode = code;
        await user.save();
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ squad: { code: squad.code, name: squad.name } })
        };
      }
      
      if (action === 'leave') {
        user.squadCode = null;
        await user.save();
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true })
        };
      }
    }
    
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: `Route ${event.httpMethod} ${path} not found` })
    };
    
  } catch (err) {
    console.error("API error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' })
    };
  }
};
