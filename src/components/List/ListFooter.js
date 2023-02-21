import React from 'react'
import PropTypes from 'prop-types'
import { CardBody } from 'reactstrap'

const ListFooter = props => {
  return (
    <CardBody>{props.children}</CardBody>
  )
}

ListFooter.propTypes = {}

export default ListFooter