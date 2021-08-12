import { Router } from "express";
import { InventoryModel } from "../models/Inventory.js";
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../config/default.js";

const router = Router();
router.post('/add', async (req, res) => {
  try {
    const { item, id } = req.body
    const inventory = await new InventoryModel({
      owner: id,
      title: item.title,
      description: item.description,
      power: item.power,
      img: item.img,
      isActive: item.isActive,
    })

    await inventory.save()
    res.json(inventory)

  } catch (error) {
    console.log(error);
  }
})

router.get('/', async (req, res) => {
  try {
    const inventory = await InventoryModel.find({ owner: req.query[0] })
    res.json(inventory)
  } catch (error) {
    console.log(error);
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id    
    const inventoryItem = await InventoryModel.findOneAndDelete({_id:id});    
    res.send({message: 'findOneAndDelete'})
  } catch (error) {
    console.log(error);
  }
})

router.put('/active/:id', async (req, res) => {
  try {    
    const inventoryItem = await InventoryModel.findOne({_id:req.body.id});
    inventoryItem.isActive = !inventoryItem.isActive;

    await inventoryItem.save()
    res.json(inventoryItem);
  } catch (error) {
    console.log(error);
  }
})

export default (router)