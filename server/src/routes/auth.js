import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { findUserByUsername, createUser, verifyPassword } from '../models/User.js'

dotenv.config()

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'mbank-secret-key-change-in-production'

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'نام کاربری و کلمه عبور الزامی هستند' })
    }

    const user = await findUserByUsername(username)
    if (!user) {
      return res.status(401).json({ message: 'نام کاربری یا کلمه عبور اشتباه است' })
    }

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'نام کاربری یا کلمه عبور اشتباه است' })
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token, user: { id: user._id, username: user.username, fullName: user.fullName } })
  } catch (error) {
    res.status(500).json({ message: 'خطای سرور' })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { username, password, fullName, nationalId, phone, email } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'نام کاربری و کلمه عبور الزامی هستند' })
    }

    const existingUser = await findUserByUsername(username)
    if (existingUser) {
      return res.status(409).json({ message: 'این نام کاربری قبلاً ثبت شده است' })
    }

    const newUser = await createUser({ username, password, fullName, nationalId, phone, email })
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, fullName: newUser.fullName } })
  } catch (error) {
    res.status(500).json({ message: 'خطای سرور' })
  }
})

export default router