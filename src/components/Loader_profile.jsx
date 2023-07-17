import React from "react";
import ContentLoader from "react-content-loader";

const Loader_profile = (props) => {
  return (
    <ContentLoader
      rtl
      speed={2}
      width={'35%'}
      height={'40%'}
      viewBox="0 0 500 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#d4d3d3"
      {...props}
    >
      <circle cx="590" cy="244" r="36" />
      <rect x="21" y="100" rx="0" ry="0" width="2" height="8" />
      <circle cx="425" cy="80" r="53" />
      <rect x="237" y="163" rx="0" ry="0" width="248" height="27" />
      <rect x="234" y="206" rx="0" ry="0" width="249" height="8" />
    </ContentLoader>
  )
};

export default Loader_profile;

