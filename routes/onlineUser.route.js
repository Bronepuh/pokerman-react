import { Router } from "express";
import { RoomModel } from "../models/Room.js";
import { OnlineUserModel } from "../models/OnlineUser.js";

const router = Router();

router.post('/add-user', async (req, res) => {
  try {
    const { roomId, user } = req.body
    const room = await RoomModel.find({ _id: roomId })
    const newUser = await new OnlineUserModel({
      userId: user.id,
      owner: roomId,
      user: user,
    })
    newUser.save()
    res.json(newUser)


  } catch (error) {
    console.log(error);
  }
})

router.delete('/delete-user/:id', async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id 
    console.log(req);
    const deleteUser = await OnlineUserModel.findOneAndDelete({userId: id});
    await deleteUser.save();
        
    res.send({message: 'findOneAndDelete'})
  } catch (error) {
    console.log(error);
  }
})




export default (router)