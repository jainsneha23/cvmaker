import React from 'react';
import clone from 'clone';

import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import PreviewIcon from 'material-ui/svg-icons/action/visibility';

import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import {EditorState} from 'draft-js';

import Header from '../../components/header';
import PersonalDetails from '../../container/personal-details-container';
import ProfileContainer from '../../container/profile-container';
import SkillContainer from '../../container/skill-container';
import MiscContainer from '../../container/misc-container';
import {PersonalIcon, ProfileIcon, SkillIcon, JobIcon, EducationIcon, MiscIcon} from '../../components/basic/icon';

import './small.less';

class CvForm extends React.Component {
  constructor(props) {
    super(props);
    if (window.__SERVER_DATA__) {
      this.user = window.__SERVER_DATA__.user;
    }
    if (this.user) {
      var query = `query { resumes (userid: ${this.user.id}) { id, resumeid, cvdata } }`;
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(data => data.json())
      .then(data => this.handleCvData(data.resumes[0].cvdata))
      .catch(() => {
        let cvdata = localStorage && localStorage.getItem('cvdata');
        this.handleCvData(cvdata);
      });
    } else {
      let cvdata = localStorage && localStorage.getItem('cvdata');
      this.handleCvData(cvdata);
    }
    this.state =  {
      stepIndex: 5,
      mobileView: false
    };
    this.stepCount = 6;
    this.preview = this.preview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleWidth = this.handleWidth.bind(this);
    this.handleCvData = this.handleCvData.bind(this);
  }

  componentDidMount() {
    this.handleWidth();
    window.addEventListener('resize', this.handleWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWidth);
  }

  handleCvData (cvdata) {
    if (cvdata) {
      cvdata = JSON.parse(cvdata);
      cvdata.profile.summary = EditorState.createWithContent(stateFromHTML(cvdata.profile.summary));
      cvdata.profile.objectives = EditorState.createWithContent(stateFromHTML(cvdata.profile.objectives));
      cvdata.education.forEach(i => {
        i.startdate.value = i.startdate.value ? new Date(i.startdate.value) : new Date();
        i.enddate.value = i.enddate.value ? new Date(i.enddate.value) : new Date();
        i.description.value = EditorState.createWithContent(stateFromHTML(i.description.value));
      });
      cvdata.job.forEach(i => {
        i.startdate.value = i.startdate.value ? new Date(i.startdate.value) : new Date();
        i.enddate.value = i.enddate.value ? new Date(i.enddate.value) : new Date();
        i.responsibilities.value = EditorState.createWithContent(stateFromHTML(i.responsibilities.value));
      });
      cvdata.others.forEach(i => i.description.value = EditorState.createWithContent(stateFromHTML(i.description.value)));
      this.setState({formdata: cvdata});
    }
  }

  handleWidth() {
    this.setState({mobileView: window.innerWidth <= 604});
  }

  handleBack() {
    this.setState({stepIndex: this.state.stepIndex - 1});
  }

  preview() {
    const cvdata = clone(this.state.formdata,3);
    cvdata.profile.summary = cvdata.profile.summary && stateToHTML(cvdata.profile.summary.getCurrentContent());
    cvdata.profile.objectives = cvdata.profile.objectives && stateToHTML(cvdata.profile.objectives.getCurrentContent());
    cvdata.education.forEach(i => i.description.value = i.description.value && stateToHTML(i.description.value.getCurrentContent()));
    cvdata.job.forEach(i => i.responsibilities.value = i.responsibilities.value && stateToHTML(i.responsibilities.value.getCurrentContent()));
    cvdata.others.forEach(i => i.description.value = i.description.value && stateToHTML(i.description.value.getCurrentContent()));
    if (localStorage) {
      localStorage.setItem('cvdata', JSON.stringify(cvdata));
    }
    if (this.user) {
      var query = `mutation { update (id: ${this.user.id}_1, userid: ${this.user.id}, resumeId: 1, cvdata: "${JSON.stringify(cvdata)}") { id } }`;
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(() => {
        browserHistory.push('/preview');
      }).catch(() => {
        browserHistory.push('/preview');
      });
    } else browserHistory.push('/preview');
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
          inkBarStyle={{top: this.state.mobileView ? '112px' : '136px', position: 'fixed', zIndex: 2}}
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
          {/*<Tab value={3} icon={<JobIcon />} label={!this.state.mobileView && 'Job'} >
            <FormGroupContainer
              type="job"
              title="Company Name"
              buttonLabel="Add experience" />
          </Tab>
          <Tab value={4} icon={<EducationIcon />} label={!this.state.mobileView && 'Education'} >
            <FormGroupContainer
              type="education"
              title="Degree"
              buttonLabel="Add Education" />
          </Tab>*/}
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

export default CvForm;