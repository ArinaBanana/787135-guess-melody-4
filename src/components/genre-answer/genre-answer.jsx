import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";

class GenreAnswer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {audioUrl, index, userAnswer, onChangeAnswer} = this.props;

    return (
      <div className="track">
        <AudioPlayer isPlaying={index === 0} src={audioUrl}/>
        <div className="game__answer">
          <input className="game__input visually-hidden"
            type="checkbox"
            name="answer"
            value={`answer-${index}`}
            id={`answer-${index}`}
            checked={userAnswer}
            onChange={(evt) => {
              const value = evt.target.checked;

              onChangeAnswer(value, index);
            }}
          />
          <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
        </div>
      </div>
    );
  }
}

GenreAnswer.propTypes = {
  onChangeAnswer: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  userAnswer: PropTypes.bool.isRequired,
  audioUrl: PropTypes.string.isRequired
};

export default GenreAnswer;
