const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profile:{
        type:String,
        // required:true,
        default:'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'
    },
    bio:{
        type:String,
        // required:true,
        default:'Full stack Developer'
    },
    role:{
        type:String,
        enum:['user' , 'admin'],
        default:'user'

    }
},{timestamps:true})

// hash pass
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
  
    const hashPass = await bcrypt.hash(user.password, 10);
    user.password = hashPass;
  
    next();
  });
  
  // match password
  userSchema.methods.comparePassword = function (userPass) {
    return bcrypt.compare(userPass, this.password);
  };

const User  = mongoose.model('User' , userSchema);
module.exports = User;  //export the model to use it in other files