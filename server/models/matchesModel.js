const mongoose = require('mongoose');
const MatchSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    team:{
        type:JSON,
        required:true
    },
    matchId:{
        type:Number,
    },
})

const Match=mongoose.model('Match',MatchSchema);
module.exports=Match;