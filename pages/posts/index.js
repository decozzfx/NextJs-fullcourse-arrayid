import React from 'react'
import cookies from 'next-cookies'

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

    return { props : { props : posts.data }} //object
}

const Index = ({props}) => {
    return (
        <div>
            <h1>Posts</h1>
            { props.map(post => (
                    <div key={post.id}>{post.title} - {post.id}</div>
                ))}
        </div>
    )
}

export default Index
