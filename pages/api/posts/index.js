import db from '../../../libs/db'
import authorization from '../../../middlewares/authorization'

export default async function handler (req, res) {
    if(req.method !== 'GET') return res.status(405).end()

    try {
        await authorization(req,res) // middleware verify and decode token 

        const posts = await db('posts')
        
        res.status(200)
        res.json({
            message : 'Posts data',
            data : posts
        })
    } catch (err) {
        res.status(401).end()
    }
}