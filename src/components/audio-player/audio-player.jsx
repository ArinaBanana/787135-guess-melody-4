import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isLoading: true,
    };

    this._audioRef = createRef();

    this._handleButtonPlayClick = this._handleButtonPlayClick.bind(this);
  }

  _handleButtonPlayClick() {
    const {onButtonPlayClick} = this.props;
    onButtonPlayClick();
  }

  componentDidMount() {
    const {src, isPlaying} = this.props;
    const audio = this._audioRef.current;
    audio.src = src;

    if (isPlaying) {
      audio.play();
    }

    audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false
      });
    };

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  componentDidUpdate(prevProps) {
    const audio = this._audioRef.current;
    const {isPlaying} = this.props;

    if (prevProps.isPlaying && !isPlaying) {
      audio.pause();
    }

    if (!prevProps.isPlaying && isPlaying) {
      audio.play();
    }
  }

  render() {
    const {isLoading} = this.state;
    const {isPlaying} = this.props;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._handleButtonPlayClick}
        />
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onButtonPlayClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
