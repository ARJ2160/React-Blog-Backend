import { Schema, model } from "mongoose";
// <----------------------- Creating Two Schemas ---------------------------------->

const usersSchema = new Schema({
  _id: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  role: String,
});

const postsSchema = new Schema({
  _id: String,
  title: String,
  author: String,
  postBody: String,
  imagesrc: String,
});

//<----------------------- Creating Two Models ---------------------------------->
const Users = model("Users", usersSchema);
const Posts = model("Post", postsSchema);

//<----------------------- Export Models ---------------------------------->
export {
  Users,
  Posts,
};
