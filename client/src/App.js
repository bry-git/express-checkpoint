
import React, { useEffect, useState } from 'react'
import './App.css';
import fetch from 'node-fetch'
import MovieList from './components/MovieList';
import MovieSubmit from './components/MovieSubmit';

const App = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState('true')

  const getMovies = async () => {
    await fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(data => setData(data))
      .finally(setIsLoading(false))
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <>
      <div className="App">
        <div className="left">
          <h1>Movies in Database</h1>
          <MovieList movies={data} isLoading={isLoading} />
        </div>
        <div className="right">
            <MovieSubmit />
        </div>
      </div>
    </>
  );
}

export default App;
