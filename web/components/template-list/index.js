import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import {Card, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';

import tilesData from '../../templates/list';

import './small.less';

class TemplateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: 1,
      dialog: false,
      dialogIdx: 0
    };
    this.handleColumns = this.handleColumns.bind(this);
    this.toggleMagnify = this.toggleMagnify.bind(this);
  }

  componentDidMount() {
    window.onresize = this.handleColumns;
  }

  handleColumns() {
    this.setState({cols: window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 3 : 5});
  }

  handleChange(value) {
    const templateid = value + 1;
    const templatecolor = tilesData[value].templateColor;
    this.props.changeTemplate(templateid, templatecolor);
  }

  toggleMagnify(value) {
    this.setState({dialog: !this.state.dialog, dialogIdx: value || 0});
  }

  render() {
    const primaryColor = this.props.muiTheme.palette.primary1Color;
    const pathMap = {
      '/': { nextAction: 'Create', nextPath: '/editor' },
      '/templates': { nextAction: 'Preview', nextPath: '/preview' }
    };

    const {nextAction, nextPath} = pathMap[window.location.pathname];
    return (
      <div className="template-list">
        {tilesData.map((tile, idx) => (
          <Card key={idx} className="card" >
            <CardMedia 
              overlayContentStyle={{padding: 0, background: 'linear-gradient(to top, #8c8a8a80 0%, #f5f5f5b3 90%, #fff 100%)'}}
              overlay={
                <div className='overlay' >
                  <IconButton iconStyle={{height: '28px', width: '28px'}} onTouchTap={() => this.toggleMagnify(idx)}>
                    <ZoomIn viewBox={'0 0 24 24'} color={primaryColor} />
                  </IconButton>
                  <IconButton iconStyle={{height: '28px', width: '28px'}} onTouchTap={() => this.handleChange(idx)}>
                    <CheckCircle viewBox={'0 0 24 24'} color={this.props.templateId - 1 === idx ? primaryColor : '#888'} />
                  </IconButton>
                </div>} >
              <img src={`${tile.img}-thumb.png`} />
            </CardMedia>
          </Card>
        ))}
        <Dialog
          title="Template preview"
          className="template-dialog"
          contentStyle={{width: '90%'}}
          actionsContainerStyle={{marginTop: 0}}
          titleClassName="title"
          actions={[<RaisedButton
            label="Close"
            primary={false}
            onTouchTap={() => this.toggleMagnify(0)}
          />, <RaisedButton
            label={`Select and ${nextAction}`}
            primary={true}
            onTouchTap={() => {
              this.toggleMagnify(0);
              this.handleChange(this.state.dialogIdx);
              nextPath && browserHistory.push(nextPath);
            }}
          />]}
          modal={false}
          open={this.state.dialog}
          onRequestClose={() => this.toggleMagnify(0)}
          autoScrollBodyContent={true} >
          <div style={{minHeight: window.innerHeight}}>
            <img src={`${tilesData[this.state.dialogIdx].img}.png`} className="dialog-img" />
          </div>
        </Dialog>
      </div>
    );
  }
}

TemplateList.propTypes = {
  user: PropTypes.object.isRequired,
  templateId: PropTypes.number.isRequired,
  changeTemplate: PropTypes.func.isRequired,
  muiTheme: PropTypes.object
};

TemplateList.defaultProps = {
  templateId: 0
};

export default TemplateList;

