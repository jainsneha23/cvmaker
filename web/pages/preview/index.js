import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import PrintIcon from 'material-ui/svg-icons/action/print';
import ShareIcon from 'material-ui/svg-icons/social/share';
import LinkIcon from 'material-ui/svg-icons/content/link';
import ColorLens from 'material-ui/svg-icons/image/color-lens';

import {ResumeService} from '../../api';
import {jsonToHtml} from '../../utils/parse-cvform';
import * as ACTIONS from '../../actions';

import * as Templates from '../../templates';
import PageHeaderContainer from '../../containers/page-header';
import EmailDialog from '../../components/email-dialog';
import ShareDialog from '../../components/share-dialog';

import './small.less';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      downloading: false,
      emailDialogOpen: false,
      shareDialogOpen: false
    };
    this.download = this.download.bind(this);
    this.print = this.print.bind(this);
    this.toggleEmailDialog = this.toggleEmailDialog.bind(this);
    this.toggleShareDialog = this.toggleShareDialog.bind(this);
    this.resumeService = new ResumeService();
  }

  choose() {
    browserHistory.push('/templates');
  }

  toggleEmailDialog() {
    this.setState({emailDialogOpen: !this.state.emailDialogOpen});
  }

  toggleShareDialog() {
    this.setState({shareDialogOpen: !this.state.shareDialogOpen});
  }

  download() {
    this.props.fireButtonClick('download');
    this.setState({downloading: true});
    const data = JSON.stringify({
      cvdata: this.props.cvdata,
      templateId: this.props.templateId,
      templateColor: this.props.templateColor
    });
    this.resumeService.updateTemplate(this.props.user, 1, this.props.templateId, this.props.templateColor)
      .then(this.resumeService.download(data))
      .then(() => this.setState({downloading: false}))
      .catch(e => this.setState({downloading: false, error: e.message}));
  }

  edit() {
    browserHistory.push('/editor');
  }

  print() {
    this.props.fireButtonClick('print');
    this.resumeService.updateTemplate(this.props.user, 1, this.props.templateId, this.props.templateColor)
      .then(() => window.print())
      .catch(e => this.setState({error: e.message}));
  }

  render() {
    let Comp = Templates[`Template${this.props.templateId}`] || Templates['Template1'];
    const style = {
      minWidth: '48px',
      marginLeft: '8px'
    };
    const labelStyle = {paddingRight: 8};
    const buttonStyle = {};
    const allStyles = {style, labelStyle, buttonStyle};
    return (
      <div className="preview">
        <PageHeaderContainer />
        <Toolbar className="toolbar fixed">
          <div>
            <div>
              <RaisedButton {...allStyles} labelStyle={{paddingLeft: 0, paddingRight: 8}} label={this.props.mobileView ? '' : 'Editor'} onClick={this.edit} icon={<ChevronLeft style={{marginLeft: 0}} />}/>
              <RaisedButton {...allStyles} icon={<input type="color" value={this.props.templateColor} onChange={this.props.changeTemplateColor} className="colorpicker" />}/>
              <RaisedButton {...allStyles} label={this.props.mobileView ? '' : 'Select Template'} onClick={this.choose} icon={<ColorLens />} />
            </div>
            <div>
              <IconMenu
                iconButtonElement={<RaisedButton {...allStyles} label={this.props.mobileView ? '' : 'Share'} icon={<ShareIcon />} />}
                open={this.state.openMenu}
                onRequestChange={this.handleOnRequestChange}
              >
                <MenuItem value="2" primaryText="Print" onClick={this.print} icon={<PrintIcon />} />
                <MenuItem value="3" primaryText="Email PDF" onClick={this.toggleEmailDialog} icon={<EmailIcon />}/>
                <MenuItem value="4" primaryText="Share Link" onClick={this.toggleShareDialog} icon={<LinkIcon />}/>
              </IconMenu>
              <RaisedButton {...allStyles} label={this.props.mobileView ? '' : (this.state.downloading ? 'Downloading...' : 'Download')} onClick={this.download} icon={<DownloadIcon className={this.state.downloading && 'downloading'} />} />
            </div>
          </div>
        </Toolbar>
        <div className="error">{this.state.error}</div>
        <div className="preview-card">
          <Comp data={this.props.cvdata} templateColor={this.props.templateColor} />
        </div>
        <EmailDialog toggle={this.toggleEmailDialog} isOpen={this.state.emailDialogOpen} />
        <ShareDialog toggle={this.toggleShareDialog} isOpen={this.state.shareDialogOpen} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cvdata: jsonToHtml(state.cvform),
  user: state.user,
  templateId: state.template.id,
  templateColor: state.template.color,
  mobileView: state.app.mobileView
});

const mapDispatchToProps = dispatch => ({
  changeTemplateColor: (e) => {
    dispatch(ACTIONS.changeTemplateColor(e.target.value));
  },
  fireButtonClick: (buttonName) => dispatch(ACTIONS.fireButtonClick(buttonName))
});

export default muiThemeable()(connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview));

Preview.propTypes = {
  cvdata: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  mobileView: PropTypes.bool.isRequired,
  templateId: PropTypes.number.isRequired,
  templateColor: PropTypes.string.isRequired,
  changeTemplateColor: PropTypes.func.isRequired,
  fireButtonClick: PropTypes.func.isRequired
};

Preview.defaultProps = {};
