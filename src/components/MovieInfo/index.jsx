import React, { useContext } from "react";
import PropTypes from "prop-types";

//API
import API from '../../API';

//Components
import Thumb from "../Thumb";
import Rate from "../Rate";

//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";

//Image
import NoImage from "../../images/no_image.jpg";

//Styles
import { Wrapper, Content, Text } from "./MovieInfo.styles";

//Context
import { Context } from "../../context";

const MovieInfo = (
  { movie } // 'movie' prop give us the movie data  - get from Movie.jsx
) => {

  const [user] = useContext(Context);

  const handleRating = async value => {  // value from rate range slider 
    const rate = await API.rateMovie(user.sessionId, movie.id, value);
    // console.log(rate);
  }

  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
          alt="movie-thumb"
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>PLOT</h3>
          <p>{movie.overview}</p>

          <div className="rating-and-directors">
            <div>
              <h3>RATING</h3>
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>DIRECTOR{movie.directors.length > 1 ? "S" : ""}</h3>
              {/* mapping directors if there are more than one */}
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          {user && (   // if logged in (true) execute right part expression
            <div>
              <p>Rate Movie</p>
              <Rate callback={handleRating} />
            </div>
          )}
        </Text>
      </Content>
    </Wrapper>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object,
};

export default MovieInfo;
