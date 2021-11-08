import React from 'react';

//Routing
import { Link } from 'react-router-dom';

//Styles
import { Wrapper, Content } from './BreadCrump.styles';

// create component and destructure prop
const BreadCrump = ({ movieTitle }) => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <span>Back to Home Page</span>
            </Link>
            <span>|</span>
            <span>{movieTitle}</span>
        </Content>
    </Wrapper>
);

export default BreadCrump;