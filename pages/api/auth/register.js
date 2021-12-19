import db from '../../../libs/db'
import bcrypt from 'bcryptjs'

export default async function handler(req, res){
    if(req.method !== 'POST') return res.status(405).end()

    const {email, password} = await req.body
    const salt =  bcrypt.genSaltSync(10)
    const pwdHash = bcrypt.hashSync(password, salt)

    try {
        const register = await db('users').insert({
            email,
            password : pwdHash
        })
        const registered = await db('users').where({id : register})

        res.status(200).json({
            message : 'Register has successfully',
            data : registered[0]
        })
    } catch (error) {
        error
    }
}