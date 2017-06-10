import React from 'react';
import InlineCss from 'react-inline-css';

let stylesheet;
if (typeof window == 'undefined') {
  const RequireText = require('require-text');
  stylesheet = RequireText('./small.less', require);
} else stylesheet = require('!raw-loader!./small.less');

const formatDate = (date) => {
  if(!date) return '';
  const d = new Date(date);
  const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d.getDate()}-${month[d.getMonth()]}-${d.getFullYear()}`;
};

const Design1 = (props) => (
  <InlineCss id="cv" componentName="Design1" stylesheet={stylesheet}>
    <div className="mainDetails">
      <div className="name goleft">
        <span>{props.data.personal.fullname.value}</span>
        <span>{props.data.personal.jobtitle.value}</span>
        <ul>
          <li><span>{props.data.personal.email.value}</span></li>|
          <li><span>{props.data.personal.mobile.value}</span></li>|
          <li><span>{props.data.personal.experience.value}</span></li>
        </ul>
      </div>
    </div>
    <div className="mainArea">
      <section className="portfolioInfo">
        <article>
          <ul>
            <li>
              <div className="sectionTitle">
                <span>Summary</span>
              </div>
              <div className="sectionContent">
                <div className="default" dangerouslySetInnerHTML={{__html: props.data.profile.summary}}></div>
              </div>
            </li>
            <li>
              <div className="sectionTitle">
                <span>Objectives</span>
              </div>
              <div className="sectionContent">
                <div className="default" dangerouslySetInnerHTML={{__html: props.data.profile.objectives}}></div>
              </div>
            </li>
          </ul>
        </article>
      </section>
      <section className="skillInfo">
        <div className="sectionTitle">
          <span>Key Skills</span>
        </div>
        <article className="sectionContent">
          <ul>{props.data.skills.map((item,i) =>
            <li key={i}>
            <span>{item.skillCategory.value}</span>
            <ul>
              {item.skills.map((skill,j) => 
                <li key={j}>
                  <label>{skill}</label>
                </li>
              )}
            </ul>
            </li>)}
          </ul>
        </article>
      </section>
      <section className="workInfo">
        <div className="sectionTitle">
          <span>Work Experience</span>
        </div>
        <article className="sectionContent">
          <ul className="explist">
          {props.data.job.map((item, i) =>
            <li key={i}>
              <div>
                <span>{item.jobtitle.value}</span>
                <span>at</span>
                <span>{item.company.value}</span>
              </div>
              <div className="subDetails">
                <span>{formatDate(item.startdate.value)}</span>
                <span>to</span>
                <span>{formatDate(item.enddate.value)}</span>
              </div>
              <label>Skills Used</label>
              <ul>
                {item.skills && item.skills.map((skill, i) =>
                  <li key={i}>
                    <span>{skill}</span>
                  </li>
                )}
              </ul>
              <label>Role and Responsibilities</label>
              <div className="default" dangerouslySetInnerHTML={{__html: item.responsibilities.value}}></div>
            </li>
          )}
          </ul>
        </article>
      </section>
      <section className="educationInfo">
        <div className="sectionTitle">
          <span>Education</span>
        </div>
        
        <article className=" sectionContent">
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
                  <label>Grade</label>
                  <span>{item.grade.value}</span>
                </div>
                <div className="details">
                  <span>From</span>
                  <span>{item.school.value}</span>
                  <span>at</span>
                  <span>{item.location.value}</span>
                </div>
                <label>Description</label>
                <div className="default" dangerouslySetInnerHTML={{__html: item.description.value}}></div>
              </li>
            )}
          </ul>
        </article>
      </section>
      <section className="othersInfo">
        <article>
          <ul>
          {props.data.others.map((item, i) =>
            <li key={i}>
              <div className="sectionTitle">
                <span>{item.label.value}</span>
              </div>
              <div className="sectionContent">
                <div className="default" dangerouslySetInnerHTML={{__html: item.description.value}}></div>
              </div>
            </li>
          )}
          </ul>
        </article>
      </section>
    </div>
  </InlineCss>
);

Design1.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default Design1;
