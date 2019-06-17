import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Page, Card, TextContainer, Tabs} from '@shopify/polaris';
import {selected, tabs} from './../stubData';

function FilterList({data: {loading, filters}}) {
  /* Comment or uncomment the next two lines to toggle the loading state */
  loading = true;
  filters = null;

  /* Comment or uncomment the next line to toggle the empty state */
  // filters = [];

  const loadingStateContent = loading ? (
    <Card sectioned>
      <TextContainer>
        {/* Add the skeleton component and any necessary props here  */}
      </TextContainer>
    </Card>
  ) : null;

  const emptyStateContent =
  filters && filters.length === 0
    ? {
        /* Add the empty state component and any necessary props here */
    }
    : null;

  const filtersIndex =
    filters && filters.length > 0 ? (
      <Card>{/* add a ResourceList of filters here... */}</Card>
    ) : null;

  return (
    <Page title="Add a title here">
      <Tabs tabs={tabs} selected={selected}>
        <Card.Section>
          {emptyStateContent}
          {loadingStateContent}
          {filtersIndex}
        </Card.Section>
      </Tabs>
    </Page>
  );
}

export default graphql(gql`
  query FiltersQuery {
    filters {
      id
      title
      date
      ordersFlagged
    }
  }
`)(FilterList);
