import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PageHeaderContainer from '../../containers/page-header';
import FormFeedback from '../../components/form-feedback';
import TemplateListContainer from '../../containers/template-list';

import ComputerIcon from 'material-ui/svg-icons/hardware/laptop-mac';
import TabletIcon from 'material-ui/svg-icons/hardware/tablet-mac';
import MobileIcon from 'material-ui/svg-icons/hardware/phone-iphone';
import PDFIcon from 'material-ui/svg-icons/image/picture-as-pdf';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PrintIcon from 'material-ui/svg-icons/action/print';

import './small.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (window.location.hash) {
      const hash = window.location.hash.substr(1);
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView();
    }
  }

  render() {
    return (
      <div className="home" ref={(page) => { this.page = page; }} >
        <PageHeaderContainer />
        <div id="top" >
          <article className="bigImage">
            <section className="image"/>
            <section className="header-text">
              <div>Share CV across any platform
                <br />
                <ul>
                  {/*<li><ComputerIcon />Computer</li>
                  <li><TabletIcon />Tablet</li>
                  <li><MobileIcon/> Mobile</li>*/}
                  <li><PDFIcon/> PDF</li>
                  {/*<li><EmailIcon/> Email</li>*/}
                  <li><PrintIcon/> Print</li>
                </ul>
                <Link to='/editor'>Create CV Now</Link>
                <span>Free!! No registration required</span>
              </div>
            </section>
          </article>
        </div>
        <div className="templates" id="templates">
          <header>Our templates</header>
          <div className="maxwidth"><TemplateListContainer /></div>
        </div>
        <div className="messageSection" id="contact">
          <h3>We would love to hear from you.</h3>
          <p>Please contact us for customised templates, help on any area, or just drop a feedback. <br/>We will like to serve you better.</p>
          <FormFeedback />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(
  mapStateToProps
)(Home);

Home.propTypes = {
  user: PropTypes.object.isRequired
};

Home.defaultProps = {};
