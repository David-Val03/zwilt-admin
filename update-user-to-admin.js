/**
 * Update user accountType to ADMIN in MongoDB
 * Run: node update-user-to-admin.js
 */
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// You may need to set MONGODB_URI if not already in .env.local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zwilt';

// The email of the user you want to make admin
const USER_EMAIL = process.argv[2] || 'admin@zwilt.com';

async function updateUser() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully');

        const User = mongoose.connection.collections['users'] || 
                     mongoose.connection.db.collection('users');

        // Find the user
        const user = await User.findOne({ email: USER_EMAIL.toLowerCase() });
        
        if (!user) {
            console.error(`❌ User with email "${USER_EMAIL}" not found`);
            
            // List all users to help
            const allUsers = await User.find({}, { email: 1, accountType: 1, name: 1 }).limit(10);
            console.log('\nAvailable users:');
            allUsers.forEach(u => console.log(`  - ${u.email} (${u.accountType}) - ${u.name}`));
            await mongoose.disconnect();
            process.exit(1);
        }

        console.log(`Found user: ${user.name} (${user.email})`);
        console.log(`Current accountType: ${user.accountType}`);

        // Update to ADMIN
        const result = await User.updateOne(
            { email: USER_EMAIL.toLowerCase() },
            { $set: { accountType: 'ADMIN' } }
        );

        console.log(`✅ Updated accountType to 'ADMIN'`);
        console.log(`Modified: ${result.modifiedCount}`);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

updateUser();
