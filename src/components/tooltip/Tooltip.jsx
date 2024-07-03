import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const Tooltip = ({tooltipContent, tooltipId, tooltipPlace}) => {

  return (
        <ReactTooltip
            id={tooltipId}
            place={tooltipPlace}
            content={tooltipContent}
        />
  );
};
