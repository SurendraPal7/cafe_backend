import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
const Router = express.Router();
import {
  register,
  login,
  profile,
  updateUser,
  deleteUser,
  showUsers,
  updateProfile,
  addUser
} from "../controllers/userController.js";
Router.post("/register", register);
Router.post("/login", login);
// Router.get("/showusers", authenticate, authorize("admin"), showUsers);
Router.get("/showusers",showUsers);

Router.patch("/:id", updateUser);
Router.delete("/:id", deleteUser);

// Router.delete("/:id", authenticate, authorize("admin"), deleteUser);
Router.get("/:id/profile", authenticate, profile);
Router.patch("/api/users/:id/profile",authenticate,updateProfile);
Router.post("/addusers",addUser);


export default Router;