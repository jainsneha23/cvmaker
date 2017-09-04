import React from 'react';
import PropTypes from 'prop-types';
import {DatePicker, IconButton, TextField} from 'material-ui';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';

class DatePickerField extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      selectedDate: props.value && props.value != 'Present' && new Date(props.value),
      dateText: props.value == 'Present' ? 'Present' : props.value && new Date(props.value).toLocaleDateString('en-GB')
    };
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    this.handleDateInputChange = this.handleDateInputChange.bind(this);
    this.handleDateInputBlur = this.handleDateInputBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedDate: nextProps.value && nextProps.value != 'Present' && new Date(nextProps.value),
      dateText: nextProps.value == 'Present' ? 'Present' : nextProps.value && new Date(nextProps.value).toLocaleDateString('en-GB')
    });
  }

  handleChangeDatePicker(event, date) {
    this.setState({selectedDate: date, dateText: date.toLocaleDateString('en-GB')});
    this.props.onChange(date);
  }

  handleDateInputChange(event, value) {
    this.setState({dateText:value});
  }

  handleDateInputBlur(value) {
    if (!value) {
      this.setState({ selectedDate: undefined, dateText: undefined});
      this.props.onChange(undefined);
      return;
    }
    const splitDate = value.split('/');
    const parsedDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
    if (!isNaN(parsedDate)){
      this.setState({ selectedDate: parsedDate });
      this.props.onChange(parsedDate);
    } else {
      this.setState({ dateText: new Date(this.state.selectedDate).toLocaleDateString('en-GB')});
    }
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'baseline'}}>
        <TextField
          fullWidth={true}
          disabled={this.props.disabled}
          hintText="dd/mm/yyyy"
          errorText={this.props.errorText}
          errorStyle={{bottom: '-4px'}}
          floatingLabelText={this.props.label}
          value={this.state.dateText}
          onChange={this.handleDateInputChange}
          onBlur={(event) => this.handleDateInputBlur(event.currentTarget.value)}
        />
        <IconButton style={{opacity:'0.6'}} disabled={this.props.disabled} onClick={() => this.datePicker.focus()}>
          <ActionDateRange />
        </IconButton>
        <div style={{width:'0px', height:'0px'}}>
          <DatePicker
            id='dataPicker'
            floatingLabelText={''}
            value={this.state.selectedDate}
            errorText={''}
            autoOk={true}
            container='inline'
            fullWidth
            onChange={this.handleChangeDatePicker}
            ref={c => {
              this.datePicker = c;
            }}
            disabled={this.props.disabled}
          />
        </div>
      </div>
    );
  } 
}

DatePickerField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default DatePickerField;


