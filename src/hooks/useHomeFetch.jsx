import { useEffect, useState, useRef } from "react";
//API
import API from "../API";
//Helpers 
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
    };

export const useHomeFetch = () => {
    // state function sent as a prop to 'SearchBar' component via 'Home'
    // changing the input in 'SearchBar' we trigger the changing of 'searchTerm' state
    const [searchTerm, setSearchTerm] = useState(""); //  empty string by default

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false); // not loading initially
    const [error, setError] = useState(false);
    // state triggered from the Button
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // console.log(searchTerm);  //  data from search input

const fetchMovies = async (page, searchTerm = "") => {
    try {
        setError(false);
        setLoading(true);

        const movies = await API.fetchMovies(searchTerm, page);   // sent to 'state' state
        // console.log(movies);
        // console.log(state.page);

        // state setter  with checking for previous value
        setState((prev) => ({
        ...movies,
        results:
            page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
        }));
    } catch (error) {
        setError(true);
    }
    setLoading(false);
};

  // Initial render and Search
    useEffect(() => {
        // check for session storage and get data from there if we're not searching
        if(!searchTerm) {
            const sessionState = isPersistedState('homeState'); // get data from sessionStorage by name 'homeState'
                // if sessionStorage exist we set to setState
            if (sessionState) {
                console.log('Grabbing from sessionStorage');
                setState(sessionState);
                return; // return from useEffect and not fetching data
            }
        }
        console.log('Grabbing from API');
        setState(initialState); // reset search request
        fetchMovies(1, searchTerm); // render 1st and then page depending on searchTerm
    }, [searchTerm]);

  //Load More - it's triggering only when we click 'Load More'
    useEffect(() => {
        // if isLoadingMore is false just return and not triggering it
        if (!isLoadingMore) return;
        // load next page and searchTerm if we're in a search
        fetchMovies(state.page + 1, searchTerm);
        //set 'isLoadingMore' state default value 
        setIsLoadingMore(false);
}, [isLoadingMore, searchTerm, state.page])

// Write to sessionStorage
    useEffect(() => {
         /* write the data (state) to sessionStorage with name 'homeState', stringify it to string previously,
         as we can store data in session storage only as a string */
        if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state))
    }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};

