import React from 'react';
import {ResourceList, TextStyle, Button} from '@shopify/polaris';

import './FilterListItem.css';

export default function FilterListItem(props) {
  const {id, title, date, ordersFlagged} = props;

  const ordersAffectedText =
  ordersFlagged !== 1
    ? `${ordersFlagged} orders affected`
    : `${ordersFlagged} order affected`;

  return (
    <ResourceList.Item id={id} url={`/filters/${id}`}>
      <div className="FilterListItem">
        <div className="FilterListItem__Content">
          <h3>
            <TextStyle variation="strong">{title}</TextStyle>
          </h3>
          <TextStyle variation="subdued">{date}</TextStyle>
        </div>
        <div className="FilterListItem__Action">
          <Button plain>{ordersAffectedText}</Button>
        </div>
      </div>
    </ResourceList.Item>
  );
}
