import React from 'react'
import PropTypes, { oneOfType } from 'prop-types'
import { LoremIpsum } from 'react-lorem-ipsum';
import classnames from 'classnames'

const Text = props => {
    const { TagName="span", className } = props;
  return (
    <TagName className={classnames('Text',className)}>{props.text || props.children || <LoremIpsum p={2} avgSentencesPerParagraph={1} />}</TagName>
  )
}

Text.propTypes = {
    TagName: oneOfType(["span","h1","h2","h3","h4","h5","p","pre","div"]),
    className: PropTypes.string,
    text: PropTypes.string

}

export default Text