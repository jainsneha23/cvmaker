import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {Card, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';

import {ResumeService} from '../../api';
import PageHeaderContainer from '../../containers/page-header';
import * as ACTIONS from '../../actions';

import './small.less';

const tilesData = [
  {img: '/assets/cvimages/design1', designColor: '#40a7ba'},
  {img: '/assets/cvimages/design2', designColor: '#fdb120'},
  {img: '/assets/cvimages/design3', designColor: '#40a7ba'}
];


class Design extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: 1,
      dialog: false,
      dialogIdx: 0
    };
    this.handleColumns = this.handleColumns.bind(this);
    this.toggleMagnify = this.toggleMagnify.bind(this);
    this.preview = this.preview.bind(this);
  }

  componentDidMount() {
    window.onresize = this.handleColumns;
  }

  handleColumns() {
    this.setState({cols: window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 3 : 5});
  }

  handleChange(e, value) {
    const designid = value + 1;
    const designcolor = tilesData[value].designColor;
    this.props.changeDesign(designid, designcolor);
  }

  toggleMagnify(e, value) {
    this.setState({dialog: !this.state.dialog, dialogIdx: value || 0});
  }

  preview() {
    const designid = this.props.id;
    const designcolor = tilesData[this.props.id - 1].designColor;
    ResumeService.updateDesign(this.props.user, 1, designid, designcolor)
      .then(() => browserHistory.push('/preview'))
      .catch(() => alert('Some error occured. Please try again'));
  }

  render() {
    return (
      <div className="designs">
        <PageHeaderContainer rightElem={<RaisedButton
          label={'预览'}
          secondary={true}
          onClick={this.preview} /> }/>
        {tilesData.map((tile, idx) => (
          <Card key={idx} className="card" >
            <CardMedia
              overlayContentStyle={{padding: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'}}
              overlay={
                <div className='overlay' >
                  <IconButton onTouchTap={(e) => this.toggleMagnify(e, idx)}>
                    <ZoomIn color="#fff" />
                  </IconButton>
                  <IconButton onTouchTap={(e) => this.handleChange(e, idx)}>
                    <CheckCircle color={this.props.id - 1 === idx ? '#ff4081' : '#ccc'} />
                  </IconButton>
                </div>} >
              <img src={`${tile.img}-thumb.png`} />
            </CardMedia>
          </Card>
        ))}
        <Dialog
          title="Design preview"
          className="design-dialog"
          contentStyle={{width: '90%'}}
          actionsContainerStyle={{marginTop: 0}}
          titleClassName="title"
          actions={[<RaisedButton
            label="Done"
            primary={true}
            onTouchTap={this.toggleMagnify}
          />]}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.toggleMagnify}
          autoScrollBodyContent={true} >
          <div style={{minHeight: window.innerHeight}}>
            <img src={`${tilesData[this.state.dialogIdx].img}.png`} className="dialog-img" />
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.design.id,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  changeDesign: (designid, designcolor) => dispatch(ACTIONS.changeDesign(designid, designcolor)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Design);

Design.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  changeDesign: PropTypes.func.isRequired
};

Design.defaultProps = {
  id: 0
};
