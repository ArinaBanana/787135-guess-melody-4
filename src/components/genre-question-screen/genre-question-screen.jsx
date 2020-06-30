import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import GenreAnswer from "../genre-answer/genre-answer.jsx";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import {GameType} from "../../const";

const GenreAnswerWrapped = withAudioPlayer(GenreAnswer);

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false],
    };

    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._updateAnswers = this._updateAnswers.bind(this);
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();

    const {onAnswerDone, question} = this.props;
    const {answers} = this.state;

    onAnswerDone(question, answers);
  }

  _updateAnswers(answer, index) {
    const {answers: userAnswers} = this.state;
    const answers = [...userAnswers.slice(0, index), answer, ...userAnswers.slice(index + 1)];

    this.setState({
      answers
    });
  }

  render() {
    const {question} = this.props;
    const {answers, genre} = question;
    const {answers: userAnswers} = this.state;

    const styleForTimerLine = {
      "filter": `url(#blur)`,
      "transform": `rotate(-90deg) scaleY(-1)`,
      "transformOrigin": `center`
    };

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={styleForTimerLine}/>
          </svg>

          <div className="game__mistakes">
            <div className="wrong" />
            <div className="wrong" />
            <div className="wrong" />
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            action="#"
            className="game__tracks"
            onSubmit={this._handleSubmitForm}
          >
            {
              answers.map((answer, i) => <GenreAnswerWrapped
                key={`${i}-${answer.src}`}
                audioUrl={answer.src}
                userAnswer={userAnswers[i]}
                index={i}
                onChangeAnswer={this._updateAnswers}
              />)
            }

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswerDone: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};

export default GenreQuestionScreen;
