import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class GenreAnswer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {answer, index, userAnswers, updateAnswers} = this.props;

    return (
      <div className="track">
        <button className="track__button track__button--play" type="button" />
        <div className="track__status">
          <audio src={answer.src} />
        </div>
        <div className="game__answer">
          <input className="game__input visually-hidden"
            type="checkbox"
            name="answer"
            value={`answer-${index}`}
            id={`answer-${index}`}
            checked={userAnswers[index]}
            onChange={(evt) => {
              const value = evt.target.checked;

              const answers = [...userAnswers.slice(0, index), value, ...userAnswers.slice(index + 1)];

              updateAnswers(answers);
            }}
          />
          <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
        </div>
      </div>
    );
  }
}

GenreAnswer.propTypes = {
  updateAnswers: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  answer: PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
  }).isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired
};

export default GenreAnswer;
