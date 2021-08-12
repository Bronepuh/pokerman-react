import { Router } from "express";
import { UserModel } from '../models/User.js';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../config/default.js";

const router = Router();

router.post('/registration',
  [
    check('login', 'некорректный login').exists(),
    check('email', 'некорректный emai').isEmail(),
    check('password', 'некорректный password').isLength({ min: 3 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          maessage: 'некорректные данные при регистрации',
        })
      }
      const { login, email, password } = req.body;
      const isUser = await UserModel.findOne({ email, login });

      if (isUser) {
        return res.status(300).json({ message: 'Такая почта или логин уже используется' })
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({
        login,
        email,
        password: hashedPassword,
      })
      
      await user.save();
      res.status(201).json({ message: 'пользователь создан!' })
    } catch (err) {
      console.log(err);
    }
  })

router.post('/login',
  [
    check('email', 'некорректный emai').isEmail(),
    check('password', 'некорректный password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          maessage: 'некорректные данные при регистрации',
        })
      }
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: ' такой email не зарегистрирован' })
      }

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: ' неверный пароль' })
      }

      const jwtSecret = config.secret;
      const token = jwt.sign(
        { userId: user.id },
        jwtSecret,
        { expiresIn: '1h' }
      )
      res.json({ token, userId: user.id, userLogin: user.login });

    } catch (err) {
      console.log(err);
    }
  })

  router.post('/check',
  async (req, res) => {
    try {
      const { id } = req.body;
      const user = await UserModel.findOne({ id });

      if (!user) {
        res.send('NO_AUTH');
      }
      res.send('AUTH');

    } catch (err) {
      console.log(err);
    }
  })

  router.delete('/logout', async (req, res) => {
    try {
      res.send(res);
    } catch (err) {
      console.log(err);
    }
  })

export default (router)