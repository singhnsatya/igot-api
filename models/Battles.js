import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const battleSchema = new Schema({
    "name": String,
    "year": Schema.Types.Mixed,
    "battle_number": Schema.Types.Mixed,
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
    "major_death": Schema.Types.Mixed,
    "major_capture": Schema.Types.Mixed,
    "attacker_size": Schema.Types.Mixed,
    "defender_size": Schema.Types.Mixed,
    "attacker_commander": String,
    "defender_commander": String,
    "summer": Schema.Types.Mixed,
    "location": String,
    "region": String,
    "note": String
})

module.exports = mongoose.model('Battle', battleSchema);
