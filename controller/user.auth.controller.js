const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("Please fill in all fields");
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      res.status(404).json({ message: "Email already exists" });
      throw new Error("Email already exists");
    }

    const newUser = await User.create({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    if (newUser) {
      const { username, email, password, _id } = newUser;
      res
        .status(201)
        .json({
          message: "Now login",
          username,
          email,
          password,
          _id,
          token,
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Email not found register  first" });
    throw new Error("Email not found register  first");
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    res.status(404).json({ message: "Password not found " });
    throw new Error("Password not found ");
  }

  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });


  res.status(200).json({ message: "Login ", token, user:{
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    profile:  user.profile,
  }});

};

// logout 
const logout = async (req,res) =>{
  try {
    res.clearCookie('token')
    res.status(200).send({ message: " logout  success  " });

  } catch (error) {
    console.log(" login out faild :", error);
    res.status(404).send({ message: "login out faild " });
  }
}

module.exports = {register , login ,  logout};