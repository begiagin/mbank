import NeDB from 'nedb'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'db.json')

const users = new NeDB({
  filename: DB_PATH,
  autoload: true,
  timestampData: true,
})

export { users }