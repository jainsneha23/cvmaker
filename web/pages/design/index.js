import React from 'react';
import { browserHistory } from 'react-router';

import {Card, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';

import Header from '../../components/header';

import './small.less';

const tilesData = [
  {img: '/assets/cvimages/design1', designColor: '#40a7ba'},
  {img: '/assets/cvimages/design2', designColor: '#fdb120'},
  {img: '/assets/cvimages/design3', designColor: '#40a7ba'}
];


class Design extends React.Component {
  constructor(props) {
    super(props);
    const designId = (typeof localStorage !== 'undefined' && (+localStorage.getItem('designId') - 1)) || 0;
    this.state = {
      designId,
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
    this.setState({designId: value});
  }

  toggleMagnify(e, value) {
    this.setState({dialog: !this.state.dialog, dialogIdx: value || 0});
  }

  preview() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('designId', this.state.designId+1);
      localStorage.setItem('designColor', tilesData[this.state.designId].designColor);
      browserHistory.push('/preview');
    }
    else browserHistory.push(`/preview?designId=${this.state.designId+1}`);
  }

  render() {
    return (
      <div className="designs">
        <Header rightElem={<RaisedButton
          label={'Preview'}
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
                    <CheckCircle color={this.state.designId === idx ? '#ff4081' : '#ccc'} />
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

export default Design;
