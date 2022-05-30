import React from "react";
import axios from "axios";
import { Movie } from "./Movies";
import "./App.css";

class App extends React.Component {
  state = {
    isLoding: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
    this.setState({ movies: movies, isLoding: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoding, movies } = this.state;
    return (
      <section className="container">
        <div>
          {isLoding ? (
            <div className="loader_wrap">
              <span className="loader">Loding... </span>
            </div>
          ) : (
            <div className="movies">
              {movies.map((movie) => {
                return <Movie key={movie.id} title={movie.title} year={movie.year} summary={movie.summary} poster={movie.medium_cover_image} genres={movie.genres} />;
              })}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default App;
