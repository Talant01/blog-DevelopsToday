import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import styled from 'styled-components'
import Layout from '../components/Layout'
import PostItem from '../components/posts/postItem'

const Container = styled.div`
    width: 81%;
    margin: 0 auto;
`
const Wrapper = styled.div`
    padding: 50px 0;
`

const Button = styled.a`
    padding: 15px 20px;
    color: #000;
    border: 1px solid #000;
    border-radius: 5px;
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.5s ease;
    &:hover {
        background: #000;
        color: #fff;
    }
`
const Center = styled.div`
    text-align: center;
`

interface Post {
    title: string
    body: string
    id: number
}

interface Props {
    posts: Post[]
}

const Home: React.FC<Props> = ({ posts }): JSX.Element => {
    return (
        <Layout title="Latest Posts | My blog">
            <Container>
                <Wrapper>
                    {posts.map((post: Post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    <Center>
                        <Link href="/posts" passHref>
                            <Button>View All</Button>
                        </Link>
                    </Center>
                </Wrapper>
            </Container>
        </Layout>
    )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getServerSideProps() {
    const { data } = await axios.get('https://simple-blog-api.crew.red/posts')
    const posts = data.filter((post: Post, idx: number) => idx < 4)

    return {
        props: {
            posts,
        },
    }
}

export default Home
