const {  mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        // required: true
        default:'ok'
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
},{timestamps:true})

const  Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;  //exporting the model to use in other files