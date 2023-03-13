import React from "react";

const regex = /[^a-zA-Z0-9]/g;

export default function useID(options = { prefix: "" }) {
  const { prefix = "" } = options;
  const vanillaId = React.useId();

  return [(prefix + vanillaId).replace(regex, ""), prefix + vanillaId];
}
