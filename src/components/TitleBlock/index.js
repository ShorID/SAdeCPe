import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import classNames from 'classnames'

const TitleBlock = props => {
  return (
    <div className={classNames("TitleBlock",props.className)}>
        <div className='TitleBlock-title'>{props.title}</div>
        {props.button && <Link to={props.buttonLink}>{props.button}</Link>}
    </div>
  )
}

TitleBlock.propTypes = {
    title: PropTypes.string,
    buttonLink: PropTypes.string,
    button: PropTypes.string,
    className: PropTypes.string,
}

export default TitleBlock