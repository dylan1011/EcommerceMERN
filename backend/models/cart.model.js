let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cartCollection = new Schema (
    {
        username : {
            type : String,
            // default : 0,
            required : true
        },

        items : {
            type:[{
                productId : {
                    type: String,
                    required: true
                },
                productName : {
                    type: String,
                    required: true
                },
                productImage:{
                    type: String,
                    required:true
                },
                quantity:{
                    type: Number,
                    default: 1
                    // required: true
                },
                itemCost:{
                    type:Number,
                    default: 0
                    // required: true
                }
                
        }],
        default: []
        },
        totalCost : {
            type : Number,
            // required : true,
            default : 0
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model("CART", cartCollection);