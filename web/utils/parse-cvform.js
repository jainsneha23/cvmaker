import clone from 'clone';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';

const htmlToJson = (data) => {
  const cvdata = JSON.parse(data);
  cvdata.profile.summary.value = EditorState.createWithContent(stateFromHTML(cvdata.profile.summary.value));
  cvdata.profile.objectives.value = EditorState.createWithContent(stateFromHTML(cvdata.profile.objectives.value));
  cvdata.education.list.forEach(i => {
    i.startdate.value = i.startdate.value ? new Date(i.startdate.value) : new Date();
    i.enddate.value = i.enddate.value ? new Date(i.enddate.value) : new Date();
    i.description.value = EditorState.createWithContent(stateFromHTML(i.description.value));
  });
  cvdata.job.list.forEach(i => {
    i.startdate.value = i.startdate.value ? new Date(i.startdate.value) : new Date();
    i.enddate.value = i.enddate.value ? new Date(i.enddate.value) : new Date();
    i.responsibilities.value = EditorState.createWithContent(stateFromHTML(i.responsibilities.value));
  });
  cvdata.misc.list.forEach(i => i.description.value = EditorState.createWithContent(stateFromHTML(i.description.value)));
  return cvdata;
};

const jsonToHtml = (data) => {
  const cvdata = clone(data);
  cvdata.profile.summary.value = stateToHTML(cvdata.profile.summary.value.getCurrentContent()).replace(/\n\s*/g,'');
  cvdata.profile.objectives.value = stateToHTML(cvdata.profile.objectives.value.getCurrentContent()).replace(/\n\s*/g,'');
  cvdata.education.list.forEach(i => i.description.value = stateToHTML(i.description.value.getCurrentContent()).replace(/\n\s*/g,''));
  cvdata.job.list.forEach(i => i.responsibilities.value = stateToHTML(i.responsibilities.value.getCurrentContent()).replace(/\n\s*/g,''));
  cvdata.misc.list.forEach(i => i.description.value = stateToHTML(i.description.value.getCurrentContent()).replace(/\n\s*/g,''));
  return cvdata;
};

export { jsonToHtml, htmlToJson };
