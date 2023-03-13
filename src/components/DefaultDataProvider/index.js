import React from "react";
import PropTypes from "prop-types";

const DefaultDataProvider = ({ getDefaultProps, children }) => {
  const [defaultProps, setDefaultProps] = React.useState();

  React.useEffect(() => {
    if (typeof getDefaultProps === "function")
      setDefaultProps(getDefaultProps());
  }, []);

  return (
    <>
      {typeof defaultProps == "object" &&
        typeof children === "function" &&
        children(defaultProps)}
    </>
  );
};

DefaultDataProvider.propTypes = {
  getDefaultProps: PropTypes.func.isRequired,
  children: PropTypes.func,
};

export default DefaultDataProvider;
