import React from "react";
import PropTypes from "prop-types";
import Layout from "@/components/Layout";
import Text from "@/components/Text";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/Icon";

const CL = (props) => {
  return (
    <Layout>
      <Text TagName="h2">Icons</Text>
      <div className="row">
        {SolidIcons &&
          Object.keys(SolidIcons).map((item) => (
            <Text className="col-2 mb-4 text-center">
              <Icon name={item} className="d-block mx-auto" />
              {item}
            </Text>
          ))}
      </div>
    </Layout>
  );
};

CL.propTypes = {};

export default CL;
