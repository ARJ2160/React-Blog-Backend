import { Router, Request, Response } from "express";
const router = Router();
import { Users, Posts } from "../models/models.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

//<---------------------------------- CRUD OPERATIONS FOR POSTS ------------------------------------------>

router.get("/", (_, res: Response) => {
  res.status(200).send({ data: "Welcome" });
});

//<---------------------------- Get Posts from Database ---------------------------->

router.get("/postsdata", (_, res: Response) => {
  try {
    Posts.find().then((data) => {
      return res.status(200).send(data);
    });
  } catch {
    return res.status(500).send("Error");
  }
});

//<------------- Get Specific Posts from Database --------------->

router.get("/postsdata/:_id", async (req: Request, res: Response) => {
  const id = req.params._id;
  try {
    let data = await Posts.findById(id);
    if (data) {
      return res.status(200).send(data);
    }
  } catch {
    return res.status(500).json({ status: "An Error Occured" });
  }
});

//<---------------------------- Post On the Posts Database ---------------------------->

router.post("/postsdata", async (req: Request, res: Response) => {
  const db = req.body;
  try {
    let data = await Posts.create(db);
    if (data) {
      return res.status(200).json({ status: "Blog Posted" });
    }
  } catch (error) {
    return res.status(500).json({ status: error });
  }
});

//<----------------------------------- Update Posts on the database --------------------------------->

router.put("/postsdata/update/:id", async (req: Request, res: Response) => {
  console.log(">> EDIT", req.body);
  try {
    const options = { new: true, returnDocument: "after" };
    await Posts.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        postBody: req.body.postBody,
        postImage: req.body.postImage,
      },
      options,
    });
    return res.status(200).json({ status: "Blog Updated" });
  } catch {
    return res.status(500).json({ status: "An Error Occured" });
  }
});

//<---------------------------- Delete Posts from Database ---------------------------->

router.delete("/postsdata/:id", async (req: Request, res: Response) => {
  try {
    await Posts.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ status: "Blog Deleted" });
  } catch {
    return res.status(500).json({ status: "An Error Occured" });
  }
});

//<----------------------------------- CRUD OPERATIONS FOR USERS ------------------------------------------>

//<---------------------------- Register User on Database (SIGN UP) ------------------------------>

router.post("/users/register", async (req: Request, res: Response) => {
  const db = req.body;
  const { email, password } = db;
  const userExist = await Users.findOne({ email }).exec();

  if (userExist) {
    res.status(422).json({ error: "User already exists" });
    return;
  }
  const encryptedPassword = await bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .catch((err) => console.error(err.message));
  const creds = { ...db, password: encryptedPassword };

  Users.create(creds)
    .then(() => {
      return res.status(200).json({ status: 200 });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
    });
});

//<--------------------- Authenticate User Credentials from Database (SIGN IN) ------------------>

router.post("/users/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await Users.findOne({ email }).exec();

  if (!userExists) {
    res
      .status(404)
      .json({ error: "User does not exist. Please register first" });
    return;
  }

  const isPasswordMatch = bcrypt.compare(
    password,
    userExists.password.toString()
  );

  // const passwordsMatch = await Users.find({ password: encryptedPassword })
  //   .select("password")
  //   .limit(1);

  // const hasAdminAccess = await Users.findOne({
  //   password: md5(password),
  // }).select("role");

  if (isPasswordMatch) {
    return res.status(200).json({ userData: userExists, status: 200 });
  } else {
    res.status(422).json({ error: "Passwords do not match" });
  }
});

export default router;
