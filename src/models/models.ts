import { Schema, model } from "mongoose";
// <----------------------- Creating Two Schemas ---------------------------------->

export interface Users {
  _id: String;
  email: String;
  firstName: String;
  lastName: String;
  password: String;
  role?: String;
}

export interface Posts {
  title: String;
  author: String;
  postBody: String;
  imagesrc?: String;
}

const usersSchema = new Schema<Users>({
  _id: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  role: String,
});

const postsSchema = new Schema<Posts>({
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
