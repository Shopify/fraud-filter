# Polaris Workshop

## Set Up


```jsx
// clone the workshop repo
git clone git@github.com:Shopify/fraud-filter.git

// switch to the new directory and check out the step-1 branch
cd fraud-filter 
git checkout step-1  

npm install // install dependencies

npm start // start up the app

```

Once you're ready, you can open up the code in your editor. You'll notice we've set up the structure of the app up for you, and have a simple GraphQL server with some dummy data available, since we won’t actually be embedding our work into the Shopify app!


## Step 1: Loading and empty states

Open up the file located at `src/routes/FilterList.js`.
Let's walk through how we've built out this page using the Polaris library so far.

### Current setup

Below the dependency imports, we've imported `Page`, along with several other Polaris components.

```jsx
import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Page, Card, TextContainer, Tabs} from '@shopify/polaris';
```

Futher down, you'll find a functional React component named `FilterList` that returns the page.

```jsx
function FilterList({data: {loading, reviews}}) {
  /* Content logic... */
  return <Page title="Add a title here">
    {/* Page content... */}
  </Page>;
}
```

When building a Shopify app with Polaris, every view should start with a [Page](https://polaris.shopify.com/components/structure/page) component. All of the view's content will then nest inside of the `Page`.

The `Page` component requires a `title` prop, which accepts a string to give the page a title.

So far, our page looks like this:
![Step 1-1](/public/images/step-1-1.png)


There are a number of optional props the `Page` component accepts, but all we need for this workshop is the `title`.

If you scroll to the bottom of the file you'll see we have a GraphQL query setup to fetch the list of filters.

This injects a `data` prop into our `FilterList` component that gives us an array of `filters` and a `loading` boolean that tells us whether or not we're still fetching the filters.

```jsx
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
```

### Loading state

Let's start with the loading state content. This is what is shown while the network request fetches the data through GraphQL.

The loading status is stored in a variabled that uses the `loading` key of the `data` prop to determine whether or not any content should be displayed.

The loading state content is wrapped with a `Card` component. `Card`s are used to group similar concepts and tasks together to make Shopify easier for merchants to scan, read, and get things done.

```jsx
const loadingStateContent = loading ? (
  <Card sectioned>
    <TextContainer>
      {/* Skeleton components... */}
    </TextContainer>
  </Card>
) : null;
```

Polaris comes with a set of skeleton content components that can be used to communicate to the merchant that data is currently being fetched. Let's go to the [style guide](https://polaris.shopify.com) take a look at those components.

- Use the search bar (top right) to find the `Skeleton` component
- Once you get to the component page, look at the different examples provided by selecting from the example menu at the top of the page
- Play with the component code in the playground and explore the props list
- Paste some content from the component playground into the text container of your loading state content
- Don't forget to import the `Skeleton` component!

```jsx
const loadingStateContent = loading ? (
  <Card sectioned>
    <TextContainer>
      <SkeletonDisplayText size="small" />
      <SkeletonBodyText />
      <SkeletonBodyText />
    </TextContainer>
  </Card>
) : null;
```

We can see what our loading state looks like by uncommenting the following lines of code:

```jsx
/* Comment or uncomment the next two lines to toggle the loading state */
loading = true;
filters = null;
```

![Step 1-2](/public/images/step-1-2.png)

### Empty state

Next, let's go over how to build out our page's empty state using the Polaris `EmptyState` component. This is what will be displayed when we aren't loading data but the merchant hasn't created any filters yet.

Just like the loading state, the content for our empty state is stored in a variable. We'll use the length of the `filters` array we receive from the server to decide whether or not to show the empty state.

We can see what the empty state of our page looks like by commenting/uncommenting the following lines:

```jsx
/* Comment or uncomment the next two lines to toggle the loading state */
// loading = true;
// filters = null;

/* Comment or uncomment the next line to toggle the empty state */
filters = [];
```

Use the styleguide to add the `EmptyState` component to your imports, and then to your `EmptyStateContent` variable.

```jsx
const emptyStateContent =
  filters && filters.length === 0
    ? {
        /* Add the empty state component and any necessary props here */
      }
    : null;
```

When running into errors with Polaris components, a good first step is to double check the style guide to make sure we haven't forgotten any required props.

Looking at the [empty state page of the style guide](https://polaris.shopify.com/components/structure/empty-state), you'll see an asterisk next the `action` prop. This means adding an `action` prop to the `EmptyState` component is **required**. This is because it is a best practice to give merchants a relevant, meaningful next step they can take after reaching an empty page.

Add `action` and `image` props to your `EmptyState` component. Usually, the `action` prop will link the merchant to a page that allows them to add their first filter. Since we aren't building this page, we can simply set the URL to "/".

```jsx
import emptyStateBackground from './../images/empty-state-bg.png';

<EmptyState
  heading="Add a layer of security to your store"
  action={{content: 'Add a filter', url: '/'}}
  image={emptyStateBackground}
>
  <p>Create custom filters to help you prevent fraud.</p>
</EmptyState>
```

You should see your empty state! If you change the viewport size, you'll see that the component is repsonsive by default.

![Step 1-3](/public/images/step-1-3.png)


## Step 2: Listing out filter content

The last variable in our file, `filtersIndex`, stores the content of the list of filters. The length of the array of filters we receive back form the server determines whether or not we render the list. Notice that our filters list content is wrapped in a `Card` component, same as our loading and empty states.

```jsx
const filtersIndex =
  filters && filters.length > 0 ? (
    <Card>{/* add a ResourceList of filters here... */}</Card>
  ) : null;
```

To build the list of reviews, we'll use the Polaris `ResourceList` component. `ResourceList` displays the key details of a collection of resources (filters, in this case) that allow a merchant to find, select, take bulk action on, or navigate to see more details about each resource.

Let's start building our index. Import the ResourceList component, and place an instance inside of the `Card` in the `filtersIndex` variable.

```jsx
const filtersIndex =
  filters && filters.length > 0 ? (
    <Card>
      <ResourceList />
    </Card>
  ) : null;
```

Since we don’t have any props, our page isn’t going to render–let's check out what we'll need over in the [Polaris style guide](https://polaris.shopify.com)! Search for "resource list" so we can explore what props to pass into to our component.

- The `showHeader` prop is an optional boolean that toggles whether or not a heading with a count of the list items is shown.
- The `resourceName` prop is also optional. It takes an object that specifies the singular and plural names of the resources so the component can use them when referencing the resources in places like the heading. If left blank, the resource list will just default to calling them items.
- The `items` prop is required as well and takes an array of objects. We pass the resource list our array of filter objects here.
- The `renderItem` prop is a callback function used by the resource list to map over and render the list of resources the `items` prop receives. Here is where we will instruct the component to render each filter.
- The `bulkActions` prop specifies actions you can take on the currently selected items. We'll be adding this to our `ResourceList`, but aren't building out any actual actions, we'll be importing `stubBulkActions` from our `stubData` file.

```jsx
const filtersIndex =
  filters && filters.length > 0 ? (
    <Card>
      <ResourceList
        showHeader
        resourceName={{singular: 'filter', plural: 'filters'}}
        items={filters}
        renderItem={(filter) => filter.id}
        bulkActions={stubBulkActions}
      />
    </Card>
  ) : null;
```

Finally, our reviews list view is complete...kind of! The only information being output is the `filter` id, which isn't helpul to the merchant. We'll probably want to render more informative content.

<!-- TODO ADD IMAGE HERE -->

## Step 3: Improving the resource list

Let's walk through how to make the filter information we're displaying in your `ResourceList` a bit more useable.

Since every type of resource is different and requires different information to be shown, Polaris allows you to customize the display of each item in the list by using `ResourceList.Item`, or creating your own custom subcomponent.

### Adding a custom component

We've already created a custom component called `FilterListItem` for you. Import it into the file and use it in place of the content currently inside the `ResourceList` `renderItem` prop, making sure to pass through the `filter` props using `...rest` syntax.

```jsx
<ResourceList
  showHeader
  resourceName={{singular: 'filter', plural: 'filters'}}
  items={filters}
  renderItem={(filter) => <FilterListItem {...filter} />}
  bulkActions={stubBulkActions}
/>
```

Let's switch over to `components/FilterListItem/FilterListIem.js`. We've set up this file so that the content from the `...filter` rest prop is already being used inside the `ResourceList.Item` subcomponent:

- `id`, uuid of the filter
- `title`, title of filter
- `date`, last time this filter flagged an order
- `flagCount`, number of orders this filter has flagged

```jsx
<ResourceList.Item id={id} url={`/filters/${id}`}>
  {title}
  {date}
  {ordersFlagged}
</ResourceList.Item>
```

Our filterList still doesn’t look much better, though:

<!-- TODO ADD IMAGE HERE -->

### Adding structure

First, let's wrap our props in some HTML and Polaris components: `TextStyle` and `Button`, and add some classes we can use to style the content.

```jsx
<ResourceList.Item id={id} url={`/filters/${id}`}>
  <div className="FilterListItem">
    <div className="FilterListItem__Content">
      <h3>
        <TextStyle variation="strong">{title}</TextStyle>
      </h3>
      <TextStyle variation="subdued">{date}</TextStyle>
    </div>
    <div className="FilterListItem__Action">
      <Button plain>{ordersFlagged}</Button>
    </div>
  </div>
</ResourceList.Item>
```

While we're at it, let's add a simple function that will help us output the right descriptor for our `ordersFlagged` prop.

```jsx
const ordersAffectedText =
  ordersFlagged !== 1
    ? `${ordersFlagged} orders affected`
    : `${ordersFlagged} order affected`;

...

<div className="FilterListItem__Action">
  <Button plain>{ordersAffectedText}</Button>
</div>
```

Looking better already!

<!-- TODO ADD IMAGE HERE -->

### Styling mobile first

In our `components/FilterListItem/FilterListIem.css` file, let's add some styles, making sure we keep mobile first principles in mind.

- The first breakpoint is no breakpoint
- Use progressive enhancement as screens get larger and browsers have more capability

```css
.FilterListItem {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.FilterListItem__Content {
  flex-basis: 100%;
}
```

We’re on our way, let’s use a `480px` `min-width` media query to add some styles so the content can take advantage of the extra space provided by larger screens!

```css
@media screen and (min-width: 480px) {
  .FilterListItem {
    flex-wrap: nowrap;
  }

  .FilterListItem__Content {
    flex-basis: auto;
  }
}
```

<!-- TODO ADD IMAGE -->

## Closing thoughts

And that's it. We now have a great start for our fraud filter app. Feel free to continue exploring the rest of the code, try out some new components, or even build some of your own.

### Additional resources

- [Partners Slack Group](https://ecommtalk.com/subscribe/)
- [Polaris Github repository](https://github.com/Shopify/polaris)
- [Webinar recording: Building great app interfaces with Polaris](https://www.youtube.com/watch?v=6hiGCw-dY9M)

Thank you!
