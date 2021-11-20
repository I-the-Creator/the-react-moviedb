import React, { Component } from "react";

//API
import API from "../API";

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

// Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

// Image
import NoImage from "../images/no_image.jpg";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

class Home extends Component {
  state = {
    // destructure state initial data
    movies: initialState, // movies hold object with movies in results
    searchTerm: "",
    isLoadingMore: false,
    loading: false,
    error: false,
  };

  // fetch movies
  fetchMovies = async (page, searchTerm = "") => {
    try {
      this.setState({ error: false, loading: true });

      const movies = await API.fetchMovies(searchTerm, page); // sent to 'state' state
      // console.log(movies);
      // console.log(state.page);

      // state setter  with checking for previous value
      this.setState((prev) => ({
        ...prev,
        movies: {
          ...movies, // spread out previous movies
          results:
            page > 1
              ? [...prev.movies.results, ...movies.results]
              : [...movies.results],
        },
        loading: false,
      }));
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };
  // Search
  handleSearch = (searchTerm) =>
    //reset to initial state
    this.setState({ movies: initialState, searchTerm: searchTerm }, () =>
      this.fetchMovies(1, this.state.searchTerm)
    );

  // Load more
  handleLoadMore = () =>
    this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);

  // trigger Life Cicle Method to start grabbing data
  componentDidMount() {
    this.fetchMovies(1);
  }

  // Render
  render() {
    // destructure out from the state
    const { searchTerm, movies, loading, error } = this.state;

    if (error) return <div>Something went wrong...</div>;

    return (
      <>
        {!searchTerm &&
          movies
            .results[0] /* not showing 'Hero' component if searchTerm is not empty */ && (
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
              title={movies.results[0].original_title}
              text={movies.results[0].overview}
            />
          )}
        <SearchBar setSearchTerm={this.handleSearch} />
        <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
          {movies.results.map(
            (
              movie // mapping the state.result and extract data for each movie
            ) => (
              <Thumb /* send the props to 'Thumb' component */
                key={movie.id} /* uniq key */
                clickable
                image={
                  movie.poster_path
                    ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                    : NoImage
                }
                movieId={
                  movie.id
                } /*  to use in a Router for links to movie pages */
              />
            )
          )}
        </Grid>
        {/* if data loading then show the Spinner */}
        {loading && <Spinner />}
        {/* if we are not on a lst page and not loading content and then show Button component instead of Spinner*/}
        {movies.page < movies.total_pages && !loading && (
          // change the state 'isLoadingMore' when we click the Button
          <Button text="Load More" callback={this.handleLoadMore} />
        )}
      </>
    );
  }
}

export default Home;
