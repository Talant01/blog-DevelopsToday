import React from 'react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import Image from 'next/image'
import blog from '../../public/blog.jpeg'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const Container = styled.div`
    width: 80%;
    text-align: center;
    margin: 0 auto;
`
const Wrapper = styled.div`
    padding: 50px 0;
    max-width: 50%;
    margin: 0 auto;
`
const Title = styled.h1`
    line-height: 1.15em;
    margin: 0.4em 0;
    transition: color 0.2s ease-in-out;
    font-size: 1.6rem;
    font-weight: 700;
`

const Body = styled.p`
    color: rgb(115, 138, 148);
    font-size: 18px;
    line-height: 1.5em;
    text-align: left;
`

interface Post {
    title: string
    body: string
    id: number | string
}

interface IProps {
    post: Post
}

type Props = {
    post: Post
}

interface Params extends ParsedUrlQuery {
    id: string
}

const Post: React.FC<IProps> = ({ post }): JSX.Element => {
    const router = useRouter()

    if (router.isFallback) {
        return <Layout title="Post | My blog">Loading...</Layout>
    }

    return (
        <Layout title="Post | My blog">
            <Container>
                <Wrapper>
                    <Image src={blog} alt={'Picture of the blog'} />
                    <Title>{post.title}</Title>
                    <Body>{post.body}</Body>
                </Wrapper>
            </Container>
        </Layout>
    )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
    const { data } = await axios.get('https://simple-blog-api.crew.red/posts')

    const paths = data.map((post: Post) => ({
        params: { id: post.id.toString() },
    }))

    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!
    const { data } = await axios.get(`https://simple-blog-api.crew.red/posts/${params.id}?_embed=comments`)
    console.log(params.id)

    return {
        props: {
            post: data,
        },
        revalidate: 1,
    }
}

export default Post
