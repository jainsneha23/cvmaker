import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import {Card, CardText} from 'material-ui/Card';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ColorLens from 'material-ui/svg-icons/image/color-lens';

import {ResumeService} from '../../api';
import {jsonToHtml} from '../../utils/parse-cvform';
import * as ACTIONS from '../../actions';

import * as Designs from '../../designs';
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
    browserHistory.push('/designs');
  }

  download() {
    this.props.trackDownload();
    this.setState({downloading: true});
    const data = JSON.stringify({
      cvdata: this.props.cvdata,
      designId: this.props.designId,
      designColor: this.props.designColor
    });
    ResumeService.updateDesign(this.props.user, 1, this.props.designId, this.props.designColor)
      .then(ResumeService.download(data, this.props.user))
      .then(() => this.setState({downloading: false}))
      .catch(e => this.setState({downloading: false, error: e.message}));
  }

  edit() {
    browserHistory.push('/create');
  }

  render() {
    let Comp = Designs[`Design${this.props.designId}`] || Designs['Design1'];
    return (
      <div className="preview">
        <PageHeaderContainer rightElem={this.props.mobileView ? <Avatar style={{marginTop: '4px'}} onClick={this.download}>
          <DownloadIcon color={this.props.muiTheme.palette.primary1Color} className={this.state.downloading && 'downloading'} />
        </Avatar> : <RaisedButton
          onClick={this.download}
          style={{marginTop: '12px'}}
          icon={<DownloadIcon className={this.state.downloading && 'downloading'} />}
          label={this.state.downloading ? 'Downloading...' : 'Download'} />}/>
        <Toolbar className="toolbar fixed">
          <div>
            <RaisedButton style={{minWidth: '48px'}} label={this.props.mobileView ? '' : 'Edit'} onClick={this.edit} icon={<ChevronLeft />}/>
            <div>
              <RaisedButton style={{minWidth: '48px'}}
                icon={<input type="color" value={this.props.designColor} onChange={this.props.changeDesignColor} className="colorpicker" />}
              />
              <RaisedButton style={{minWidth: '48px', marginLeft: '10px'}} label={this.props.mobileView ? '' : 'Select Design'} onClick={this.choose} icon={<ColorLens />} />
            </div>
          </div>
        </Toolbar>
        <div className="error">{this.state.error}</div>
        <Card className="card">
          <CardText className="cardtext" >
            <Comp data={this.props.cvdata} designColor={this.props.designColor} />
          </CardText>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cvdata: jsonToHtml(state.cvform),
  user: state.user,
  designId: state.design.id,
  designColor: state.design.color,
  mobileView: state.app.mobileView
});

const mapDispatchToProps = dispatch => ({
  changeDesignColor: (e) => {
    dispatch(ACTIONS.changeDesignColor(e.target.value));
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
  designId: PropTypes.number.isRequired,
  designColor: PropTypes.string.isRequired,
  changeDesignColor: PropTypes.func.isRequired,
  trackDownload: PropTypes.func.isRequired
};

Preview.defaultProps = {};
