import React from "react";
import PropTypes from "prop-types";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import classNames from "classnames";
import Text from "../Text";
import useID from "@/hooks/useID";

const ScheduleBadge = (props) => {
  const [show, setShow] = React.useState(false);
  const spanRef = React.useRef(null);
  const handleShow = () => setShow((prev) => !prev);
  const [uniqId] = useID();

  return (
    <React.Fragment>
      <span
        ref={spanRef}
        id={uniqId}
        onMouseEnter={handleShow}
        onMouseLeave={handleShow}
        className={classNames("ScheduleBadge", props.completed && "completed")}
      ></span>
      {spanRef.current && (
        <Popover target={uniqId} placement="bottom" toggle={handleShow} isOpen={show}>
          <PopoverHeader>
            <Text>{props.title}</Text>
          </PopoverHeader>
          <PopoverBody>
            <Text>{props.description}</Text>
          </PopoverBody>
        </Popover>
      )}
    </React.Fragment>
  );
};

ScheduleBadge.propTypes = {
  title: PropTypes.string,
  descripcion: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.number,
  completed: PropTypes.bool,
};

export default ScheduleBadge;
