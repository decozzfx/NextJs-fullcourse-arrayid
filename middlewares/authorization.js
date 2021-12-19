import jwt from 'jsonwebtoken'

export default function authorization(req, res){
    return new Promise((resolve, reject) => {
        const { authorization } = req.headers
    
        if(!authorization) return res.status(401).end() // middleware authorization
        const authSplit = authorization.split(' ') // split between Bearer and token // array type
        const [authType, authToken] = [             // destructuring bearer and token
            authSplit[0], authSplit[1]
        ]
    
        if(authType !== 'Bearer') return res.status(401).end() // middleware type
        return jwt.verify(authToken,'blablabla', (err, decoded) => {
            if (err) return res.status(401).end()
            return resolve(decoded)
        })
    })
}