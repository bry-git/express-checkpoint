import React, { } from 'react'

const MovieList = (props) => {

  if (props.isLoading) {
    return <h3>Loading...</h3>
  }
  else {
    return <>{props.movies.map((movie) => {return <p>{movie.title}</p>})}</>
  }
}


export default MovieList