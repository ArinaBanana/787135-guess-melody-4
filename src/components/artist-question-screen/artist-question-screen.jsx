import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";
import ArtistAnswer from "../artist-answer/artist-answer.jsx";
import AudioPlayer from "../audio-player/audio-player.jsx";

const styleForTimerLine = {
  "filter": `url(#blur)`,
  "transform": `rotate(-90deg) scaleY(-1)`,
  "transformOrigin": `center`
};

class ArtistQuestionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndexAnswer: -1,
    };

    this._updateAnswer = this._updateAnswer.bind(this);
    this._isChecked = this._isChecked.bind(this);
  }

  _updateAnswer(answer, index) {
    const {onAnswerDone} = this.props;

    this.setState({
      currentIndexAnswer: index
    });

    onAnswerDone(answer, index);
  }

  _isChecked(index) {
    const {currentIndexAnswer} = this.state;
    return currentIndexAnswer === index;
  }

  render() {
    const {question} = this.props;
    const {answers, song} = question;

    return (
      <section className="game game--artist">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370" style={styleForTimerLine}/>
          </svg>

          <div className="game__mistakes">
            <div className="wrong" />
            <div className="wrong" />
            <div className="wrong" />
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              <AudioPlayer src={song.src} isPlaying={true}/>
            </div>
          </div>

          <form className="game__artist">
            {
              answers.map((answer, i) => {
                const isChecked = this._isChecked(i);

                return <ArtistAnswer key={answer.artist} answer={answer} index={i} onChangeAnswer={this._updateAnswer} isChecked={isChecked} />;
              })
            }
          </form>
        </section>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswerDone: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })).isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired
  })
};

export default ArtistQuestionScreen;
