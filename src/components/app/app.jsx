import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";

import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../const";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

const SCREENS = {
  [GameType.ARTIST]: ArtistQuestionScreenWrapped,
  [GameType.GENRE]: GenreQuestionScreenWrapped
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._goNextQuestion = this._goNextQuestion.bind(this);
    this._startTest = this._startTest.bind(this);
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
            <ArtistQuestionScreenWrapped question={questions[1]} onAnswerDone={() => {}} />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreenWrapped question={questions[0]} onAnswerDone={() => {}} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderGameScreen() {
    const {errorsCount, questions, step} = this.props;
    const question = questions[step];

    const isDefaultStep = step === -1;

    if (isDefaultStep || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={this._startTest}
        />
      );
    }

    if (question) {
      const Component = SCREENS[question.type];

      if (!Component) {
        return null;
      }

      return <Component question={question} onAnswerDone={this._goNextQuestion} />;
    }

    return null;
  }

  _goNextQuestion() {
    const {questions, step, onUserAnswer} = this.props;

    const isLastStep = step === questions.length - 1;

    if (!isLastStep) {
      onUserAnswer();
    }
  }

  _startTest() {
    const {onWelcomeButtonClick} = this.props;
    onWelcomeButtonClick();
  }
}

const mapStateToProps = (state) => ({
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer() {
    dispatch(ActionCreator.incrementStep());
  },
});

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
