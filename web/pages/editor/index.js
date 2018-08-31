import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import PreviewIcon from 'material-ui/svg-icons/action/visibility';

import {jsonToHtml} from '../../utils/parse-cvform';
import {ResumeService} from '../../api';
import * as ACTIONS from '../../actions';

import PageHeaderContainer from '../../containers/page-header';
import PersonalDetails from '../../containers/cvforms/personal-details-container';
import ProfileContainer from '../../containers/cvforms/profile-container';
import SkillContainer from '../../containers/cvforms/skill-container';
import JobContainer from '../../containers/cvforms/job-container';
import EducationContainer from '../../containers/cvforms/education-container';
import MiscContainer from '../../containers/cvforms/misc-container';
import {PersonalIcon, ProfileIcon, SkillIcon, JobIcon, EducationIcon, MiscIcon} from '../../components/basic/icon';

import './small.less';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      stepIndex: 0
    };
    this.stepCount = 6;
    this.steps = ['Personal', 'Profile', 'Skill', 'Job', 'Education', 'Misc'];
    this.preview = this.preview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleBack() {
    this.props.trackFormSection('cvform-back');
    this.setState({stepIndex: this.state.stepIndex - 1});
  }

  preview() {
    this.props.trackPreview();
    ResumeService.update(this.props.user, 1, jsonToHtml(this.props.cvdata))
      .then(() => browserHistory.push('/preview'))
      .catch(() => alert('Some error occured. Please try again'));
  }

  handleNext() {
    this.props.trackFormSection('cvform-next');
    if (this.state.stepIndex === this.stepCount - 1) this.preview();
    else this.setState({stepIndex: this.state.stepIndex + 1});
  }

  handleChange(value) {
    this.props.trackFormSection(`cvform-${this.steps[value]}`);
    this.setState({stepIndex: value});
  }

  render() {
    const primaryColor = this.props.muiTheme.palette.primary1Color;
    return (
      <div className="editor">
        <PageHeaderContainer />
        <Toolbar className="toolbar fixed" style={{top: '64px'}}>
          <div>
            <RaisedButton
              onClick={this.preview}
              icon={<PreviewIcon />}
              style={{minWidth: '48px'}}
              label={!this.props.mobileView && 'Preview'} />
          </div>
        </Toolbar>
        <Tabs
          onChange={this.handleChange}
          value={this.state.stepIndex}
          className="tabs"
          tabItemContainerStyle={{position: 'fixed', top: '120px'}}
          inkBarStyle={{height: '4px'}}
          contentContainerStyle={{margin: this.props.mobileView ? '170px 0px 60px' : '192px 0px 60px'}} >
          <Tab value={0} buttonStyle={{color: primaryColor}} icon={<PersonalIcon />} label={!this.props.mobileView && this.steps[0]} >
            <PersonalDetails />
          </Tab>
          <Tab value={1} buttonStyle={{color: primaryColor}} icon={<ProfileIcon />} label={!this.props.mobileView && this.steps[1]}>
            <ProfileContainer />
          </Tab>
          <Tab value={2} buttonStyle={{color: primaryColor}} icon={<SkillIcon />} label={!this.props.mobileView && this.steps[2]} >
            <SkillContainer />
          </Tab>
          <Tab value={3} buttonStyle={{color: primaryColor}} icon={<JobIcon />} label={!this.props.mobileView && this.steps[3]} >
            <JobContainer />
          </Tab>
          <Tab value={4} buttonStyle={{color: primaryColor}} icon={<EducationIcon />} label={!this.props.mobileView && this.steps[4]} >
            <EducationContainer />
          </Tab>}
          <Tab value={5} buttonStyle={{color: primaryColor}} icon={<MiscIcon />} label={!this.props.mobileView && this.steps[5]} >
            <MiscContainer />
          </Tab>
        </Tabs>
        <Toolbar className="toolbar fixed">
          <div>
            <RaisedButton
              label="Back"
              primary={true}
              onClick={this.handleBack}
              disabled={this.state.stepIndex === 0} />
            <RaisedButton
              label={this.state.stepIndex >= this.stepCount - 1 ? 'Preview' : 'Next'}
              primary={true}
              onClick={this.handleNext}
              disabled={this.state.stepIndex === this.stepCount} />
          </div>
        </Toolbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cvdata: state.cvform,
  user: state.user,
  mobileView: state.app.mobileView
});

const mapDispatchToProps = dispatch => ({
  trackPreview: () => dispatch(ACTIONS.fireButtonClick('preview')),
  trackFormSection: (val) => dispatch(ACTIONS.fireButtonClick(val))
});

export default muiThemeable()(connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor));

Editor.propTypes = {
  muiTheme: PropTypes.object,
  cvdata: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  mobileView: PropTypes.bool.isRequired,
  trackPreview: PropTypes.func.isRequired,
  trackFormSection: PropTypes.func.isRequired
};

Editor.defaultProps = {};
