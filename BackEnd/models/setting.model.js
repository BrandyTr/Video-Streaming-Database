const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: {type:String,default:'moviesInitialized'},
  value: {type:String,default:false},
});

const Settings = mongoose.model('Settings', settingsSchema);
module.exports = Settings;
