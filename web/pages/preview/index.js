import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar} from 'material-ui/Toolbar';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ColorLens from 'material-ui/svg-icons/image/color-lens';

import {ResumeService} from '../../api';
import {jsonToHtml} from '../../utils/parse-cvform';
import * as ACTIONS from '../../actions';

import * as Templates from '../../templates';
import PageHeaderContainer from '../../containers/page-header';

import './small.less';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      downloading: false
    };
    this.download = this.download.bind(this);
  }

  choose() {
    browserHistory.push('/templates');
  }

  download() {
    this.props.trackDownload();
    this.setState({downloading: true});
    const data = JSON.stringify({
      cvdata: this.props.cvdata,
      templateId: this.props.templateId,
      templateColor: this.props.templateColor
    });
    ResumeService.updateTemplate(this.props.user, 1, this.props.templateId, this.props.templateColor)
      .then(ResumeService.download(data))
      .then(() => this.setState({downloading: false}))
      .catch(e => this.setState({downloading: false, error: e.message}));
  }

  edit() {
    browserHistory.push('/editor');
  }

  render() {
    let Comp = Templates[`Template${this.props.templateId}`] || Templates['Template1'];
    return (
      <div className="preview">
        <PageHeaderContainer />
        <Toolbar className="toolbar fixed">
          <div>
            <RaisedButton style={{minWidth: '48px'}} label={this.props.mobileView ? '' : 'Edit'} onClick={this.edit} icon={<ChevronLeft />}/>
            <div>
              <RaisedButton style={{minWidth: '48px'}}
                icon={<input type="color" value={this.props.templateColor} onChange={this.props.changeTemplateColor} className="colorpicker" />}
              />
              <RaisedButton style={{minWidth: '48px', marginLeft: '8px'}} label={this.props.mobileView ? '' : 'Select Template'} onClick={this.choose} icon={<ColorLens />} />
              <RaisedButton style={{minWidth: '48px', marginLeft: '8px'}} label={this.props.mobileView ? '' : (this.state.downloading ? 'Downloading...' : 'Download')} onClick={this.download} icon={<DownloadIcon className={this.state.downloading && 'downloading'} />} />
            </div>
          </div>
        </Toolbar>
        <div className="error">{this.state.error}</div>
        <div className="preview-card">
          <Comp data={this.props.cvdata} templateColor={this.props.templateColor} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cvdata: jsonToHtml(state.cvform),
  user: state.user,
  templateId: state.templateList.id,
  templateColor: state.templateList.color,
  mobileView: state.app.mobileView
});

const mapDispatchToProps = dispatch => ({
  changeTemplateColor: (e) => {
    dispatch(ACTIONS.changeTemplateColor(e.target.value));
  },
  trackDownload: () => dispatch(ACTIONS.fireButtonClick('download'))
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
  trackDownload: PropTypes.func.isRequired
};

Preview.defaultProps = {};
