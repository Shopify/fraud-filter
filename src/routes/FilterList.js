import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Page, Card, TextContainer, Tabs, SkeletonBodyText, SkeletonDisplayText, EmptyState, ResourceList} from '@shopify/polaris';
import FilterListItem from '../components/FilterListItem/index';

import emptyStateBackground from './../images/empty-state-bg.png';
import {selected, tabs, bulkActions} from './../stubData';

function FilterList({data: {loading, filters}}) {
  /* Comment or uncomment the next two lines to toggle the loading state */
  // loading = true;
  // filters = null;

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
      <ResourceList
        showHeader
        resourceName={{singular: 'filter', plural: 'filters'}}
        items={filters}
        renderItem={(filter) => <FilterListItem {...filter} />}
        bulkActions={bulkActions}
      />
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
