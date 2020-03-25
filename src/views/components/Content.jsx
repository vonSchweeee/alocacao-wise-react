import React from 'react'
import { Container } from '@material-ui/core'

export default props => (
    <section className='content'>
        <Container>
            {props.children}
        </Container>
    </section>
)