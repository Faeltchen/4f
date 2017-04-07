import React from 'react';
import Page from '../pages/Page';
import ContentContainer from '../containers/Content';
import { title, meta, link, script } from './assets';

const Content = props => (
  <Page title={title} meta={meta} link={link} script={script}>
    <ContentContainer {...props} />
  </Page>
);

export default Content;
