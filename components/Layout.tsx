import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface IProps {
    title: string
    children: React.ReactNode
}

const Layout: React.FC<IProps> = ({ title, children }): JSX.Element => {
    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default Layout
