import React from 'react'
import styled from 'styled-components'

const FooterBlock = styled.footer`
    text-align: center;
    padding: 20px 0;
`

const Footer: React.FC = (): JSX.Element => {
    return <FooterBlock>Copyright &copy; My Blog 2021</FooterBlock>
}

export default Footer
