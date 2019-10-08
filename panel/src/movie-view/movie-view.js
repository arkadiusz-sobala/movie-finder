import React from "react";
import "./movie-view.css";

const movieView = props => {
    const generatePosterHtml = () => {
        if (props.chosenMovie.Poster && props.chosenMovie.Poster !== "N/A")
            return (
                <img
                    className="movieView-img"
                    src={props.chosenMovie.Poster}
                    alt="not found"
                ></img>
            );
        else
            return (
                <img
                    className="movieView-img"
                    src="http://www.4motiondarlington.org/wp-content/uploads/2013/06/No-image-found.jpg"
                    alt="not found"
                ></img>
            );
    };

    const generateMovieView = () => {
        if (props.chosenMovie) {
            let poster = generatePosterHtml();
            return (
                <div className="movieView-container">
                    {poster}
                    <div className="movieView-movie-info">
                        <span className="movieView-bold-font movieView-big-font">
                            {props.chosenMovie.Title}
                        </span>
                        <div className="movieView-movie-summary">
                            <span className="movieView-bold-font movieView-medium-font">
                                Summary
                            </span>
                            <span>{props.chosenMovie.Plot}</span>
                        </div>
                        <div className="movieView-movie-summary">
                            <span className="movieView-bold-font movieView-medium-font">
                                Genre
                            </span>
                            <span>{props.chosenMovie.Genre}</span>
                        </div>
                        <div className="movieView-movie-summary">
                            <span className="movieView-bold-font movieView-medium-font">
                                Rating
                            </span>
                            <span>{props.chosenMovie.imdbRating}</span>
                        </div>
                    </div>
                </div>
            );
        } else return null;
    };

    let movieViewHtml = generateMovieView();

    return <div className="movieView-height">{movieViewHtml}</div>;
};

export default movieView;
