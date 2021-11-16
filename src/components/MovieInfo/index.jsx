import React from 'react';
import PropTypes from 'prop-types';

//Components
import Thumb from '../Thumb';

//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

//Image
import NoImage from '../../images/no_image.jpg'

//Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';

const MovieInfo = (
  { movie } // 'movie' prop give us the movie data  - get from Movie.jsx
) => (
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
                <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                {/* mapping directors if there are more than one */}
                {movie.directors.map(director => (
                    <p key={director.credit_id}>{director.name}</p>
                ))}

              </div>
          </div>
      </Text>
    </Content>
  </Wrapper>
);

MovieInfo.propTypes = {
  movie: PropTypes.object,
}

export default MovieInfo;