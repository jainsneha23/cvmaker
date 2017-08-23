import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PageHeaderContainer from '../../containers/page-header';
import FormFeedback from '../../components/form-feedback';
import './small.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogin() {
    window.open('/auth/facebook','popup','width=600,height=600');
    return false;
  }

  componentDidUpdate() {
    if (window.location.hash) {
      const hash = window.location.hash.substr(1);
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView();
    } else scrollTo(0, 0);
  }

  render() {
    return (
      <div ref={(page) => { this.page = page; }} >
        <PageHeaderContainer />
        <div id="top" >
          <article className="bigImage">
            <div className="maxwidth">
              <section>
                <p>Which one would you choose?</p>
                <img src="/assets/images/background.png"/>
                <p>Then why not take one for you ??</p>
              </section>
              <section>
                <header>Impress with your resume</header>
                <p>Your CV is the first point of contact with the recruiter. Stand out and get a interview call faster</p>
                <Link to={this.props.user.id ? '/create' : '/login'}>Create CV now</Link>
              </section>
            </div>
          </article>
        </div>
        <article className="highlights maxwidth">
          <section>
            <img src="/assets/images/design.png"/>
            <header>we Have</header>
            <p>Existing professional resume templates to suit any profession. Perfect for entry level, senior, creative, intern and graduate positions.
            </p>
          </section>
          <section>
            <img src="/assets/images/choose.png"/>
            <header>we Offer</header>
            <p>
              Proffesional templates, along with on demand resume services. Just drop us a email, through our feedback form.
            </p>
          </section>
          <section>
            <img src="/assets/images/edit.png"/>
            <header>we are Different</header>
            <p>
              No signup required. We provide easy forms to prepare your resume. Then it can be easily downloaded as a pdf.
            </p>
          </section>
        </article>
        <div className="templates" id="designs">
          <header>Our templates</header>
          <div className="maxwidth">
            <img src="/assets/cvimages/design1.png"/>
            <img src="/assets/cvimages/design2.png"/>
            <img src="/assets/cvimages/design3.png"/>
          </div>
        </div>
        <div className="messageSection" id="contact">
          <h3>We would love to hear from you.</h3>
          <p>Please contact us for customised designs, help on any area, or just drop a feedback. <br/>We will like to serve you better.</p>
          <FormFeedback />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps
)(Home);

Home.propTypes = {
  user: PropTypes.object.isRequired
};

Home.defaultProps = {};
