import React from 'react';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import { base64ToBlob } from '../../utils/base64-to-blob.js';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      design: ''
    };
    let cvdata = typeof localStorage !== 'undefined' && localStorage.getItem('cvdata');
    this.cvdata = cvdata ? JSON.parse(cvdata) : (this.props.cvdata || {});
    this.download = this.download.bind(this);
    this.getDesign = this.getDesign.bind(this);
  }

  componentDidMount() {
    this.getDesign(1);
  }

  download() {
    fetch('/download',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cvdata: this.cvdata, designId: 1})})
      .then((res) => {
        if (res.ok)
          return res.json();
        else throw Error('Error in fetching resume');
      }).then((response) => {
        const blob = base64ToBlob(response.base64);
        fileSaver.saveAs(blob, 'resume.pdf');
      }).catch(e => this.setState({error: e.message}));
  }

  getDesign(id) {
    fetch(`/design/${id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cvdata: this.cvdata})})
      .then((res) => {
        if (res.ok)
          return res.text();
        else throw Error('Error in fetching design');
      }).then((response) => {
        this.setState({design: response});
      }).catch(e => this.setState({error: e.message}));
  }

  render() {
    return (
      <div className="preview">
        <button onClick={this.download}>Download</button>
        <div>{this.state.error}</div>
        <div dangerouslySetInnerHTML={{__html: this.state.design}} />
      </div>
    );
  }
}

Preview.propTypes = {
  cvdata: React.PropTypes.object
};

export default Preview;