const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true 
    }
});

/*userSchema.path('username').validate(async (username) => {
    const usernameCount = await mongoose.models.users.countDocuments({ username })
    return !usernameCount
  }, 'Username already exists')*/

exports.userSchema = userSchema;