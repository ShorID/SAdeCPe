import React from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import CustomButton from "../CustomButton";
import Text from "../Text";
import fetcher from "@/services/fetcher";

const TrainingCard = (props) => {
  return (
    <Card>
      <img
        alt={props.name}
        src={props.nextSession?.center?.photo? fetcher.defaults.baseURL + props.nextSession.center.photo : "https://picsum.photos/300/200"}
        loading="lazy"
      />
      <CardBody>
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {props.creationDate}
        </CardSubtitle>
        <CardText>{props.description}</CardText>
        <span style={{ color: props.state.color, display: "block" }}>
          {props.state.name}
        </span>
        <span
          style={{
            color: props.priority.color,
            display: "block",
          }}
        >
          {props.priority.name}
        </span>
        <div>
          {Array.isArray(props.tags) &&
            props.tags.map((item, key) => (
              <Badge key={key} style={{ marginRight: "5px" }}>
                <Text size="sm">{item.tag.name}</Text>
              </Badge>
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

TrainingCard.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.string,
};

export default TrainingCard;
