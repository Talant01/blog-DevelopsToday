import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const Wrapper = styled.div`
    margin: auto;
    padding: 40px;
    display: flex;
`
const Form = styled.form`
    margin: auto;
    width: 375px;
    text-align: center;
`

const Title = styled.h2`
    line-height: 1.15em;
    margin: 0 0 0.4em;
    transition: color 0.2s ease-in-out;
    font-size: 1.6rem;
    font-weight: 700;
`
const TextField = styled.input`
    padding: 10px;
    font-size: 18px;
    margin-top: 20px;
    width: 100%;
    ::placeholder {
        font-size: 18px;
        letter-spacing: 0.04em;
    }
`
const TextArea = styled.textarea`
    padding: 10px;
    font-size: 18px;
    margin-top: 20px;
    width: 100%;
    ::placeholder {
        font-size: 18px;
        letter-spacing: 0.04em;
    }
    min-height: 220px;
    resize: none;
`

const Button = styled.button`
    padding: 15px 20px;
    color: #000;
    border: 1px solid #000;
    border-radius: 5px;
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.5s ease;
    margin-top: 20px;
    cursor: pointer;
    &:hover {
        background: #000;
        color: #fff;
    }
`
const Message = styled.p<{ error: boolean }>`
    color: ${(props) => (props.error ? 'red' : 'green')};
    margin-top: 20px;
`

const NewPost: React.FC = (): JSX.Element => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [message, setMessage] = useState({
        message: '',
        error: false,
    })

    useEffect(() => {
        const timer = setTimeout(() => setMessage({ message: '', error: false }), 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [message])

    const onSubmitForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = {
            title,
            body,
        }
        try {
            await axios.post('https://simple-blog-api.crew.red/posts', { ...data })
            event.target.reset()
            setTitle('')
            setBody('')
            setMessage({ message: 'Post created successfully!', error: false })
        } catch (e) {
            setMessage({ message: 'Something went wrong. Try again!', error: true })
        }
    }

    return (
        <Layout title="Create a new Post | My blog">
            <Wrapper>
                <Form onSubmit={onSubmitForm}>
                    <Title>Create a new Post</Title>
                    <TextField
                        type="text"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        placeholder="Title"
                        name="title"
                        required
                    />
                    <TextArea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Description"
                        name="body"
                        required
                    />
                    <Button type="submit">Submit a Post</Button>
                    <Message error={message.error}>{message.message}</Message>
                </Form>
            </Wrapper>
        </Layout>
    )
}

export default NewPost
