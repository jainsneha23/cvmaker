import React from 'react';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar} from 'material-ui/Toolbar';
import {Card, CardText} from 'material-ui/Card';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ColorLens from 'material-ui/svg-icons/image/color-lens';

import * as Designs from '../../designs';
import Header from '../../components/header';
import { base64ToBlob } from '../../utils/base64-to-blob.js';
import emptyJson from '../../../mock/empty.json';

import './small.less';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      downloading: false
    };
    this.designId = typeof localStorage !== 'undefined' && +localStorage.getItem('designId') || 1;
    let cvdata = typeof localStorage !== 'undefined' && localStorage.getItem('cvdata');
    this.cvdata = cvdata ? JSON.parse(cvdata) : (this.props.cvdata || emptyJson);
    this.download = this.download.bind(this);
    this.choose = this.choose.bind(this);
  }

  choose() {
    browserHistory.push('/designs');
  }

  download() {
    this.setState({downloading: true});
    fetch('/download',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cvdata: this.cvdata, designId: this.designId})})
      .then((res) => {
        this.setState({downloading: false});
        if (res.ok)
          return res.json();
        else throw Error('Error in fetching resume');
      }).then((response) => {
        const blob = base64ToBlob(response.base64);
        fileSaver.saveAs(blob, 'resume.pdf');
      }).catch(e => this.setState({error: e.message}));
  }

  edit() {
    browserHistory.push('/create');
  }

  render() {
    let Comp = Designs[`Design${this.designId}`] || Designs['Design1'];
    return (
      <div className="preview">
        <Header rightElem={<RaisedButton
            label={this.state.downloading ? 'Downloading...' : 'Download'}
            secondary={true}
            onClick={this.download} /> }/>
        <Toolbar className="toolbar">
          <RaisedButton label="Edit" onClick={this.edit} icon={<ChevronLeft />}/>
          <RaisedButton label="Template" onClick={this.choose} icon={<ColorLens />} />
        </Toolbar>
        <div className="error">{this.state.error}</div>
        <Card className="card">
          <CardText style={{padding: 0}} >
            <Comp data={this.cvdata} />
          </CardText>
        </Card>
      </div>
    );
  }
}

Preview.propTypes = {
  cvdata: React.PropTypes.object
};

export default Preview;