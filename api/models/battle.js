const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "name": String,
    "year": Number,
    "battle_number": Number,
    "attacker_king": String,
    "defender_king": String,
    "attacker_1": String,
    "attacker_2": String,
    "attacker_3": String,
    "attacker_4": String,
    "defender_1": String,
    "defender_2": String,
    "defender_3": String,
    "defender_4": String,
    "attacker_outcome": String,
    "battle_type": String,
    "major_death": String,
    "major_capture": String,
    "attacker_size": Number,
    "defender_size": Number,
    "attacker_commander": String,
    "defender_commander": String,
    "summer": Number,
    "location": String,
    "region": String,
    "note": String
});

module.exports = mongoose.model('Battle', battleSchema)
