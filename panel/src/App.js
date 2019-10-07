import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import CustomSelect from "./custom-select/custom-select";

class App extends Component {
    state = {
        chosenMovie: undefined,
        searchFraze: "",
        foundMovies: [],
        searchPlaceholder: "Search movies..."
    };

    handleSearchFrazeChange = event => {
        this.setState({ searchFraze: event.target.value });
        this.searchMovies(event.target.value);
    };

    searchMovies(searchFraze) {
        let noSpacesSearchFraze = searchFraze.replace(/\s/g, "+");
        axios
            .get(
                `http://www.omdbapi.com/?apikey=123497db&s=${noSpacesSearchFraze}`
            )
            .then(response => {
                if (response.data && response.data.Search)
                    this.setState({
                        foundMovies: response.data.Search.splice(0, 5)
                    });
                else if (response.data.Error)
                    this.setState({
                        foundMovies: [
                            { error: true, message: response.data.Error }
                        ]
                    });
                else this.setState({ foundMovies: [] });
            });
    }

    render() {
        return (
            <div className="app-background">
                <div className="app-container">
                    <CustomSelect
                        value={this.state.searchFraze}
                        placeholder={this.state.searchPlaceholder}
                        foundMovies={this.state.foundMovies}
                        foundMovies={this.state.foundMovies}
                        valueChange={() => this.handleSearchFrazeChange(event)}
                    ></CustomSelect>
                </div>
            </div>
        );
    }
}

export default App;
