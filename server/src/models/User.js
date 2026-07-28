import bcrypt from 'bcryptjs'
import { users } from '../db.js'

const SALT_ROUNDS = 10

export const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    users.findOne({ username }, (err, user) => {
      if (err) reject(err)
      resolve(user)
    })
  })
}

export const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    users.findOne({ _id: id }, (err, user) => {
      if (err) reject(err)
      resolve(user)
    })
  })
}

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS)
  const user = {
    username: userData.username,
    password: hashedPassword,
    fullName: userData.fullName || '',
    nationalId: userData.nationalId || '',
    phone: userData.phone || '',
    email: userData.email || '',
    createdAt: new Date().toISOString(),
  }
  return new Promise((resolve, reject) => {
    users.insert(user, (err, newUser) => {
      if (err) reject(err)
      resolve(newUser)
    })
  })
}

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export const seedTestUser = async () => {
  const existing = await findUserByUsername('1219885649')
  if (!existing) {
    await createUser({
      username: '1219885649',
      password: '1364123110',
      fullName: 'کاربر تست',
    })
    console.log('Test user seeded: 1219885649')
  }
}