import React, { Component } from 'react';
import { useParams } from 'react-router-dom';   // to grab params from the URL

//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

//Components
import BreadCrump from './BreadCrump';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';

//Image
import NoImage from '../images/no_image.jpg';
// API
import API from '../API';  // import functions for fetching

class Movie extends Component {
    // console.log(movie);  // json object 
  state = {
    movie : {},  // empty object to start with
    loading : true,
    error : false
  };

  fetchMovie = async () => {

    //destructure prop 'movieId' from props.params.
    // we add props.params before export (down below in const MovieWithParams)
    const { movieId } = this.props.params;  // grab movieId from URL
    // console.log(this.props.params);
    
    try {
        this.setState({ error: false, loading: true })

        // fetching data by movieIds
        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);

        // console.log(movie);   // json object 

        // Get Directors only
        const directors = credits.crew.filter(  // JS filter function to get Directors from the array
            member => member.job === 'Director'
        );

        // state setter without checing for previous value
        this.setState({
          movie : {
            ...movie,  // destructure 'movie' object
            actors: credits.cast,
            directors
          },
          loading : false,
        });

    } catch (error) {
        this.setState({ error: true, loading: false });
    }
};

  // add life Cycle Method
  componentDidMount() {
    this.fetchMovie();
  }

  render() {

    // destructure out props from state
    const {movie, loading, error} = this.state;

    if (loading) return <Spinner />
    if (error) return <div>Something went wrong...</div>;

    return (
      <>
        <BreadCrump movieTitle={movie.original_title} />
        <MovieInfo movie={movie} />{" "}
        {/* sent the prop with movie data to MovieInfo component */}
        <MovieInfoBar
          time={movie.runtime}
          budget={movie.budget}
          revenue={movie.revenue}
        />
        <Grid header="Actors">
          {movie.actors.map((actor) => (
            <Actor
              key={actor.credit_id}
              name={actor.name}
              character={actor.character}
              imageUrl={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                  : NoImage
              }
            />
          ))}
        </Grid>
      </>
    );
  }
};

// wrapper component shows Movie class component and provide it with params
// we spread props for Movie and add additional one - params with useParams from react-router
const MovieWithParams = props => <Movie { ...props} params={useParams() } />

export default MovieWithParams;