import db from '../../../libs/db'
import authorization from '../../../middlewares/authorization'

export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end() //method not allow

    try {
        const auth = await authorization(req, res) // middleware verify and decode token 

        const {title, content} = await req.body // destructuring

        const create = await db('posts').insert({
            title,
            content
        })
        const data = await db('posts').where('id', create)
    
        res.status(200)
        res.json({
            message : 'Post created successfully',
            data : data[0]
        })
    } catch (error) {
        res.json({ message : 'Something error', error})
    }
}