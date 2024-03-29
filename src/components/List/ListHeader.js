import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CardBody, CardTitle, Spinner } from "reactstrap";
import SortBy from "../SortBy";
import ListOptions from "./ListOptions";
import Text from "../Text";
import Icon from "../Icon";
import ListContext from "@/contexts/list-context";
import Clickable from "../Clickable";
import CustomButton from "../CustomButton";

const ListHeader = (props) => {
  const listContext = useContext(ListContext);

  return (
    <CardBody className="List-header">
      <CardTitle tag="div" className="List-title">
        <Text className="mr-1">{props.title}</Text>
        {listContext.isLoading && (
          <Spinner color="primary" size="sm" className="mx-1">
            Loading...
          </Spinner>
        )}
      </CardTitle>
      <div className="List-headerOptions">
        {!!listContext.selectedItems?.length &&
          listContext.handleSaveSelected && (
            <CustomButton
              withoutCustom
              btnColor="success"
              btnSize="sm"
              onClick={listContext.handleSaveSelected}
              btnOutline
            >
              <Icon name="faSave" />{" "}
              <Text size="sm">Guardar los seleccionados</Text>
            </CustomButton>
          )}
        <SortBy
          onChange={({ target: { value } }) => listContext.handleSortBy(value)}
        />
        <ListOptions onCreate={props.onCreate} />
      </div>
    </CardBody>
  );
};

ListHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onCreate: PropTypes.func,
};

export default ListHeader;
