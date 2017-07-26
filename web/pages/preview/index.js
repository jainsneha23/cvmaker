import React from 'react';
import { browserHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import {Card, CardText} from 'material-ui/Card';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ColorLens from 'material-ui/svg-icons/image/color-lens';

import ResumeService from '../../api/resume';

import * as Designs from '../../designs';
import Header from '../../components/header';

import './small.less';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    const designColor = typeof localStorage !== 'undefined' && localStorage.getItem('designColor') || '#40A7BA';
    this.designId = typeof localStorage !== 'undefined' && +localStorage.getItem('designId') || 1;
    let cvdata = typeof localStorage !== 'undefined' && localStorage.getItem('cvdata');
    this.cvdata = cvdata ? JSON.parse(cvdata) : (this.props.cvdata || emptyJson);
    this.state = {
      error: null,
      designColor,
      downloading: false,
      mobileView: false
    };
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
    const data = JSON.stringify({
      cvdata: this.cvdata,
      designId: this.designId,
      designColor: this.state.designColor
    });
    ResumeService.download(data).then(() => {
      this.setState({downloading: false});
    }).catch(e => this.setState({downloading: false, error: e.message}));
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