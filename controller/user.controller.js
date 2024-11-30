const User = require("../model/user.model");

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({}, "role email id profile");
    res.status(200).json(user);
  } catch (error) {
    console.log(" get all user faild", error);
    res.status(404).json({ message: "get all user faild" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error, "deleted  user faild");
    res.status(404).json({ message: "deleted user not found" });
  }
};
const oneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "user deleted successfully" , user});
  } catch (error) {
    console.log(error, "deleted  user faild");
    res.status(404).json({ message: "deleted user not found" });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    console.log(id, role);

    const user = await User.findByIdAndUpdate(id, { role });
    if (!user) return res.status(404).json({ message: "user not found", user });
    res.status(200).json({ message: "user role updated successfully" });
  } catch (error) {
    console.log(error, "Update   user role faild");
    res.status(404).json({ message: "Update  user  role found" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { id, username, profile, email } = req.body;
    if (!id) return res.status(404).json({ message: "id is required" });

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "user not found" });

    console.log(req.file);

    // update profile
    user.username = username;
    user.profile = profile;
    user.email = email;

    await user.save();
    res.status(200).json({
      message: "user profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        profile: user.profile,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllUser, deleteUser, updateRole, updateProfile , oneUser};
