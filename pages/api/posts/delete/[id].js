import db from '../../../../libs/db'
import authorization from '../../../../middlewares/authorization'

export default async function handler(req, res){
    if(req.method !== 'DELETE') return res.status(405).end()
    const {id} = req.query
    try {
        const auth = await authorization(req,res) // middleware verify and decode token 

        const deleteData = await db('posts').where({id}).del()

        res.status(200)
        res.json({
            message : 'Data post has been deleted'
        })

    } catch (error) {
        error
    }

}