import React, { Component, PropTypes } from 'react'
import ScrollView from '../ScrollView'

export default class ListView extends Component {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.style
  };

  static defaultProps = {
    style: {}
  };

  render() {
    return (
      <ScrollView {...this.props} />
    )
  }
}
