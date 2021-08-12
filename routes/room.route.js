import { Router } from "express";
import { RoomModel } from "../models/Room.js"; 
import { OnlineUserModel } from "../models/OnlineUser.js"; 

const router = Router();
let uniqueUsers = [];

const pushUniqueUser = (someUniqueUser) => {
  let isUser = false;
  if(!uniqueUsers.length) {
    uniqueUsers.push(someUniqueUser);
    return;
  }
  uniqueUsers.forEach((item) => {
    if(item.id === someUniqueUser.id) {
      isUser = true;
    }
  })
  if (isUser === false) {
    uniqueUsers.push(someUniqueUser);
  }
  return uniqueUsers;
}

// const deleteUniqueUser = function (someUniqueUser) {
//   console.log(someUniqueUser);
//   uniqueUsers.forEach((item) => {
//     if(item.id === someUniqueUser.id) {
//       isUser = true;
//     }
//   })
// }

router.get('/', async (req, res) => {
  try {
    const id = req.query[0]
    const room = await RoomModel.find({_id:id});
    res.json(room);
  } catch (error) {
    console.log(error);
  }
})

router.post('/add-room', async (req, res) => {
  try {
    const { name } = req.body
    const room = await new RoomModel({
      name: name,
      messages: [],
      users: [],
    })

    await room.save()
    res.json(room)

  } catch (error) {
    console.log(error);
  }
})

router.put('/push-user', async (req, res) => {
  try {
    const roomId = req.body.roomId;
    const user = req.body.user;
    const room = await RoomModel.findOne({_id:roomId});
    room.users = pushUniqueUser(user);
    
    await room.save();
    res.json(room.users);

  } catch (error) {
    console.log(error);
  }
})

// router.delete('/delete/:id', async (req, res) => {
//   console.log('AAAAAAAAAAAAAAAA');
//   try {
//     const id = req.params.id
//     console.log(req.params);
//     const roomUser = await RoomModel.users.findOneAndDelete({id:id});   
//     console.log(roomUser, 'RRRRRRRRRROOOOOOOOOOOOOMMMMMMMMMMMM'); 
//     res.send({message: 'findOneAndDelete'})
//   } catch (error) {
//     console.log(error, 'JJJJJJJJJJJOOOOOOOOOOOOOOOPPPPPPPPPPPPAAAAAAAAAAAA');
//   }
// })



export default (router)