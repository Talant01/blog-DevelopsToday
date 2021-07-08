import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const NavBar = styled.ul`
    height: 70px;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row nowrap;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    li a {
        padding: 10px 15px;
        transition: all 0.5s ease;
        border-radius: 8px;
        font-weight: bold;
        margin: 0 50px;
        font-size: 18px;
        color: #333;
        &:hover {
            color: #fff;
            background: #333;
        }
    }
    @media (max-width: 768px) {
        li a {
            margin: 0 22px;
        }
    }
`

const Header: React.FC = (): JSX.Element => {
    return (
        <NavBar>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/posts">
                    <a>Posts</a>
                </Link>
            </li>
            <li>
                <Link href="/posts/new">
                    <a>Add Post</a>
                </Link>
            </li>
        </NavBar>
    )
}

export default Header
