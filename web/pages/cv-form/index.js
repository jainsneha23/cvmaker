import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import PreviewIcon from 'material-ui/svg-icons/action/visibility';

import {jsonToHtml} from '../../utils/parse-cvform';
import {ResumeService} from '../../api';

import PageHeaderContainer from '../../containers/page-header';
import PersonalDetails from '../../containers/cvforms/personal-details-container';
import ProfileContainer from '../../containers/cvforms/profile-container';
import SkillContainer from '../../containers/cvforms/skill-container';
import JobContainer from '../../containers/cvforms/job-container';
import EducationContainer from '../../containers/cvforms/education-container';
import MiscContainer from '../../containers/cvforms/misc-container';
import {PersonalIcon, ProfileIcon, SkillIcon, JobIcon, EducationIcon, MiscIcon} from '../../components/basic/icon';

import './small.less';

class CvForm extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      stepIndex: 0
    };
    this.stepCount = 6;
    this.preview = this.preview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleBack() {
    this.setState({stepIndex: this.state.stepIndex - 1});
  }

  preview() {
    ResumeService.update(this.props.user, 1, jsonToHtml(this.props.cvdata))
      .then(() => browserHistory.push('/preview'))
      .catch(() => alert('Some error occured. Please try again'));
  }

  handleNext() {
    if (this.state.stepIndex === this.stepCount - 1) this.preview();
    else this.setState({stepIndex: this.state.stepIndex + 1});
  }

  handleChange(value) {
    this.setState({stepIndex: value});
  }

  render() {
    return (
      <div className="cv-form">
        <PageHeaderContainer rightElem={this.props.mobileView ? <Avatar style={{marginTop: '4px'}} backgroundColor='#fff' onClick={this.preview}>
          <PreviewIcon color='rgb(64, 167, 186)' />
        </Avatar> : <RaisedButton
          onClick={this.preview}
          style={{marginTop: '4px'}}
          icon={<PreviewIcon color='rgb(64, 167, 186)' />}
          label="Preview"
          labelColor='rgb(64, 167, 186)' />}/>
        <Tabs
          onChange={this.handleChange}
          value={this.state.stepIndex}
          className="tabs"
          tabItemContainerStyle={{position: 'fixed', top: '65px'}}
          inkBarStyle={{height: '4px'}}
          contentContainerStyle={{margin: this.props.mobileView ? '112px 0px 60px' : '136px 0px 60px'}} >
          <Tab value={0} icon={<PersonalIcon />} label={!this.props.mobileView && 'Personal'} >
            <PersonalDetails />
          </Tab>
          <Tab value={1} icon={<ProfileIcon />} label={!this.props.mobileView && 'Profile'}>
            <ProfileContainer />
          </Tab>
          <Tab value={2} icon={<SkillIcon />} label={!this.props.mobileView && 'Skill'} >
            <SkillContainer />
          </Tab>
          <Tab value={3} icon={<JobIcon />} label={!this.props.mobileView && 'Job'} >
            <JobContainer />
          </Tab>
          <Tab value={4} icon={<EducationIcon />} label={!this.props.mobileView && 'Education'} >
            <EducationContainer />
          </Tab>}
          <Tab value={5} icon={<MiscIcon />} label={!this.props.mobileView && 'Others'} >
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
  designid: state.design.id,
  mobileView: state.app.mobileView,
  wideView: state.app.wideView
});

export default connect(
  mapStateToProps
)(CvForm);

CvForm.propTypes = {
  cvdata: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  designid: PropTypes.number.isRequired,
  mobileView: PropTypes.bool.isRequired,
  wideView: PropTypes.bool.isRequired
};

CvForm.defaultProps = {};
