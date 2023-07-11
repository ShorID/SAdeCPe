import { AuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";

function withAuthValidation(WrappedComponent) {
  const hocComponent = (props) => {
    const listContext = useContext(AuthContext);
    const router = useRouter();

    React.useEffect(() => {
      if (!listContext.isAuth) {
        // router.push("/login");
      }
    }, [listContext.isAuth]);

    return <WrappedComponent {...props} />;
  };

  hocComponent.propTypes = WrappedComponent.propTypes;
  hocComponent.getInitialProps = WrappedComponent.getInitialProps;

  return hocComponent;
}

export default withAuthValidation;
