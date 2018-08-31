const changeTemplate = (templateid, templatecolor) => ({
  type: 'CHANGE_RESUME_TEMPLATE',
  payload: {templateid, templatecolor}
});

const changeTemplateColor = (val) => ({
  type: 'CHANGE_RESUME_TEMPLATE_COLOR',
  payload: val
});

export {changeTemplate, changeTemplateColor};
