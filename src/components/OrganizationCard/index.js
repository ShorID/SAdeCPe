import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import CustomButton from "../CustomButton";
import Image from "next/image";

const OrganizationCard = (props) => {
  return (
    <Card className="OrganizationCard">
      <div className="OrganizationCard-imgWrapper">
        <Image
          alt={props.title}
          src={
            props.photo
              ? `${process.env.NEXT_PUBLIC_API_URL}${props.photo}`
              : "https://picsum.photos/300/200"
          }
          loading="lazy"
          className="OrganizationCard-img"
        />
      </div>
      <CardBody>
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {props.creationDate}
        </CardSubtitle>
        <CardText>{props.description}</CardText>
        {props.button && <CustomButton>Inscribirse</CustomButton>}
      </CardBody>
    </Card>
  );
};

OrganizationCard.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.string,
};

export default OrganizationCard;
