import React from 'react';
import Page from '../pages/Page';
import AboutContainer from '../containers/About';
import { title, meta, link, script } from './assets';

const About = props => (
  <Page title={title} meta={meta} link={link} script={script}>
    <AboutContainer {...props} />
  </Page>
);

export default About;
