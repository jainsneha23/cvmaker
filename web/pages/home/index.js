import React from 'react';
import ReactDOM from 'react-dom';
import ScrollAnim from 'rc-scroll-anim';
import { Link } from 'react-router';
import Logo from '../../components/basic/logo';
import FormFeedback from '../../components/form-feedback';
import './small.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: (window && window.location.hash.substr(1)) || 'top'
    };
    if (window.__SERVER_DATA__) {
      this.user = window.__SERVER_DATA__.user;
    }
    this.setActiveNav = this.setActiveNav.bind(this);
    this.handlePageScroll = this.handlePageScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handlePageScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handlePageScroll);
  }

  handleLogin() {
    window.open('/auth/facebook','popup','width=600,height=600');
    return false;
  }

  handlePageScroll() {
    var bottom = this.bigImage.getBoundingClientRect().bottom;
    const header = ReactDOM.findDOMNode(this.page).querySelector('header');
    if (bottom < 50){  
      header.classList.add('sticky');
    } else{
      header.classList.remove('sticky');
    }
  }

  setActiveNav(e) {
    e.preventDefault();
    this.setState({activeLink: e.currentTarget.target});
  }

  render() {
    const ScrollElement = ScrollAnim.Element;
    const ScrollLink = ScrollAnim.Link;
    return (
      <div ref={(page) => { this.page = page; }} >
        <header className="page-heading">
          <div className="maxwidth">
            <Logo />
            <nav>
              <ScrollLink to="top"><span target="top" onClick={this.setActiveNav} className={this.state.activeLink === 'top' ? 'active' : ''}>Home</span></ScrollLink>
              <ScrollLink to="designs"><span to="designs" onClick={this.setActiveNav} className={this.state.activeLink === 'designs' ? 'active' : ''}>Designs</span></ScrollLink>
              <ScrollLink to="contact"><span to="contact" onClick={this.setActiveNav} className={this.state.activeLink === 'contact' ? 'active' : ''}>Contact</span></ScrollLink>
            </nav>
          </div>
        </header>
        <ScrollElement id="top" >
          <article className="bigImage" ref={(bigImage) => { this.bigImage = bigImage; }} >
            <section>
              <p>Which one would you choose?</p>
              <img src="/assets/images/background.png"/>
              <p>Then why not take one for you ??</p>
            </section>
            <section>
              <header>Impress with your resume</header>
              <p>Your CV is the first point of contact with the recruiter. Stand out and get a interview call faster</p>
              {this.user ? <div className="loggedIn">
                <span>Welcome, </span>
                <span>{this.user.displayName}</span>
              </div> :  
              <div className="login">
                <span>Signin with your social accounts</span>
                <ul>
                  <li>
                    <a className="facebook" href="/auth/facebook" target="popup" onClick={this.handleLogin}>
                      <img src="/assets/images/facebook.png" alt="facebook" />
                    </a>
                  </li>
                </ul>
              </div>}
              <Link to='/create'>{this.user ? 'Create CV now' : 'Or, start without signing in'}</Link>
            </section>
          </article>
        </ScrollElement>
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
        <ScrollElement className="templates" id="designs">
          <header>Our templates</header>
          <div className="maxwidth">
            <img src="/assets/cvimages/design1.png"/>
            <img src="/assets/cvimages/design2.png"/>
            <img src="/assets/cvimages/design3.png"/>
          </div>
        </ScrollElement>
        <ScrollElement className="messageSection" id="contact">
          <h3>We would love to hear from you.</h3>
          <p>Please contact us for customised designs, help on any area, or just drop a feedback. <br/>We will like to serve you better.</p>
          <FormFeedback />
        </ScrollElement>
      </div>
    );
  }
}

export default Home;
