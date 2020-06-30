import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";

class GenreAnswer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {audioUrl, index, userAnswer, onChangeAnswer, onButtonPlayClick, activePlayer} = this.props;

    return (
      <div className="track">
        <AudioPlayer isPlaying={index === activePlayer} src={audioUrl} onButtonPlayClick={onButtonPlayClick}/>
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
  onButtonPlayClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  activePlayer: PropTypes.number.isRequired,
  userAnswer: PropTypes.bool.isRequired,
  audioUrl: PropTypes.string.isRequired
};

export default GenreAnswer;
