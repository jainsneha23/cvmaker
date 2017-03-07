import React from 'react';

class StyleButton extends React.Component {
  
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

StyleButton.propTypes = {
  active: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
  onToggle: React.PropTypes.func.isRequired,
  style: React.PropTypes.string.isRequired
};

export default StyleButton;
