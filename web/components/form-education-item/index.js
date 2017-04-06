import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import RichEditor from '../rich-editor';
import './small.less';

class FormEducationItem extends React.Component {
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
    this.setState(newState);
    this.props.onChange(newState);
  }

  render() {
    return (
      <div className="form-job-item" >
        <form>
          <TextField
            fullWidth={true}
            hintText="Eg. Delhi University"
            errorText={this.state.school.error}
            floatingLabelText="Enter the school name"
            value={this.state.school.value}
            onChange={(e) => this.handleChange(e.target.value, 'school')}
            onBlur={(e) => this.handleChange(e.target.value, 'school')}
          />
          <TextField
            fullWidth={true}
            hintText="Eg. BTech"
            errorText={this.state.degree.error}
            floatingLabelText="Enter your degree obtained in this school"
            value={this.state.degree.value}
            onChange={(e) => this.handleChange(e.target.value, 'degree')}
            onBlur={(e) => this.handleChange(e.target.value, 'degree')}
          />
          <TextField
            fullWidth={true}
            hintText="Eg. Bengaluru, India"
            errorText={this.state.location.error}
            floatingLabelText="Enter the location of this school"
            value={this.state.location.value}
            onChange={(e) => this.handleChange(e.target.value, 'location')}
            onBlur={(e) => this.handleChange(e.target.value, 'location')}
          />
          <TextField
            fullWidth={true}
            hintText="Eg. Computer Science"
            errorText={this.state.field.error}
            floatingLabelText="Enter your field of study"
            value={this.state.field.value}
            onChange={(e) => this.handleChange(e.target.value, 'field')}
            onBlur={(e) => this.handleChange(e.target.value, 'field')}
          />
          <TextField
            fullWidth={true}
            hintText="Eg. 9.2"
            errorText={this.state.grade.error}
            floatingLabelText="Enter your grade achieved"
            value={this.state.grade.value}
            onChange={(e) => this.handleChange(e.target.value, 'grade')}
            onBlur={(e) => this.handleChange(e.target.value, 'grade')}
          />
          <Subheader label="Start Date" />
          <DatePicker
            hintText="30-01-2017"
            container="inline"
            autoOk={true}
            value={this.state.startdate.value}
            errorText={this.state.startdate.error}
            onChange={(e, date) => this.handleChange(date, 'startdate')}
            onBlur={(e, date) => this.handleChange(date, 'startdate')}
          />
          <Subheader label="End Date" />
          <DatePicker
            hintText="30-01-2017"
            container="inline"
            autoOk={true}
            value={this.state.enddate.value}
            errorText={this.state.enddate.error}
            onChange={(e, date) => this.handleChange(date, 'enddate')}
            onBlur={(e, date) => this.handleChange(date, 'enddate')}
          />
          <RichEditor
            editorState={this.state.description.value}
            placeholder="Enter other information here..."
            onChange={(e) => this.handleChange(e, 'description')} />
        </form>
      </div>
    );
  }
}

FormEducationItem.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  item: React.PropTypes.object.isRequired
};

export default FormEducationItem;
