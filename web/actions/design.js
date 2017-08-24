const changeDesign = (designid, designcolor) => ({
  type: 'CHANGE_RESUME_DESIGN',
  payload: {designid, designcolor}
});

const changeDesignColor = (val) => ({
  type: 'CHANGE_RESUME_DESIGN_COLOR',
  payload: val
});

export {changeDesign, changeDesignColor};
