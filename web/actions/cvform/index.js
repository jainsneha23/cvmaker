export * from './skill';
export * from './job';
export * from './education';
export * from './misc';

import {ResumeService} from '../../api';

const changePersonal = (e, type) => ({
  type: 'CHANGE_PERSONAL',
  payload: {
    type,
    value: e.target.value,
    error: e.target.required && !e.target.value ? 'This field is required' : ''
  }
});

const changeProfile = (e, type) => ({
  type: 'CHANGE_PROFILE',
  payload: { type, value: e.target.value }
});

const fetchResumes = () => {
  return dispatch => new Promise((resolve, reject) => {
    ResumeService().then((data) => {
      const cvdata = data.resumes[0].cvdata;
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
    }).catch(e);
  });
}

export { changePersonal, changeProfile, fetchResumes };
