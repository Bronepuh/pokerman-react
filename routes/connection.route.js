import { Router } from "express";
import { ConnectionsModel } from "../models/Connections.js";

const router = Router();
router.post('/add', async (req, res) => {
  try {
    const { user, id } = req.body
    const connection = await new ConnectionsModel({
      owner: id,
      user: user,
    })

    await connection.save()
    res.json(connection)

  } catch (error) {
    console.log(error);
  }
})

router.get('/', async (req, res) => {
  try {
    const connections = await ConnectionsModel.find({ owner: req.query[0] })
    res.json(connections)
  } catch (error) {
    console.log(error);
  }
})

// router.delete('/delete/:id', async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const id = req.params.id
//     console.log(req);
//     const inventoryItem = await InventoryModel.findOneAndDelete({_id:id});    
//     res.send({message: 'findOneAndDelete'})
//   } catch (error) {
//     console.log(error);
//   }
// })


export default (router)