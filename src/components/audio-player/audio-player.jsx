import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
    };

    this._audioRef = createRef();

    this._handleButtonPlayClick = this._handleButtonPlayClick.bind(this);
  }

  _handleButtonPlayClick() {
    const {onButtonPlayClick} = this.props;

    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying
    }));

    onButtonPlayClick();
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;
    audio.src = src;

    audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false
      });
    };

    audio.onplay = () => this.setState({
      isPlaying: true,
    });

    audio.onpause = () => this.setState({
      isPlaying: false,
    });

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

  componentDidUpdate() {
    const {isPlaying} = this.state;
    const audio = this._audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  render() {
    const {isLoading, isPlaying} = this.state;

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
