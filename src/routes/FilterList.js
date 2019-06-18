import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Page, Card, TextContainer, Tabs, SkeletonBodyText, SkeletonDisplayText, EmptyState} from '@shopify/polaris';

import emptyStateBackground from './../images/empty-state-bg.png';
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
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText />
        <SkeletonBodyText />
      </TextContainer>
    </Card>
  ) : null;

  const emptyStateContent =
  filters && filters.length === 0
    ? (
      <EmptyState
        heading="Add a layer of security to your store"
        action={{content: 'Add a filter', url: '/'}}
        image={emptyStateBackground}
      >
        <p>Create custom filters to help you prevent fraud.</p>
      </EmptyState>
    )
    : null;

  const filtersIndex =
    filters && filters.length > 0 ? (
      <Card>{/* add a ResourceList of filters here... */}</Card>
    ) : null;

  return (
    <Page title="Fraud Filter">
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
