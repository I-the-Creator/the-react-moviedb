import { useEffect, useState } from "react";
import API from '../API';  // import functions for fetching

export const useMovieFetch = movieId => {

    const [state, setState] = useState({});  // empty object by default
    const [loading, setLoading] = useState(true);  // as that component fetching data for the dedicated movie
    const [error, setError] = useState(false);   // error state

// as we fetching data only one time for the dedicated movie we use 'useEffect'
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);   

                // fetching data by movieIds
                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);

                // console.log(movie);   // json object 

                // Get Directors only
                const directors = credits.crew.filter(  // JS filter function to get Directors from the array
                    member => member.job === 'Director'
                );

                // state setter without checing for previous value
                setState({
                    ...movie,  // destructure 'movie' object
                    actors: credits.cast,
                    directors
                });

                setLoading(false);

            } catch (error) {
                setError(true);
            }
        };

        fetchMovie();  // invoke the fetching function

    }, [movieId])    /*  change the state if movieId changes */

    return { state, loading, error};
};



    