import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../const";

const SCREENS = {
  [GameType.ARTIST]: ArtistQuestionScreen,
  [GameType.GENRE]: GenreQuestionScreen
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };

    this._incrementStep = this._incrementStep.bind(this);
    this._resetStep = this._resetStep.bind(this);
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreen question={questions[1]} onAnswer={() => {}} />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreen question={questions[0]} onAnswer={() => {}} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    const isDefaultStep = step === -1;

    if (isDefaultStep || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={this._resetStep}
        />
      );
    }

    if (question) {
      const Component = SCREENS[question.type];

      if (!Component) {
        return null;
      }

      return <Component question={question} onAnswer={this._incrementStep} />;
    }

    return null;
  }

  _incrementStep() {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  }

  _resetStep() {
    this.setState({
      step: 0
    });
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default App;
