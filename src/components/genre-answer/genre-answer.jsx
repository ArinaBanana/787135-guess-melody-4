import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class GenreAnswer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: [false, false, false, false],
    };
  }

  render() {
    const {answer, index} = this.props;
    const {answers: userAnswers} = this.state;

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

              this.setState({
                answers: [...userAnswers.slice(0, index), value, ...userAnswers.slice(index + 1)],
              });
            }}
          />
          <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
        </div>
      </div>
    );
  }
}

GenreAnswer.propTypes = {
  index: PropTypes.number.isRequired,
  answer: PropTypes.object.isRequired,
};

export default GenreAnswer;
