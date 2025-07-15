import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET = "something";
const profile = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await userModel.findByIdAndUpdate(id, body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
const showUsers = async (req, res) => {
  try {
    const { page = 1, limit = 1, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const count = await userModel.countDocuments({
      firstname: { $regex: search, $options: "i" },
    });

    const total = Math.ceil(count / limit);

    const users = await userModel
      .find({ firstname: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ updatedAt: -1 });  // Ensure your schema has updatedAt field.

    res.status(200).json({ users, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const userObj = {
          firstname: existingUser.firstname,
          email: existingUser.email,
          role: existingUser.role,
        };
        const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
        res.status(200).json({ user: userObj, token });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const register = async (req, res) => {
  try {
    const { firstname,lastname, email, password } = req.body;
    const hashedpwd = await bcrypt.hash(password, 10);
    const user = {
      firstname,
        lastname,
      email,
      password: hashedpwd,

    };
    const result = await userModel.create(user);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const addUser = async (req, res) => {
  try {
    const body = req.body;
    const hashedpwd = await bcrypt.hash(body.password, 10);
    body.password = hashedpwd;
    const result = await userModel.create(body);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProfile =async(req,res)=>{
  try{
    const id=req.params.id;
    const{firstname,lastname,email}=req.body;
    const userObj={
      firstname,
      lastname,
      email
    }
    const result=await userModel.findByIdAndUpdate(id,userObj)
    res.status(200).json(result);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"something went wrong"})
  }
}

export { register,login,showUsers,deleteUser,updateUser,profile,updateProfile , addUser };