export const tabs = [
  {
    id: 'filters',
    content: 'Filters',
    panelID: 'filters-content',
  },
  {
    id: 'add-filter',
    content: 'Add Filter',
    panelID: 'add-filter-content',
  },
];

export const bulkActions = [
  {
    content: 'Remove filters',
    onAction: () => console.log('Remove filter'),
  },
  {
    content: 'Cancel orders',
    onAction: () => console.log('Todo: implement bulk delete'),
  },
];

export const selected = 0;
