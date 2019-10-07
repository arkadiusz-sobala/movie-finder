import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import CustomSelect from "./custom-select/custom-select";

class App extends Component {
    loading = false;
    state = {
        chosenMovie: undefined,
        searchFraze: "",
        foundMovies: [],
        showMovieList: false,
        searchPlaceholder: "Search movies..."
    };

    handleSearchFrazeChange = event => {
        this.setState({ searchFraze: event.target.value });
        this.searchMovies(event.target.value);
    };

    handleMovieListToggle = event => {
        if (!event)
            setTimeout(() => {
                this.setState({ showMovieList: event });
            }, 200);
        else this.setState({ showMovieList: event });
    };

    searchMovies = searchFraze => {
        let noSpacesSearchFraze = searchFraze.replace(/\s/g, "+");
        if (!this.loading) {
            this.loading = true;
            axios
                .get(
                    `http://www.omdbapi.com/?apikey=123497db&s=${noSpacesSearchFraze}&page=1&type=movie`
                )
                .then(response => {
                    if (response.data && response.data.Search) {
                        this.setState({
                            foundMovies: []
                        });
                        this.setState({
                            foundMovies: response.data.Search.splice(0, 5)
                        });
                    } else if (
                        response.data.Error &&
                        response.data.Error !== "Something went wrong."
                    )
                        this.setState({
                            foundMovies: [
                                { error: true, message: response.data.Error }
                            ]
                        });
                    else this.setState({ foundMovies: [] });
                    this.loading = false;
                });
        }
    };

    handleMovieLoad = event => {
        this.loadMovie(event);
    };

    loadMovie = searchFraze => {
        let noSpacesSearchFraze = searchFraze.replace(/\s/g, "+");
        axios
            .get(
                `http://www.omdbapi.com/?apikey=123497db&t=${noSpacesSearchFraze}&plot=full`
            )
            .then(response => {
                console.log(response);
            });
    };

    render() {
        return (
            <div className="app-background">
                <div className="app-container">
                    <CustomSelect
                        value={this.state.searchFraze}
                        placeholder={this.state.searchPlaceholder}
                        foundMovies={this.state.foundMovies}
                        showMovieList={this.state.showMovieList}
                        valueChange={event =>
                            this.handleSearchFrazeChange(event)
                        }
                        toogleMovieList={event =>
                            this.handleMovieListToggle(event)
                        }
                        loadMovie={event => this.handleMovieLoad(event)}
                    ></CustomSelect>
                </div>
            </div>
        );
    }
}

export default App;
