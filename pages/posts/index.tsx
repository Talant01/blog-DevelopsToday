import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import PostItem from '../../components/posts/postItem'

const Container = styled.div`
    width: 81%;
    margin: 0 auto;
`
const Wrapper = styled.div`
    padding: 50px 0;
`

interface Post {
    title: string
    body: string
    id: number
}

interface Props {
    posts: Post[]
}

const AllPosts: React.FC<Props> = ({ posts }): JSX.Element => {
    return (
        <Layout title="All Posts | My blog">
            <Container>
                <Wrapper>
                    {posts.map((post: Post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </Wrapper>
            </Container>
        </Layout>
    )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getServerSideProps() {
    const { data } = await axios.get('https://simple-blog-api.crew.red/posts')

    return {
        props: {
            posts: data,
        },
    }
}

export default AllPosts
