import React from 'react';
import InlineCss from 'react-inline-css';

let stylesheet;
if (typeof window == 'undefined') {
  const path = require('path');
  var src = path.join(__dirname + '/small.less');
  const lessToCss = require('../../utils/less-to-css').default;
  stylesheet = lessToCss(src);
} else {
  stylesheet = require('!css-loader!less-loader!./small.less');
  stylesheet = stylesheet.toString();
}

const formatDate = (date) => {
  if(!date) return '';
  const d = new Date(date);
  const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d.getDate()}-${month[d.getMonth()]}-${d.getFullYear()}`;
};

const Design2 = (props) => (
  <InlineCss id="cv" componentName="design-2" stylesheet={stylesheet}>
    <div className="Design2">
      <div className="mainDetails">
        <div className="name">
          <span>{props.data.personal.fullname.value}</span>
          <span>{props.data.personal.jobtitle.value}</span>
          <ul>
            <li>email: <span>{props.data.personal.email.value}</span></li>
            <li>phone: <span>{props.data.personal.mobile.value}</span></li>
          </ul>
        </div>
      </div>
      <div className="mainArea">
        <section className="portfolioInfo">
          <ul>
            <li>
              <h3 className="sectionTitle">Summary</h3>
              <div className="sectionContent">
                <div className="default" dangerouslySetInnerHTML={{__html: props.data.profile.summary}}></div>
              </div>
            </li>
            <li>
              <h3 className="sectionTitle">Objectives</h3>
              <div className="sectionContent">
                <div className="default" dangerouslySetInnerHTML={{__html: props.data.profile.objectives}}></div>
              </div>
            </li>
          </ul>
        </section>
        <section className="skillInfo">
          <h3 className="sectionTitle">Key Skills</h3>
          <div className="sectionContent">
            <ul>{props.data.skills.map((item,i) =>
              <li key={i}>
              <h4>{item.skillCategory.value}</h4>
              <ul>
                {item.skills.map((skill,j) => 
                  <li key={j}>
                    <span>{skill},</span>
                  </li>
                )}
              </ul>
              </li>)}
            </ul>
          </div>
        </section>
        <section className="workInfo">
          <h3 className="sectionTitle">Work Experience</h3>
          <div className="sectionContent">
            <ul>
            {props.data.job.map((item, i) =>
              <li key={i}>
                <div className="header">
                  <span>{item.jobtitle.value}</span>
                  <span>at</span>
                  <span>{item.company.value}</span>
                </div>
                <div className="subDetails">
                  <span>{formatDate(item.startdate.value)}</span>
                  <span>to</span>
                  <span>{formatDate(item.enddate.value) || 'Present'}</span>
                </div>
                <h5>Role and Responsibilities</h5>
                <div className="default" dangerouslySetInnerHTML={{__html: item.responsibilities.value}}></div>
              </li>
            )}
            </ul>
          </div>
        </section>
        <section className="educationInfo">
          <h3 className="sectionTitle">Education</h3>
          <div className="sectionContent">
            <ul>
              {props.data.education.map((item, i) =>
                <li key={i}>
                  <div className="header">
                    <div>{item.degree.value}</div>
                  </div>
                  <div className="subDetails">
                    <span>{formatDate(item.startdate.value)}</span>
                    <span>to</span>
                    <span>{formatDate(item.enddate.value)}</span>
                  </div>
                  <div className="details">
                    <span>From</span>
                    <span>{item.school.value}</span>
                    <span>at</span>
                    <span>{item.location.value}</span>
                  </div>
                  <div className="details">
                    <h5>Grade:</h5>
                    <span>{item.grade.value}</span>
                  </div>
                  <div className="details">
                    {item.description.value && <h5>Description</h5>}
                    <div className="default" dangerouslySetInnerHTML={{__html: item.description.value}}></div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </section>
        <section className="othersInfo">
          <ul>
          {props.data.others.map((item, i) =>
            <li key={i}>
              <h3 className="sectionTitle">{item.label.value}</h3>
              <div className="sectionContent">
                <div className="default" dangerouslySetInnerHTML={{__html: item.description.value}}></div>
              </div>
            </li>
          )}
          </ul>
        </section>
      </div>
    </div>
  </InlineCss>
);

Design2.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default Design2;
