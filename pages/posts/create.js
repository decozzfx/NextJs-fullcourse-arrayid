import React, { useState } from 'react'
import Router from 'next/router'
import cookies from 'next-cookies'
import Nav from '../../components/Nav'

export async function getServerSideProps(ctx){
    const {token} = cookies(ctx)

    if(!token) 
    return ctx.res.writeHead(302, {
        location : 'auth/login'
    }) 

    return { props : { token }}
}

const Create = (props) => {

    const {token} = props
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState('normal')

    async function createHandler(e){
        e.preventDefault()
        setStatus('loading..')
        const data = {title, content}

        if(title && content === '') return setStatus('Input tidak boleh kosong')

        try {
            const res = await fetch('/api/posts/create', {
                method : 'POST',
                body : JSON.stringify(data),
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + token
                }
            })
            if(!res.ok) return setStatus('error')
            const req = await res.json()
            setStatus('succes') 
            console.info(req)
            Router.push('/posts')

        } catch (error) {
            error
        }

    }
    return (
        <div>
            <Nav/>
            <h1>Create</h1>
            {status}
            <form onSubmit={createHandler}>
                <input type="text" name='title' placeholder='Masukkan title' value={title} onChange={(e) => setTitle(e.target.value)}/> <br />
                <textarea name="" id="" cols="30" rows="10" placeholder='Masukkan Content' value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                <button type='onsubmit' >Create</button>
            </form>
        </div>
    )
}

export default Create
