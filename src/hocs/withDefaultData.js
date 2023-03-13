import React from "react";

export default (WrappedComponent, getDefaultProps) => {
  const hocComponent = ({ ...props }) => {
    const [defaultProps, setDefaultProps] = React.useState();

    React.useEffect(() => {
      if (typeof getDefaultProps === "function")
        setDefaultProps(getDefaultProps(props));
      else setDefaultProps(props);
    }, []);

    return defaultProps && <WrappedComponent {...defaultProps} />;
  };
  
  hocComponent.propTypes = WrappedComponent.propTypes;

  return hocComponent;
};
