import React from "react";
import { TrippyLogo, TrippyLogoProps } from "./TrippyLogo";

export type TravelCompassLogoProps = TrippyLogoProps;

/**
 * Re-exporting TrippyLogo under the legacy alias TravelCompassLogo for seamless compatibility.
 */
export const TravelCompassLogo: React.FC<TravelCompassLogoProps> = (props) => {
  return <TrippyLogo {...props} />;
};

export { TrippyLogo };
export default TrippyLogo;
