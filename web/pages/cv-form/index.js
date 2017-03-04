import React from 'react';
import Header from '../../components/header';
import PersonalDetails from '../../components/personal-details';
import './small.less';

class CvForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <PersonalDetails />
      </div>
    );
  }
}

export default CvForm;