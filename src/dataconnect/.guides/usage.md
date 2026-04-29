# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useListItems, useGetItem, useListMyItems, useListIncomingRequests, useListOutgoingRequests, useListMyReviews, useGetCurrentUser, useFindUserByDisplayName, useListReviews, useUpsertUser } from '@local-lender/dataconnect/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useListItems();

const { data, isPending, isSuccess, isError, error } = useGetItem(getItemVars);

const { data, isPending, isSuccess, isError, error } = useListMyItems();

const { data, isPending, isSuccess, isError, error } = useListIncomingRequests();

const { data, isPending, isSuccess, isError, error } = useListOutgoingRequests();

const { data, isPending, isSuccess, isError, error } = useListMyReviews();

const { data, isPending, isSuccess, isError, error } = useGetCurrentUser();

const { data, isPending, isSuccess, isError, error } = useFindUserByDisplayName(findUserByDisplayNameVars);

const { data, isPending, isSuccess, isError, error } = useListReviews();

const { data, isPending, isSuccess, isError, error } = useUpsertUser(upsertUserVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listItems, getItem, listMyItems, listIncomingRequests, listOutgoingRequests, listMyReviews, getCurrentUser, findUserByDisplayName, listReviews, upsertUser } from '@local-lender/dataconnect';


// Operation ListItems: 
const { data } = await ListItems(dataConnect);

// Operation GetItem:  For variables, look at type GetItemVars in ../index.d.ts
const { data } = await GetItem(dataConnect, getItemVars);

// Operation ListMyItems: 
const { data } = await ListMyItems(dataConnect);

// Operation ListIncomingRequests: 
const { data } = await ListIncomingRequests(dataConnect);

// Operation ListOutgoingRequests: 
const { data } = await ListOutgoingRequests(dataConnect);

// Operation ListMyReviews: 
const { data } = await ListMyReviews(dataConnect);

// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation FindUserByDisplayName:  For variables, look at type FindUserByDisplayNameVars in ../index.d.ts
const { data } = await FindUserByDisplayName(dataConnect, findUserByDisplayNameVars);

// Operation ListReviews: 
const { data } = await ListReviews(dataConnect);

// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);


```