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
/*
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
*/

//user routes
Router.post("/register", register);
Router.post("/login", login);
Router.get("/:id/profile", profile);
Router.patch("/:id/profile", updateProfile);

//admin routes
Router.get("/", authenticate, authorize("admin"), showUsers);
Router.post("/", authenticate, authorize("admin"), addUser);
Router.get("/:id", authenticate, authorize("admin"), getUser);
Router.patch("/:id", authenticate, authorize("admin"), updateUser);
Router.delete("/:id", authenticate, authorize("admin"), deleteUser);


export default Router;