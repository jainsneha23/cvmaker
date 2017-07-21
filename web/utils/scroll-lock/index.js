import React from 'react';

class ScrollLock extends React.Component {

  constructor(props) {
    super(props);
    this.setScrollingElement = this.setScrollingElement.bind(this);
    this.onScrollStart = this.onScrollStart.bind(this);
    this.onScrollHandler = this.onScrollHandler.bind(this);
  }

  componentDidMount() {
    this.scrollingElement.addEventListener('wheel', this.onScrollHandler, false);
    this.scrollingElement.addEventListener('scroll', this.onScrollHandler, false);
    this.scrollingElement.addEventListener('touchstart', this.onScrollStart);
    this.scrollingElement.addEventListener('touchmove', this.onScrollHandler);
  }

  componentWillUnmount() {
    this.scrollingElement.removeEventListener('wheel', this.onScrollHandler, false);
    this.scrollingElement.removeEventListener('scroll', this.onScrollHandler, false);
    this.scrollingElement.removeEventListener('touchstart', this.onScrollStart);
    this.scrollingElement.removeEventListener('touchmove', this.onScrollHandler);
  }

  onScrollStart(e) {
    this.startYpos = e.touches && e.touches[0] && e.touches[0].clientY;
  }

  onScrollHandler(e) {
    const elem = this.scrollingElement;
    const { scrollTop, scrollHeight, clientHeight } = elem;
    const wheelDelta = e.type === 'touchmove' ? this.mobileDeltaY(e) : e.deltaY;
    const isDeltaPositive = wheelDelta > 0;

    if (isDeltaPositive && wheelDelta > scrollHeight - clientHeight - scrollTop) {
      elem.scrollTop = scrollHeight;
      this.cancelScrollEvent(e);
    } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      elem.scrollTop = 0;
      this.cancelScrollEvent(e);
    }
  }

  setScrollingElement(r) {
    this.scrollingElement = r ? r.firstChild : r;
  }

  mobileDeltaY(e) {
    const currYpos = (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientY) ||
                      (e.touches && e.touches[0] && e.touches[0].clientY);
    return this.startYpos - currYpos;
  }

  cancelScrollEvent(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    e.returnValue = false;
    return false;
  }

  render() {
    return (
      <div ref={this.setScrollingElement}>
        {this.props.children}
      </div>
    );
  }
}

ScrollLock.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default ScrollLock;
