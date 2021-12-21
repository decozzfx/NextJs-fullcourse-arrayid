import React, { useState } from 'react'
import cookies from 'next-cookies'
import Router from 'next/router'
import Nav from '../../components/Nav'

export async function getServerSideProps(ctx){
    const {token} = cookies(ctx)

    if(!token)                     // verify token
    return ctx.res.writeHead(302, {
        location : 'auth/login'
    })

    const req = await fetch('http://localhost:3000/api/posts/', {  // absolute api , karena diakses di node
        headers : { 'Authorization' : 'Bearer ' + token}
    })

    const posts = await req.json()
    return { 
        props : { 
            posts : posts.data, 
            token 
    }} //object
}

const Index = (props) => {
    const [posts , setPosts] = useState(props.posts)

    async function deleteHandler(id, e){
        e.preventDefault()
        const {token} = props
        const ask = confirm('Apakah data ini akan dihapus?')

        if(ask){
            
            const del = await fetch('/api/posts/delete/'+ id , {
                    method : 'DELETE',
                    headers : {
                    'Authorization' : 'Bearer '+ token
                }
            })
            const res = await del.json()
            
            const filteredPosts = posts.filter(post => {
                return post.id !== id // data dengan id yg tidak sama dengan id terpilih yg di return
            })
            setPosts(filteredPosts)
        } 
    }

    function editHandler(id){
        Router.push('/posts/update/' + id)
    }

    return (
        <div>
            <Nav/>
            <h1>Posts</h1>
            { posts.map(post => (
                    <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p> {post.content} </p>
                    <div>
                        <button onClick={editHandler.bind(this, post.id)}>Edit</button>
                        <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
                    </div>
                    <hr />
                    </div>
                ))}
        </div>
    )
}

export default Index
