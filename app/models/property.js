let mongoose = require('mongoose');

let Property = new mongoose.Schema({
    address : {
        type:String,
        default:null
    },
    bedroom:{
        type: Number,
        default: 0
    },
    bathroom:{
        type:Number,
        default:0
    },
    description:{
        type:String,
        default:null
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    isDeleted: {
        type : Boolean,
        default : false
    }
    
},{
    timestamps: true
});

module.exports = mongoose.model('property', Property);