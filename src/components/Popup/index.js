import React from "react";
import PropTypes from "prop-types";
import Clickable from "../Clickable";
import {
  Popover,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from "reactstrap";
import Text from "../Text";
import useID from "@/hooks/useID";

const Popup = (props) => {
  const elementRef = React.useRef(null);
  const [uniqId] = useID();
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow((prev) => !prev);

  return (
    <React.Fragment>
      <Clickable onClick={handleShow} ref={elementRef} id={uniqId}>
        {props.children}
      </Clickable>
      {elementRef.current && (
        <UncontrolledPopover
          target={uniqId}
          placement="bottom"
          trigger="legacy"
          toggle={handleShow}
          isOpen={show}
        >
          <PopoverHeader>
            <Text>{props.title}</Text>
          </PopoverHeader>
          <PopoverBody>
            <Text>{props.description}</Text>
          </PopoverBody>
        </UncontrolledPopover>
      )}
    </React.Fragment>
  );
};

Popup.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default Popup;
