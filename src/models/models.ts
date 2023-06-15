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
  _id: String;
  title: String;
  author: String;
  postBody: String;
  imagesrc?: String;
  postDate?: Date;
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
  _id: String,
  title: String,
  author: String,
  postBody: String,
  imagesrc: String,
  postDate: Date,
});

//<----------------------- Creating Two Models ---------------------------------->
const Users = model("Users", usersSchema);
const Posts = model("Post", postsSchema);

//<----------------------- Export Models ---------------------------------->
export {
  Users,
  Posts,
};
