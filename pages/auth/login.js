import React, {useState, useEffect} from 'react'
import Cookie from 'js-cookie'
import Router from 'next/router'
import cookies from 'next-cookies'

export async function getServerSideProps(ctx){ // agar redirect langsung tanpa render component sebelumnya dulu, pre-render // server side rendering
    const allCookies = cookies(ctx)         // akses get cookie di server side , menerima cookie dari client
        
        if(allCookies.token)
            return ctx.res.writeHead(302, {  // redirect ke posts
            location : '/posts'        
        })
        
    return { props : {}, }
}

export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('normal')

    useEffect(() => {
        const token = Cookie.get('token')
        
        if(token) return Router.push('/posts')
    },[])

    const loginHandler = async (e) => {
        e.preventDefault()

        setStatus('loading')

        const data = {email,password}
        const req = await fetch('/api/auth/login', {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(!req.ok) return setStatus('error' + req.status)
        const res = await req.json()
        setStatus('success')
        Cookie.set('token', res.token) 
        Router.push('/posts')  // redirect
    }

    return (
        <div>
            <h1>Login</h1>
            <div>
                {status}
                <form onSubmit={loginHandler}>
                    <label >Email</label>
                    <input type="text" placeholder='Masukkan Email' value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                    <label >Password</label>
                    <input type="password" placeholder='Masukkan Password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                    <button type='onsubmit'>Login</button>
                </form>
            </div>
        </div>
    )
}