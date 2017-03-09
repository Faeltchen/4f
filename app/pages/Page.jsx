import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const Page = ({ title, link, meta, script, children }) => {
  return (
    <div>
      <Helmet title={title} link={link} meta={meta}  script={script}/>
      { children }
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  link: PropTypes.array,
  script: PropTypes.array,
  meta: PropTypes.array
};

export default Page;
