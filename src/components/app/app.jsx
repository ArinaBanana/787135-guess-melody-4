import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {errorsCount} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <WelcomeScreen errorsCount={errorsCount} onWelcomeButtonClick={() => {}} />
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreen />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default App;
