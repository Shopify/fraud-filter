import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {AppProvider} from '@shopify/polaris';

import FilterList from './routes/FilterList';

import '@shopify/polaris/styles.css';

const client = new ApolloClient();

const CustomLinkComponent = ({children, url, ...rest}) => {
  return (
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
};

function App() {
  return (
    <AppProvider linkComponent={CustomLinkComponent}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={FilterList} />
          </Switch>
        </Router>
      </ApolloProvider>
    </AppProvider>
  );
}

export default App;
