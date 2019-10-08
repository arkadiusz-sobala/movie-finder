import React from "react";
import "./custom-select.css";

const customSelect = props => {
    const handleEscapeKey = event => {
        if (event.keyCode === 27) props.toogleMovieList(false, 0);
    };

    const generatePosterHtml = movie => {
        if (movie.Poster && movie.Poster !== "N/A")
            return (
                <img
                    className="customSelect-img"
                    src={movie.Poster}
                    alt="not found"
                ></img>
            );
        else
            return (
                <img
                    className="customSelect-img"
                    src="http://www.4motiondarlington.org/wp-content/uploads/2013/06/No-image-found.jpg"
                    alt="not found"
                ></img>
            );
    };

    const getMovieContainerClassName = (index, tableLength) => {
        let className = "customSelect-movie-container ";
        if (index === tableLength) className += "customSelect-bottom-radius";
        return className;
    };

    const getDropdownClass = () => {
        if (props.foundMovies.length > 0 && props.showMovieList)
            return "customSelect-movies-dropdown";
        return "";
    };

    const prepareFoundMoviesHtml = () => {
        if (props.showMovieList)
            return props.foundMovies.map((movie, index) => {
                if (movie.error) {
                    return (
                        <div
                            className="customSelect-error-container customSelect-bottom-radius"
                            key={index}
                        >
                            <div className="customSelect-movie-text">
                                <span>{movie.message}</span>
                            </div>
                        </div>
                    );
                } else {
                    let image = generatePosterHtml(movie);
                    return (
                        <div
                            className={getMovieContainerClassName(
                                index,
                                props.foundMovies.length - 1
                            )}
                            key={index}
                            onClick={() => props.loadMovie(movie.Title)}
                        >
                            <div>{image}</div>
                            <div className="customSelect-movie-text">
                                <span>{movie.Title}</span>
                            </div>
                        </div>
                    );
                }
            });
        else return null;
    };

    const foundMovies = prepareFoundMoviesHtml();

    return (
        <div className="customSelect-contain-all">
            <input
                className="customSelect-input"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.valueChange}
                onClick={() => props.toogleMovieList(true, 0)}
                onFocus={() => props.toogleMovieList(true, 0)}
                onBlur={() => props.toogleMovieList(false, 200)}
                onKeyDown={() => handleEscapeKey(event)}
            ></input>
            <div className={getDropdownClass()}>{foundMovies}</div>
        </div>
    );
};

export default customSelect;
