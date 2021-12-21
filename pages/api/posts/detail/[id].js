import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization'

export default async function handler (req, res) {
    if(req.method !== 'GET') return res.status(405).end()
    const {id} = req.query 
    
    try {
        await authorization(req,res) // middleware verify and decode token 


        const post = await db('posts').where({id}).first()

        if(!post) return res.status(404).end()
        
        res.status(200)
        res.json({
            message : 'Posts data',
            data : post
        })
    } catch (err) {
        res.status(401).end()
    }
}