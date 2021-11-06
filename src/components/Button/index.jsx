import React from 'react';

//Styles
import { Wrapper } from './Button.styles';

const Button = ({ text, callback}) => (  /*  destructuring props */

    <Wrapper type="button" onClick={callback}>
        {text}
    </Wrapper>
);

export default Button;