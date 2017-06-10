import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import RichEditor from '../rich-editor';
import './small.less';

class FormJobItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.item;
    this.styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    this.maxDate.setHours(0, 0, 0, 0);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val, property) {
    const newState = this.state;
    newState[property].value = val;
    newState[property].error = val? '' : 'This field is required';
    if (property === 'company') newState.heading = val;
    this.setState(newState);
    this.props.onChange(newState);
  }

  render() {
    return (
      <div className="form-job-item" >
        <form>
          <TextField
            fullWidth={true}
            hintText="Eg. Software services"
            errorText={this.state.company.error}
            errorStyle={{bottom: '-4px'}}
            floatingLabelText="Enter the company name"
            value={this.state.company.value}
            onChange={(e) => this.handleChange(e.target.value, 'company')}
            onBlur={(e) => this.handleChange(e.target.value, 'company')}
          />
          <TextField
            fullWidth={true}
            hintText="Eg. Software Engineer"
            errorText={this.state.jobtitle.error}
            errorStyle={{bottom: '-4px'}}
            floatingLabelText="Enter your job title in this company"
            value={this.state.jobtitle.value}
            onChange={(e) => this.handleChange(e.target.value, 'jobtitle')}
            onBlur={(e) => this.handleChange(e.target.value, 'jobtitle')}
          />
          <TextField
            fullWidth={true}
            hintText="Eg. Bengaluru, India"
            errorText={this.state.location.error}
            errorStyle={{bottom: '-4px'}}
            floatingLabelText="Enter your job location for this company"
            value={this.state.location.value}
            onChange={(e) => this.handleChange(e.target.value, 'location')}
            onBlur={(e) => this.handleChange(e.target.value, 'location')}
          />
          <DatePicker
            hintText="30-01-2017"
            container="inline"
            autoOk={true}
            value={this.state.startdate.value || null}
            errorText={this.state.startdate.error}
            errorStyle={{bottom: '-4px'}}
            onChange={(e, date) => this.handleChange(date, 'startdate')}
            onBlur={(e, date) => this.handleChange(date, 'startdate')}
          />
          <DatePicker
            hintText="30-01-2017"
            container="inline"
            autoOk={true}
            value={this.state.enddate.value || null}
            errorText={this.state.enddate.error}
            errorStyle={{bottom: '-4px'}}
            onChange={(e, date) => this.handleChange(date, 'enddate')}
            onBlur={(e, date) => this.handleChange(date, 'enddate')}
            disabled={this.state.currentjob.value}
          />
          <Toggle
            label="I currently work here"
            labelPosition="right"
            toggled={this.state.currentjob.value}
            onToggle={(e, data) => this.handleChange(data, 'currentjob')}
          />
          <Subheader style={{paddingLeft: 0, fontWeight: 'bold'}}>Roles and Responsibilities</Subheader>
          <RichEditor
            editorState={this.state.responsibilities.value}
            placeholder="Enter your roles and responsibilities here..."
            onChange={(e) => this.handleChange(e, 'responsibilities')} />
        </form>
      </div>
    );
  }
}

FormJobItem.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  item: React.PropTypes.object.isRequired
};

export default FormJobItem;
