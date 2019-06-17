import React from 'react';
import {ResourceList} from '@shopify/polaris';

import './FilterListItem.css';

export default function FilterListItem(props) {
  const {id, title, date, ordersFlagged} = props;

  return (
    <ResourceList.Item id={id} url={`/filters/${id}`}>
      {title}
      {date}
      {ordersFlagged}
    </ResourceList.Item>
  );
}
