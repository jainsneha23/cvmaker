import React from 'react';
import clone from 'clone';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator
} from 'material-ui/Toolbar';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SwipeableViews from 'react-swipeable-views';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import {EditorState} from 'draft-js';

import Header from '../../components/header';
import FormPersonal from '../../components/form-personal';
import FormProfile from '../../components/form-profile';
import FormSkills from '../../components/form-skills';
import FormJob from '../../components/form-job';
import FormEducation from '../../components/form-education';
import FormOthers from '../../components/form-others';

import './small.less';

class CvForm extends React.Component {
  constructor(props) {
    super(props);
    let cvdata = localStorage && localStorage.getItem('cvdata');
    if (cvdata) {
      cvdata = JSON.parse(cvdata);
      cvdata.profile.summary = EditorState.createWithContent(stateFromHTML(cvdata.profile.summary));
      cvdata.profile.objectives = EditorState.createWithContent(stateFromHTML(cvdata.profile.objectives));
      cvdata.education.forEach(i => i.description.value = EditorState.createWithContent(stateFromHTML(i.description.value)));
      cvdata.job.forEach(i => i.responsibilities.value = EditorState.createWithContent(stateFromHTML(i.responsibilities.value)));
      cvdata.others.forEach(i => i.description.value = EditorState.createWithContent(stateFromHTML(i.description.value)));
    }
    this.state =  {
      stepIndex: 0,
      formdata: cvdata || {}
    };
    this.stepCount = 6;
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleBack() {
    this.setState({stepIndex: this.state.stepIndex - 1});
  }

  handleNext() {
    if (this.state.stepIndex === this.stepCount - 1) {
      const cvdata = clone(this.state.formdata,3);
      cvdata.profile.summary = stateToHTML(cvdata.profile.summary.getCurrentContent());
      cvdata.profile.objectives = stateToHTML(cvdata.profile.objectives.getCurrentContent());
      cvdata.education.forEach(i => i.description.value = stateToHTML(i.description.value.getCurrentContent()));
      cvdata.job.forEach(i => i.responsibilities.value = stateToHTML(i.responsibilities.value.getCurrentContent()));
      cvdata.others.forEach(i => i.description.value = stateToHTML(i.description.value.getCurrentContent()));
      if (localStorage) {
        localStorage.setItem('cvdata', JSON.stringify(cvdata));
      }
      browserHistory.push('/preview');
      return;
    }
    this.setState({stepIndex: this.state.stepIndex + 1});
  }

  collect(data, type){
    const formdata = {...this.state.formdata};
    formdata[type] = data;
    this.setState({formdata});
  }

  render() {
    return (
      <div className="cv-form">
        <Header />
        <Toolbar className="toolbar">
          <Stepper activeStep={this.state.stepIndex} linear={true}>
            <Step>
              <StepLabel>Personal Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Profile Summary</StepLabel>
            </Step>
            <Step>
              <StepLabel>Skills</StepLabel>
            </Step>
            <Step>
              <StepLabel>Work Experience</StepLabel>
            </Step>
            <Step>
              <StepLabel>Education</StepLabel>
            </Step>
            <Step>
              <StepLabel>Others</StepLabel>
            </Step>
          </Stepper>
          <ToolbarSeparator style={{height: '56px'}}/>
          <ToolbarGroup>
            <FlatButton
              label="Back"
              onClick={this.handleBack}
              disabled={this.state.stepIndex === 0} />
            <RaisedButton
              label={this.state.stepIndex >= this.stepCount - 1 ? 'Finish' : 'Next'}
              primary={true}
              onClick={this.handleNext}
              disabled={this.state.stepIndex === this.stepCount} />
          </ToolbarGroup>
        </Toolbar>
        <SwipeableViews
          index={this.state.stepIndex}
          disabled
          style={{marginTop: '122px'}} >
          <FormPersonal data={this.state.formdata.personal} onChange={(data) => this.collect(data, 'personal')} />
          <FormProfile data={this.state.formdata.profile} onChange={(data) => this.collect(data, 'profile')} />
          <FormSkills data={this.state.formdata.skills} onChange={(data) => this.collect(data, 'skills')} />
          <FormJob data={this.state.formdata.job} onChange={(data) => this.collect(data, 'job')} />
          <FormEducation data={this.state.formdata.education} onChange={(data) => this.collect(data, 'education')} />
          <FormOthers data={this.state.formdata.others} onChange={(data) => this.collect(data, 'others')} />
        </SwipeableViews>
      </div>
    );
  }
}

export default CvForm;