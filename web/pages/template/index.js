import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';
import {Toolbar} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import PreviewIcon from 'material-ui/svg-icons/action/visibility';

import PageHeaderContainer from '../../containers/page-header';
import TemplateListContainer from '../../containers/template-list';

import {ResumeService} from '../../api';
import * as ACTIONS from '../../actions';
import tilesData from '../../templates/list';

import './small.less';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.preview = this.preview.bind(this);
  }

  preview() {
    this.props.trackPreview();
    const templateid = this.props.templateId;
    const templatecolor = tilesData[this.props.templateId - 1].templateColor;
    ResumeService.updateTemplate(this.props.user, 1, templateid, templatecolor)
      .then(() => browserHistory.push('/preview'))
      .catch(() => alert('Some error occured. Please try again'));
  }

  render() {
    const primaryColor = this.props.muiTheme.palette.primaryColor;
    return (
      <div className="templates">
        <PageHeaderContainer />
        <Toolbar className="toolbar fixed" style={{top: '64px'}}>
          <div>
            {this.props.mobileView ? <Avatar onClick={this.preview}>
              <PreviewIcon color={primaryColor} />
            </Avatar> : <RaisedButton
              onClick={this.preview}
              icon={<PreviewIcon />}
              label="Preview" />}
          </div>
        </Toolbar>
        <TemplateListContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  templateId: state.templateList.id,
  user: state.user,
  mobileView: state.app.mobileView,
});

const mapDispatchToProps = dispatch => ({
  trackPreview: () => dispatch(ACTIONS.fireButtonClick('preview'))
});

export default muiThemeable()(connect(
  mapStateToProps,
  mapDispatchToProps
)(Template));

Template.propTypes = {
  muiTheme: PropTypes.object,
  user: PropTypes.object.isRequired,
  templateId: PropTypes.number.isRequired,
  changeTemplate: PropTypes.func.isRequired,
  trackPreview: PropTypes.func.isRequired,
  mobileView: PropTypes.bool.isRequired
};

Template.defaultProps = {
  selectedTemplateID: 0
};
