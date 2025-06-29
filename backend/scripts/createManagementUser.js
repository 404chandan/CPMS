const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const User = require('../models/user.model'); // Check the correct path

const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
    console.error('❌ MongoDB URL is missing in .env file. Check MONGODB_URL');
    process.exit(1);
}

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
});

const createManagementUser = async () => {
    try {
        const existingUser = await User.findOne({ email: 'management@cpms.com' });

        if (existingUser) {
            console.log('⚠️ Management user already exists.');
            return;
        }

        const user = new User({
            name: 'Management Admin',
            email: 'management@cpms.com',
            password: 'Manager@123', // ⚠️ Plain text password (NOT SAFE)
            role: 'management_admin',
            profile: 'https://res.cloudinary.com/default-profile.png',
            isProfileCompleted: false,
            token: '',
            createdAt: new Date(),
        });

        await user.save();
        console.log('✅ Management user created successfully');
    } catch (error) {
        console.error('❌ Error creating management user:', error);
    } finally {
        mongoose.disconnect();
    }
};

createManagementUser();
