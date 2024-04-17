let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let checkoutCollection = new Schema ({
    username :{
        type: String,
        required: true
    },
    cartItem : {
        type : Schema.Types.ObjectId,
        ref: "CART",
        default : null,
        // required : true
    },

    paymentMethod:[{
        type: String,
        default: "UPI"
    }]
    

},
    {timestamps : true}
);

module.exports = mongoose.model("CHECKOUT", checkoutCollection);