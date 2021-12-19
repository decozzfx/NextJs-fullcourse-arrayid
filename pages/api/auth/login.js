import db from '../../../libs/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res){
        if(req.method !== 'POST') return res.status(200).end()

        const {email, password} = await req.body 
    try {

        const checkUser = await db('users').where({email}).first()
        if(!checkUser) return res.status(401).json({message : 'account is not registered'}).end() // unauthorize
        const checkPwd = await bcrypt.compare(password, checkUser.password)
        if(!checkPwd) return res.status(401).json({ message : 'password is wrong'}).end()

        const token = jwt.sign({ // signing token 
            id : checkUser.id,      //encoding
            email : checkUser.email
        },'blablabla',{   // secret key
            expiresIn : '2 days'
        })

        res.status(200).json({
            message : 'login successfully',
            token
        })        
    } catch (error) {
        res.status(401).json({
            message : 'could not login',error
        })
    }
}