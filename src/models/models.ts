import { Schema, model } from "mongoose";
import { Posts, Users } from "../types/types.js";

const usersSchema = new Schema<Users>({
  _id: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  role: String,
});

const postsSchema = new Schema<Posts>({
  _id: String,
  title: String,
  author: String,
  postBody: String,
  postImage: String,
  postDate: {type: Date, default: Date.now},
});

const Users = model("Users", usersSchema);
const Posts = model("Post", postsSchema);

export {
  Users,
  Posts,
};
