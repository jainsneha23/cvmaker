import React from 'react';
import clone from 'clone';

import {Tabs, Tab} from 'material-ui/Tabs';
import {Toolbar} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import {EditorState} from 'draft-js';

import Header from '../../components/header';
import FormPersonal from '../../components/form-personal';
import FormProfile from '../../components/form-profile';
import FormGroup from '../../components/form-group';
import emptyJson from '../../../mock/empty.json';
import {PersonalIcon, ProfileIcon, SkillIcon, JobIcon, EducationIcon, MiscIcon} from '../../components/icon';

import './small.less';

class CvForm extends React.Component {
  constructor(props) {
    super(props);
    let cvdata = localStorage && localStorage.getItem('cvdata');
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
    }
    this.state =  {
      stepIndex: 0,
      formdata: cvdata || clone(emptyJson,3),
      showLabel: false
    };
    this.stepCount = 6;
    this.preview = this.preview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }

  componentDidMount() {
    this.handleLabel();
    window.onresize = this.handleLabel;
  }

  handleLabel() {
    this.setState({showLabel: window.innerWidth > 604});
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
    browserHistory.push('/preview');
    return;
  }

  handleNext() {
    if (this.state.stepIndex === this.stepCount - 1) this.preview();
    else this.setState({stepIndex: this.state.stepIndex + 1});
  }

  handleChange(value) {
    this.setState({stepIndex: value});
  }

  collect(data, type){
    const formdata = {...this.state.formdata};
    formdata[type] = data;
    this.setState({formdata});
  }

  render() {
    return (
      <div className="cv-form">
        <Header rightElem={<RaisedButton
            label={'Preview'}
            secondary={true}
            onClick={this.preview} /> }/>
        <Tabs
          onChange={this.handleChange}
          value={this.state.stepIndex}
          tabItemContainerStyle={{top: '64px', position: 'fixed', width: '100%', zIndex: 2}}
          inkBarStyle={{top: this.state.showLabel ? '136px' : '112px', position: 'fixed', zIndex: 2}}
          contentContainerStyle={{margin: '145px 0 60px 0'}} >
          <Tab value={0} icon={<PersonalIcon />} label={this.state.showLabel && 'Personal'} >
            <FormPersonal data={this.state.formdata.personal} onChange={(data) => this.collect(data, 'personal')} />
          </Tab>
          <Tab value={1} icon={<ProfileIcon />} label={this.state.showLabel && 'Profile'}>
            <FormProfile data={this.state.formdata.profile} onChange={(data) => this.collect(data, 'profile')} />
          </Tab>
          <Tab value={2} icon={<SkillIcon />} label={this.state.showLabel && 'Skill'} >
            <FormGroup
              type="skills"
              title="Skill Category"
              buttonLabel="Add Skill Category"
              structure={emptyJson.skills[0]}
              data={this.state.formdata.skills}
              onChange={(data) => this.collect(data, 'skills')} />
          </Tab>
          <Tab value={3} icon={<JobIcon />} label={this.state.showLabel && 'Job'} >
            <FormGroup
              type="job"
              title="Company Name"
              buttonLabel="Add experience"
              structure={emptyJson.job[0]}
              data={this.state.formdata.job}
              onChange={(data) => this.collect(data, 'job')} />
          </Tab>
          <Tab value={4} icon={<EducationIcon />} label={this.state.showLabel && 'Education'} >
            <FormGroup
              type="education"
              title="Degree"
              buttonLabel="Add Education"
              structure={emptyJson.education[0]}
              data={this.state.formdata.education}
              onChange={(data) => this.collect(data, 'education')} />
          </Tab>
          <Tab value={5} icon={<MiscIcon />} label={this.state.showLabel && 'Others'} >
            <FormGroup
              type="others"
              title="Label"
              buttonLabel="Add More"
              structure={emptyJson.others[0]}
              data={this.state.formdata.others}
              onChange={(data) => this.collect(data, 'others')} />
          </Tab>
        </Tabs>
        <Toolbar style={{position: 'fixed', bottom: 0, width: '100%', padding: '10px 24px', zIndex: 2}}>
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
        </Toolbar>
      </div>
    );
  }
}

export default CvForm;