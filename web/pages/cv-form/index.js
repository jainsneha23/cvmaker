import React from 'react';
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
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SwipeableViews from 'react-swipeable-views';

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
    this.state = {
      stepIndex: 0,
      formdata: {
        personal: {},
        profile: {},
        skills: [],
        job: [],
        education: [],
        others: []
      }
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
      console.log(this.state);
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
          <FormPersonal onChange={(data) => this.collect(data, 'personal')} />
          <FormProfile onChange={(data) => this.collect(data, 'profile')} />
          <FormSkills onChange={(data) => this.collect(data, 'skills')} />
          <FormJob onChange={(data) => this.collect(data, 'job')} />
          <FormEducation onChange={(data) => this.collect(data, 'education')} />
          <FormOthers onChange={(data) => this.collect(data, 'others')} />
        </SwipeableViews>
      </div>
    );
  }
}

export default CvForm;