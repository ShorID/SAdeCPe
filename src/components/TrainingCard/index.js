import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import CustomButton from "../CustomButton";

const TrainingCard = (props) => {
  return (
    <Card>
      <img
        alt={props.title}
        src={props.img || "https://picsum.photos/300/200"}
        loading="lazy"
      />
      <CardBody>
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {props.subTitle}
        </CardSubtitle>
        <CardText>{props.text}</CardText>
        <CustomButton>Inscribirse</CustomButton>
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
