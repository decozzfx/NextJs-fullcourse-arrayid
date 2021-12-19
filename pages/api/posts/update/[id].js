import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization'

export default async function hnadler(req, res) {
    if(req.method !== 'PUT') return res.status(405).end()
    const {id} = req.query
    const {title, content} = req.body
    try {
        const auth = await authorization(req,res) // middleware verify and decode token 

        const update = await db('posts').where({id}).update({title, content})
        const updated = await db('posts').where({id})

        res.status(200)
        res.json({ 
            message : 'data updated successfully',
            data : updated[0]
        })
    } catch (error) {
        error
    }
}