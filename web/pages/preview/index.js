import React from 'react';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import {Card, CardText} from 'material-ui/Card';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
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
    const designColor = typeof localStorage !== 'undefined' && localStorage.getItem('designColor') || '#40A7BA';
    this.state = {
      error: null,
      designColor,
      downloading: false,
      mobileView: false
    };
    this.designId = typeof localStorage !== 'undefined' && +localStorage.getItem('designId') || 1;
    let cvdata = typeof localStorage !== 'undefined' && localStorage.getItem('cvdata');
    this.cvdata = cvdata ? JSON.parse(cvdata) : (this.props.cvdata || emptyJson);
    this.download = this.download.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleWidth = this.handleWidth.bind(this);
  }

  componentDidMount() {
    this.handleWidth();
    window.addEventListener('resize', this.handleWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWidth);
  }

  handleWidth() {
    this.setState({mobileView: window.innerWidth <= 604});
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
      body: JSON.stringify({cvdata: this.cvdata, designId: this.designId, designColor: this.state.designColor})})
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

  handleColorChange(e) {
    this.setState({designColor: e.target.value});
  }

  render() {
    let Comp = Designs[`Design${this.designId}`] || Designs['Design1'];
    return (
      <div className="preview">
        <Header rightElem={this.state.mobileView ? <Avatar backgroundColor='#fff' onClick={this.download}>
          <DownloadIcon color='rgb(64, 167, 186)' className={this.state.downloading && 'downloading'} />
        </Avatar> : <RaisedButton
          onClick={this.download}
          icon={<DownloadIcon color='rgb(64, 167, 186)' className={this.state.downloading && 'downloading'} />}
          label={this.state.downloading ? 'Downloading...' : 'Download'}
          labelColor='rgb(64, 167, 186)' />}/>
        <Toolbar className="toolbar">
          <div>
            <RaisedButton style={{minWidth: '48px'}} label={this.state.mobileView ? '' : 'Edit'} onClick={this.edit} icon={<ChevronLeft />}/>
            <div>
              <RaisedButton style={{minWidth: '48px'}}
                icon={<input type="color" value={this.state.designColor} onChange={this.handleColorChange} className="colorpicker" />}
              />
              <RaisedButton style={{minWidth: '48px', marginLeft: '10px'}} label={this.state.mobileView ? '' : 'Select Design'} onClick={this.choose} icon={<ColorLens />} />
            </div>
          </div>
        </Toolbar>
        <div className="error">{this.state.error}</div>
        <Card className="card">
          <CardText className="cardtext" >
            <Comp data={this.cvdata} designColor={this.state.designColor} />
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