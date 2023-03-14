import React from 'react'
import PropTypes from 'prop-types'
import Searcher from '../Searcher'
import ListBody from './ListBody'

const ListSearcher = props => {
  return (
    <ListBody className='ListSearcher'>
        <Searcher />
    </ListBody>
  )
}

ListSearcher.propTypes = {}

export default ListSearcher