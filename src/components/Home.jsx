import React from 'react';

//API
import API from '../API'

// Config
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from '../config'

// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

// Hook
import { useHomeFetch } from '../hooks/useHomeFetch'

// Image
import NoImage from '../images/no_image.jpg'

const Home = () => {
    const {
      state,
      loading,
      error,
      searchTerm,
      setSearchTerm,
      setIsLoadingMore
    } = useHomeFetch();

    // console.log(state.total_pages);   // debug  -  total_pages property 
    console.log(state);   // debug  -   fetched data

    if( error ) return <div>Something went wrong...</div>;

    return (
        <> 
            {!searchTerm && state.results[0] &&   /* not showing 'Hero' component if searchTerm is not empty */
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                title={state.results[0].original_title}
                text={state.results[0].overview}
            />
            }
            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
                {state.results.map(movie =>(
                    <Thumb
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                        }
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {/* if data loading then show the Spinner */}
            {loading && <Spinner/>}
            {/* if we are not on a lst page and not loading content and then show Button component instead of Spinner*/}
            {state.page < state.total_pages && !loading && (
                // change the state 'isLoadingMore' when we click the Button
                <Button text='Load More' callback={() => setIsLoadingMore(true)} />
            )}
        </>
    )
}

export default Home;