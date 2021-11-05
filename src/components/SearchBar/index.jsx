import React, { useState, useEffect, useRef } from "react";

//Image
import searchIcon from '../../images/search-icon.svg';

//Styles
import { Wrapper, Content } from "./SearchBar.styles";


// Controlled react component
const SearchBar = ({ setSearchTerm }) => {

    const [state, setState] = useState('');

    // in order no to trigger 'setSearchTerm' in initial render
    const initial = useRef(true);  // useRef won't trigger a re-render
        // console.log(initial.current);    // true


    // delay in sending data to 'useHomeFetch' using timeout
    useEffect(() => {

        if (initial.current) {
            initial.current = false;   // change the value for next render and that part will be skipped 
            return;  //  goes out of useEffect and don't trigger 'setSearchTerm' during initial render
        }

        const timer = setTimeout(() => {   // call the setSearchTerm each 500ms 
            setSearchTerm(state)
        }, 500)

        return () => clearTimeout(timer)  // clear the 'timer' timeout on new render, not current
    }, [setSearchTerm, state])

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt='search-icon' />
                <input
                    type='text'
                    placeholder='Search Movie'
                    // get the value from input field. Invoke inline function, execute setState with event.currentTarget.value as an argument this value goes into 'state'.
                    // every time it changes it triggers the setState
                    onChange={event => setState(event.currentTarget.value)} 
                        //  console.log(state);   state will renew with 1 step lag
                    // put the value form 'state' to the 'value'
                    value = {state}
                />
            </Content>
        </Wrapper>
    )
}

export default SearchBar;