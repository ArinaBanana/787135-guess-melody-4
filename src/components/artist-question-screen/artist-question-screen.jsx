import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const";
import ArtistAnswer from "../artist-answer/artist-answer.jsx";

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
    const {onAnswerDone, question} = this.props;

    this.setState({
      currentIndexAnswer: index
    });

    onAnswerDone(question, answer);
  }

  _isChecked(index) {
    const {currentIndexAnswer} = this.state;
    return currentIndexAnswer === index;
  }

  render() {
    const {question, renderPlayer} = this.props;
    const {answers, song} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            {renderPlayer(song.src, 0)}
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
    );
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswerDone: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
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
