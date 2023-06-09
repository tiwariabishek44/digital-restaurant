const mongoose = require("mongoose")
const ObjectID = mongoose.Schema.Types.ObjectId;

const dealSchema = mongoose.Schema({

    owner: {
        type: ObjectID,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
        trim: true,
        
    }
    , description: {
        type: String,
        required: true,
    },
    image: [
        {
            type: String,
            required: true
        },

    ],
    
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    
    limit: {
        type: Number,
        required: true,
    }
});
const Deal = mongoose.model("Deal", dealSchema);
module.exports = {
    Deal, dealSchema
}