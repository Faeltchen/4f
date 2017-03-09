import React from 'react';
import Page from '../pages/Page';
import AppContainer from '../containers/App';
import { title, meta, link, script } from './assets';

const App = props => (
  <Page title={title} meta={meta} link={link} script={script}>
    <AppContainer {...props} />
  </Page>
);

export default App;
