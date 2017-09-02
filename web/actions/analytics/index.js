/* global dataLayer */

const firePageChange = (action, page) => {
  return () => {
    dataLayer.push({
      event: 'PAGE_CHANGE',
      PAGE_ACTION: action,
      PAGE_NAME: page
    });
  };
};

const fireButtonClick = (value) => {
  return () => {
    dataLayer.push({
      event: 'BUTTON_CLICK',
      BUTTON_NAME: value
    });
  };
};

export {firePageChange, fireButtonClick};
