/* global dataLayer */

const firePageChange = (action, page) => {
  return () => {
    dataLayer.push({
      PAGE_CHANGE: {action, page}
    });
  };
};

const fireButtonClick = (value) => {
  return () => {
    dataLayer.push({
      BUTTON_CLICK: value
    });
  };
};

export {firePageChange, fireButtonClick};
