import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import PreviewIcon from 'material-ui/svg-icons/action/visibility';

import {htmlToJson} from '../../utils/parse-cvform';

import Header from '../../components/header';
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
      stepIndex: 0,
      mobileView: false
    };
    this.stepCount = 6;
    this.preview = this.preview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
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

  handleBack() {
    this.setState({stepIndex: this.state.stepIndex - 1});
  }

  preview() {
    if (localStorage) {
      localStorage.setItem('cvdata', JSON.stringify(htmlToJson(this.props.cvdata)));
    }
    browserHistory.push('/preview');
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
        <Header rightElem={this.state.mobileView ? <Avatar backgroundColor='#fff' onClick={this.preview}>
          <PreviewIcon color='rgb(64, 167, 186)' />
        </Avatar> : <RaisedButton
          onClick={this.preview}
          icon={<PreviewIcon color='rgb(64, 167, 186)' />}
          label="Preview"
          labelColor='rgb(64, 167, 186)' />}/>
        <Tabs
          onChange={this.handleChange}
          value={this.state.stepIndex}
          tabItemContainerStyle={{top: '63px', position: 'fixed', width: '100%', zIndex: 2}}
          inkBarStyle={{height: '4px', top: this.state.mobileView ? '109px' : '133px', position: 'fixed', zIndex: 2}}
          contentContainerStyle={{margin: '145px 0 60px 0'}} >
          <Tab value={0} icon={<PersonalIcon />} label={!this.state.mobileView && 'Personal'} >
            <PersonalDetails />
          </Tab>
          <Tab value={1} icon={<ProfileIcon />} label={!this.state.mobileView && 'Profile'}>
            <ProfileContainer />
          </Tab>
          <Tab value={2} icon={<SkillIcon />} label={!this.state.mobileView && 'Skill'} >
            <SkillContainer />
          </Tab>
          <Tab value={3} icon={<JobIcon />} label={!this.state.mobileView && 'Job'} >
            <JobContainer />
          </Tab>
          <Tab value={4} icon={<EducationIcon />} label={!this.state.mobileView && 'Education'} >
            <EducationContainer />
          </Tab>}
          <Tab value={5} icon={<MiscIcon />} label={!this.state.mobileView && 'Others'} >
            <MiscContainer />
          </Tab>
        </Tabs>
        <Toolbar className="toolbar">
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
});

export default connect(
  mapStateToProps
)(CvForm);

CvForm.propTypes = {
  cvdata: PropTypes.object.isRequired
};

CvForm.defaultProps = {};
