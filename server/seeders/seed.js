const db = require('../config/connection');
const {User, Appointments} = require('../models');
const userSeeds = require('./userSeeds.json');

db.once('open', async() => {
    await User.deleteMany({});
    
    await User.create(userSeeds);

    console.log('Seeds Created!');
    process.exit(0);
});