import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class ArtistAnswer extends PureComponent {
  render() {
    const {answer, index, onChangeAnswer, isChecked} = this.props;

    return (
      <div className="artist">
        <input className="artist__input visually-hidden"
          type="radio" name={answer}
          value={`answer-${index}`}
          id={`answer-${index}`}
          checked={isChecked}
          onChange={(evt) => {
            evt.preventDefault();
            onChangeAnswer(answer, index);
          }}
        />
        <label className="artist__name" htmlFor={`answer-${index}`}>
          <img className="artist__picture" src={answer.picture} alt={answer.artist} />
          {answer.artist}
        </label>
      </div>
    );
  }
}

ArtistAnswer.propTypes = {
  onChangeAnswer: PropTypes.func.isRequired,
  answer: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired
  }),
  index: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired
};

export default ArtistAnswer;
