import React from 'react'
import PropTypes from 'prop-types'

const TextSection = props => {
  return (
    <div className='TextSection'>
        <div className='TextSection-title'>{props.title}</div>
        <div className='TextSection-description'>{props.description || props.children}</div>
    </div>
  )
}

TextSection.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export default TextSection