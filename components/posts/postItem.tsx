import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import blog from '../../public/blog.jpeg'
import styled from 'styled-components'

const Item = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    &:not(:last-child) {
        margin-bottom: 20px;
    }
`

const Wrapper = styled.div`
    margin-left: 15px;
    width: 80%;
    color: #000;
`

const Title = styled.h2`
    line-height: 1.15em;
    margin: 0 0 0.4em;
    transition: color 0.2s ease-in-out;
    font-size: 1.6rem;
    font-weight: 700;
`

const Body = styled.p`
    color: rgb(115, 138, 148);
    font-size: 16px;
    line-height: 1.5em;
`

interface Post {
    title: string
    id: number
    body: string
}

interface Props {
    post: Post
}

const PostItem: React.FC<Props> = ({ post }): JSX.Element => {
    const compressText = (text: string) => {
        const maxLength = 500
        let trimmedText = text.substr(0, maxLength)

        trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(' ')))
        return trimmedText + '...'
    }

    if (!post.title || !post.body) return <></>

    return (
        <Item>
            <Image src={blog} alt="Picture of the blog" />
            <Wrapper>
                <Title>
                    <Link href={`posts/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                </Title>
                <Body>{compressText(post.body)}</Body>
            </Wrapper>
        </Item>
    )
}

export default PostItem
