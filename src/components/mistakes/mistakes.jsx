import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Mistakes extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {count} = this.props;
    const mistakes = new Array(count).fill(``);

    return <div className="game__mistakes">
      {mistakes.map((it, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>;
  }
}

Mistakes.propTypes = {
  count: PropTypes.number.isRequired
};

export default Mistakes;
