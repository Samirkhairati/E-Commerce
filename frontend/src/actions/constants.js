import dotenv from 'dotenv'
dotenv.config()

export const BASE_URL = process.env.BACKEND_URL || ''
export const USERS_URL = `${BASE_URL}/api/users`
