import React, { useState } from 'react'
import cookies from 'next-cookies'
import Link from 'next/link'


export async function getServerSideProps(ctx){ // agar redirect langsung tanpa render component sebelumnya dulu, pre-render // server side rendering
    const allCookies = cookies(ctx)         // akses get cookie di server side , menerima cookie dari client
        
        if(allCookies.token)
            return ctx.res.writeHead(302, {  // redirect ke posts
            location : '/posts'        
        })
        
    return { props : {}, }
}

const Register = () => {

    const [ email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const [status, setStatus] = useState('normal')

    
    async function registerHandler(e) {
        e.preventDefault()

        if(!email) return res.status(405).json({message : 'email is empty'})
        
        setStatus('loading')
        
        const data = {email, password}
        const req = await fetch ('/api/auth/register', {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(!req.ok) return setStatus('error' + req.status)

        const res = await req.json()
        
        setStatus('success')
    }

    return (
        <div>
            <Link href={'/auth/login'}><a >Login</a></Link>
            <h1>Register</h1>
            <div>Status : {status} </div>
            <form onSubmit={registerHandler}>
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />

                <button type='submit'>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
