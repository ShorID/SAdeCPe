import React from 'react'
import PropTypes from 'prop-types'
import { CardBody } from 'reactstrap'

const ListFooter = props => {
  return (
    <CardBody className='pb-0'>{props.children}</CardBody>
  )
}

ListFooter.propTypes = {}

export default ListFooter