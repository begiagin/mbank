import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'mbank-secret-key-change-in-production'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Token ارائه نشده' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Token نامعتبر' })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token نامعتبر یا منقضی شده' })
    }
    req.user = decoded
    next()
  })
}