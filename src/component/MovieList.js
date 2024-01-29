/* 글자가 입력 후 버튼을 클릭해서 검색 */
import { useState, useEffect } from "react";
import styles from "./MovieList.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=cba95d401a14ab806ffc13a5052aab89&query=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.movie}>
      <h1>영화 검색</h1>
      <div className={styles.search_box}>
        <input
          type="text"
          placeholder="영화 제목을 검색하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchMovies} disabled={isLoading}>
          검색
        </button>
      </div>
      <ul className={styles.list}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p>평점: {movie.vote_average}</p>
              <p>개봉일: {movie.release_date}</p>
              <p>{movie.overview}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MovieList;
