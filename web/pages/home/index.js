import React from 'react';
import ReactDOM from 'react-dom';
import ScrollAnim from 'rc-scroll-anim';
import { Link } from 'react-router';
import Logo from '../../components/logo';
import FormFeedback from '../../components/form-feedback';
import './small.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: (window && window.location.hash.substr(1)) || 'top'
    };
    this.setActiveNav = this.setActiveNav.bind(this);
    this.handlePageScroll = this.handlePageScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handlePageScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handlePageScroll);
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
              <img src="/images/background.png"/>
              <p>Then why not take one for you ??</p>
            </section>
            <section>
              <header>Impress with your resume</header>
              <p>Your CV is the first point of contact with the recruiter. Stand out and get a interview call faster</p>
              <Link to='/create'>Start Now</Link>
            </section>
          </article>
        </ScrollElement>
        <article className="highlights maxwidth">
          <section>
            <img src="/images/design.png"/>
            <header>we Have</header>
            <p>Existing professional resume templates to suit any profession. Perfect for entry level, senior, creative, intern and graduate positions.
            </p>
          </section>
          <section>
            <img src="/images/choose.png"/>
            <header>we Offer</header>
            <p>
              Proffesional templates, along with on demand resume services. Just drop us a email, through our feedback form.
            </p>
          </section>
          <section>
            <img src="/images/edit.png"/>
            <header>we are Different</header>
            <p>
              No signup required. We provide easy forms to prepare your resume. Then it can be easily downloaded as a pdf.
            </p>
          </section>
        </article>
        <ScrollElement className="templates" id="designs">
          <header>Our templates</header>
          <div className="maxwidth">
            <img src="cvimages/image1.jpg"/>
            <img src="cvimages/image2.jpg"/>
            <img src="cvimages/image3.jpg"/>
            <img src="cvimages/image4.jpg"/>
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