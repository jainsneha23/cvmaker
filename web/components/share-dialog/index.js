import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import {ResumeService} from '../../api';
import {jsonToHtml} from '../../utils/parse-cvform';
import * as ACTIONS from '../../actions';

import './small.less';

class ShareDialog extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      sharing: false,
      stop_sharing: false,
      shareError: null,
      emailSucess: false
    };
    this.share = this.share.bind(this);
    this.stopShare = this.stopShare.bind(this);
    this.resumeService = new ResumeService();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen && !this.props.share.link) {
      this.share();
    }
  }

  share() {
    this.props.fireButtonClick('share');
    this.setState({sharing: true});
    this.resumeService.updateTemplate(this.props.user, 1, this.props.templateId, this.props.templateColor)
      .then(() => this.resumeService.share(JSON.stringify({id: `${this.props.user.id}_1`})))
      .then((link) => {
        this.setState({
          sharing: false
        });
        this.props.updateLink(link);
      }).catch(() => {
        this.setState({sharing: false, shareError: 'An error occured. please try again'});
      });
  }

  stopShare() {
    this.props.fireButtonClick('stop_share');
    this.setState({stop_sharing: true});
    this.resumeService.updateTemplate(this.props.user, 1, this.props.templateId, this.props.templateColor)
      .then(() => this.resumeService.stopShare(JSON.stringify({id: `${this.props.user.id}_1`})))
      .then((link) => {
        this.setState({
          stop_sharing: false
        });
        this.props.updateLink(link);
        this.props.toggle();
      }).catch(() => {
        this.setState({stop_sharing: false, shareError: 'An error occured. please try again'});
      });
  }

  render() {
    return (
      <div>
        <Dialog
          title="Share Resume"
          className="share-dialog"
          contentStyle={{width: '90%'}}
          actionsContainerStyle={{marginTop: 0}}
          titleClassName="title"
          actions={[this.props.share.link ? <RaisedButton
            label="Stop Sharing"
            primary={true}
            onTouchTap={this.stopShare}
          /> : null, <RaisedButton
            style={{marginLeft: 16}}
            label={this.props.share.link ? 'Copy & Close' : 'Close'}
            primary={false}
            onTouchTap={this.props.toggle}
          />]}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.props.toggle} >
          <div>
            <p className="error">{this.state.shareError}</p>
            {this.state.sharing ? 'Generating link...' : <a href={`${this.props.share.link}`} target="_blank">{this.props.share.link}</a>}
            {this.state.stop_sharing && 'Deleting the link...'}
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cvdata: jsonToHtml(state.cvform),
  user: state.user,
  templateId: state.template.id,
  templateColor: state.template.color,
  mobileView: state.app.mobileView,
  share: state.share
});

const mapDispatchToProps = dispatch => ({
  fireButtonClick: (buttonName) => dispatch(ACTIONS.fireButtonClick(buttonName)),
  updateLink: (link) => dispatch(ACTIONS.changeShareLink(link))
});

ShareDialog.propTypes = {
  fireButtonClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  cvdata: PropTypes.object.isRequired,
  templateId: PropTypes.number.isRequired,
  templateColor: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  share: PropTypes.object.isRequired,
  updateLink: PropTypes.func.isRequired
};

export default muiThemeable()(connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareDialog));
