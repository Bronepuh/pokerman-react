import { Router } from "express";
import { UserModel } from "../models/User.js";

const router = Router();
router.get('/item', async (req, res) => {
  try {
    const user = await UserModel.find({_id: req.query[0]})
    res.send(user);
  } catch (error) {
    console.log(error);
  }
})

export default (router)