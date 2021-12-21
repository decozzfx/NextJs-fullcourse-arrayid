import React, { useState } from 'react'
import Router from 'next/router'
import cookies from 'next-cookies'
import Nav from '../../../components/Nav'

export async function getServerSideProps(ctx){
    const {token} = cookies(ctx)
    const {id} = ctx.query
    console.info(id)

    if(!token) 
    return ctx.res.writeHead(302, {
        location : 'auth/login'
    }) 

    const req = await fetch('http://localhost:3000/api/posts/detail/'+ id, {
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    })

    const res = await req.json()

    return { props : { post : res.data , token }}
}

const Update = (props) => {
    const {token} = props
    const [title, setTitle] = useState(props.post.title)
    const [content, setContent] = useState(props.post.content)
    const data = {title, content}
    const id = props.post.id
    const [status , setStatus] = useState('normal')

    async function updateHandler(e){
        e.preventDefault()
        setStatus('loading...')
        const req = await fetch('/api/posts/update/' + id, {
            method : 'PUT',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        })
        const res = await req.json()
        setStatus('success')       
         Router.push('/posts')
    }

    return (
        <div>
            <Nav/>
            <h1>update page</h1>
            <h3>ID : {id}</h3>
            {status}
            <form onSubmit={updateHandler}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/> <br />
                    <label>Content</label>
                    <textarea name="" id="" cols="30" rows="10" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                </div>
                    <button type='onsubmit'>Update</button>
            </form>
        </div>
    )
}

export default Update
