import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import GenreAnswer from "../genre-answer/genre-answer.jsx";
import {GameType} from "../../const";

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
    const {question, renderPlayer} = this.props;
    const {answers, genre} = question;
    const {answers: userAnswers} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          action="#"
          className="game__tracks"
          onSubmit={this._handleSubmitForm}
        >
          {
            answers.map((answer, i) => <GenreAnswer
              key={`${i}-${answer.src}`}
              audioUrl={answer.src}
              userAnswer={userAnswers[i]}
              index={i}
              onChangeAnswer={this._updateAnswers}
              renderPlayer={renderPlayer}
            />)
          }

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  onAnswerDone: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
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
