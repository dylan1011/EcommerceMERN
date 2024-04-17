let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productCollection = new Schema (
    {
        productId : {
            type : String,
            required : true
        },

        productName : {
            type : String,
            required : true
        },

        productImage : {
            type : String,
            default : "https://www.thewall360.com/uploadImages/ExtImages/images1/def-638240706028967470.jpg"
        },

        productDescription : {
            type : String,
            default : " "
        },

        productCost : {
            type : Number,
            // required : true,
            default : 0
        },
        
        productDiscount : {
            type : Number,
            default : 0
        },

        productStock : {
            type : Number,
            default : 0
        }
        
    },
    {timestamps : true}
);

module.exports = mongoose.model("PRODUCT", productCollection);