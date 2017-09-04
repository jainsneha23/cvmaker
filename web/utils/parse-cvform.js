import clone from 'clone';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';

const formatDate = (date) => {
  if(!date) return '';
  const d = new Date(date);
  const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d.getDate()}-${month[d.getMonth()]}-${d.getFullYear()}`;
};

const htmlToJson = (data) => {
  const cvdata = JSON.parse(data);
  cvdata.profile.summary.value = EditorState.createWithContent(stateFromHTML(cvdata.profile.summary.value));
  cvdata.profile.objectives.value = EditorState.createWithContent(stateFromHTML(cvdata.profile.objectives.value));
  cvdata.education.list.forEach(i => {
    i.startdate.value = i.startdate.value && new Date(i.startdate.value);
    i.enddate.value = i.enddate.value && new Date(i.enddate.value);
    i.description.value = EditorState.createWithContent(stateFromHTML(i.description.value));
  });
  cvdata.job.list.forEach(i => {
    i.startdate.value = i.startdate.value && new Date(i.startdate.value);
    i.enddate.value = i.enddate.value == 'Present' ? 'Present' : i.enddate.value && new Date(i.enddate.value);
    i.responsibilities.value = EditorState.createWithContent(stateFromHTML(i.responsibilities.value));
  });
  cvdata.misc.list.forEach(i => i.description.value = EditorState.createWithContent(stateFromHTML(i.description.value)));
  return cvdata;
};

const jsonToHtml = (data) => {
  const cvdata = clone(data);
  cvdata.profile.summary.value = stateToHTML(cvdata.profile.summary.value.getCurrentContent()).replace(/\n\s*/g,'').replace(/<p><br><\/p>/g,'<p></p>');
  cvdata.profile.objectives.value = stateToHTML(cvdata.profile.objectives.value.getCurrentContent()).replace(/\n\s*/g,'').replace(/<p><br><\/p>/g,'<p></p>');
  cvdata.education.list.forEach(i => {
    i.startdate.value = i.startdate.value && formatDate(i.startdate.value);
    i.enddate.value = i.enddate.value && formatDate(i.enddate.value);
    i.description.value = stateToHTML(i.description.value.getCurrentContent()).replace(/\n\s*/g,'').replace(/<p><br><\/p>/g,'<p></p>');
  });
  cvdata.job.list.forEach(i => {
    i.startdate.value = i.startdate.value && formatDate(i.startdate.value);
    i.enddate.value = i.enddate.value == 'Present' ? 'Present' : i.enddate.value && formatDate(i.enddate.value);
    i.responsibilities.value = stateToHTML(i.responsibilities.value.getCurrentContent()).replace(/\n\s*/g,'').replace(/<p><br><\/p>/g,'<p></p>');
  });
  cvdata.misc.list.forEach(i => i.description.value = stateToHTML(i.description.value.getCurrentContent()).replace(/\n\s*/g,'').replace(/<p><br><\/p>/g,'<p></p>'));
  return cvdata;
};

export { jsonToHtml, htmlToJson };
