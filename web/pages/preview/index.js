import React from 'react';
import fetch from 'isomorphic-fetch';
import Design1 from '../../designs/design-1';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    let cvdata = typeof localStorage !== 'undefined' && localStorage.getItem('cvdata');
    this.cvdata = cvdata ? JSON.parse(cvdata) : (this.props.cvdata || {});
    this.download = this.download.bind(this);
  }

  download() {
    fetch('/download',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.cvdata)});
  }

  render() {
    return (
      <div className="preview">
        <button onClick={this.download}>Download</button>
        <Design1 data={this.cvdata} />
      </div>
    );
  }
}

export default Preview;