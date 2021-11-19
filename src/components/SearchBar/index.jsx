import React, { Component } from "react";
import PropTypes from 'prop-types';

//Image
import searchIcon from '../../images/search-icon.svg';

//Styles
import { Wrapper, Content } from "./SearchBar.styles";


// Controlled react class component
class SearchBar  extends Component {

    state = { value : ''};
    timeout = null;

    componentDidUpdate(_prevProps, prevState) {
        if(this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props;

            // clear timeout before we do something else
            clearTimeout(this.timeout);

            // call the setSearchTerm each 500ms 
            this.timeout = setTimeout(() => {   
                const { value } = this.state;  // grab property from state (search query)
                setSearchTerm(value)
            }, 500);
        }
    }
    render() {
        const { value } = this.state;   // destructure this.state
        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt='search-icon' />
                    <input
                        type='text'
                        placeholder='Search Movie'
                        // get the value from input field. Invoke inline function, execute setState with event.currentTarget.value as an argument this value goes into 'state'.
                        // every time it changes it triggers the setState
                        onChange={event => this.setState({ value: event.currentTarget.value })} 
                            //  console.log(state);   state will renew with 1 step lag
                        // put the value form 'state' to the 'value'
                        value = {value}
                    />
                </Content>
            </Wrapper>
        );
    }
}
SearchBar.propTypes = {
    setSearchTerm: PropTypes.func,
    callback: PropTypes.func,
}

export default SearchBar;