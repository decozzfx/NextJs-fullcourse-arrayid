import React from 'react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import Router from 'next/router'

const Nav = () => {

    function logoutHandler(e){
        e.preventDefault()
        Cookie.remove('token')
        Router.replace('/auth/login')
    }

    return (
        <div>            
            <Link href={'/posts'}><a>Posts List</a></Link>
            &nbsp; | &nbsp;
            <Link href={'/posts/create'}><a>Create Post</a></Link>
            &nbsp; | &nbsp;
            <Link  href={'#'}><a onClick={(e) => logoutHandler(e)}>Logout</a></Link>
        </div>
    )
}

export default Nav
