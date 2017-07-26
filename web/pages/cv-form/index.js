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

import CvForm from '../../components/cvforms';
import './small.less';

class CvFormPage extends React.Component {
  constructor(props) {
    super(props);
    ResumeService.get(user);
  }

  preview() {
    const cvdata = clone(this.state.formdata,3);
    cvdata.profile.summary = cvdata.profile.summary && stateToHTML(cvdata.profile.summary.getCurrentContent());
    cvdata.profile.objectives = cvdata.profile.objectives && stateToHTML(cvdata.profile.objectives.getCurrentContent());
    cvdata.education.forEach(i => i.description.value = i.description.value && stateToHTML(i.description.value.getCurrentContent()));
    cvdata.job.forEach(i => i.responsibilities.value = i.responsibilities.value && stateToHTML(i.responsibilities.value.getCurrentContent()));
    cvdata.others.forEach(i => i.description.value = i.description.value && stateToHTML(i.description.value.getCurrentContent()));
    ResumeService.update(user, resumeid, cvdata);
    browserHistory.push('/preview');
  }

  render() {
    return (
      <CvForm />
    );
  }
}

export default CvFormPage;
