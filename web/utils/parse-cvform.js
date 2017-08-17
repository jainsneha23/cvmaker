import clone from 'clone';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';

const jsonToHtml = (data) => {
  const cvdata = clone(data);
  cvdata.profile.summary = EditorState.createWithContent(stateFromHTML(cvdata.profile.summary));
  cvdata.profile.objectives = EditorState.createWithContent(stateFromHTML(cvdata.profile.objectives));
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

const htmlToJson = (data) => {
  const cvdata = clone(data);
  cvdata.profile.summary = cvdata.profile.summary && stateToHTML(cvdata.profile.summary.getCurrentContent());
  cvdata.profile.objectives = cvdata.profile.objectives && stateToHTML(cvdata.profile.objectives.getCurrentContent());
  cvdata.education.list.forEach(i => i.description.value = i.description.value && stateToHTML(i.description.value.getCurrentContent()));
  cvdata.job.list.forEach(i => i.responsibilities.value = i.responsibilities.value && stateToHTML(i.responsibilities.value.getCurrentContent()));
  cvdata.misc.list.forEach(i => i.description.value = i.description.value && stateToHTML(i.description.value.getCurrentContent()));
  return cvdata;
};

export { jsonToHtml, htmlToJson };
