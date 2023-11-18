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
  postImage?: String;
  postDate?: Date;
}
