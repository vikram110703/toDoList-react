import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => {
  return (
    <ContentLoader
    // rtl
    speed={2}
    width={'100%'}
    height={'80%'}
    viewBox="0 0 800 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#d2d0d0"
    {...props}
  >
    <rect x="21" y="100" rx="0" ry="0" width="2" height="8" /> 
    <rect x="115" y="40" rx="11" ry="11" width="569" height="200" /> 
    <rect x="149" y="268" rx="0" ry="0" width="492" height="14" /> 
    <rect x="150" y="311" rx="0" ry="0" width="492" height="14" /> 
    <rect x="149" y="347" rx="0" ry="0" width="492" height="14" />
    </ContentLoader>
  )
};

export default Loader;

