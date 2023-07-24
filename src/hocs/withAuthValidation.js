import { AuthContext } from "@/contexts/auth-context";
// import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";

function withAuthValidation(WrappedComponent) {
  const HocComponent = (props) => {
    const listContext = useContext(AuthContext);
    // const router = useRouter();

    React.useEffect(() => {
      if (!listContext.isAuth) {
        // router.push("/login");
      }
    }, [listContext.isAuth]);

    return <WrappedComponent {...props} />;
  };

  HocComponent.propTypes = WrappedComponent.propTypes;
  HocComponent.getInitialProps = WrappedComponent.getInitialProps;

  return HocComponent;
}

export default withAuthValidation;
