# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useUpsertUser, useCreateItem, useUpdateItem, useUpdateItemStatus, useDeleteItem, useCreateLendingRequest, useUpdateLendingRequestStatus, useCreateReview, useListItems, useGetItem } from '@local-lender/dataconnect/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useUpsertUser(upsertUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateItem(createItemVars);

const { data, isPending, isSuccess, isError, error } = useUpdateItem(updateItemVars);

const { data, isPending, isSuccess, isError, error } = useUpdateItemStatus(updateItemStatusVars);

const { data, isPending, isSuccess, isError, error } = useDeleteItem(deleteItemVars);

const { data, isPending, isSuccess, isError, error } = useCreateLendingRequest(createLendingRequestVars);

const { data, isPending, isSuccess, isError, error } = useUpdateLendingRequestStatus(updateLendingRequestStatusVars);

const { data, isPending, isSuccess, isError, error } = useCreateReview(createReviewVars);

const { data, isPending, isSuccess, isError, error } = useListItems();

const { data, isPending, isSuccess, isError, error } = useGetItem(getItemVars);

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
import { upsertUser, createItem, updateItem, updateItemStatus, deleteItem, createLendingRequest, updateLendingRequestStatus, createReview, listItems, getItem } from '@local-lender/dataconnect';


// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation CreateItem:  For variables, look at type CreateItemVars in ../index.d.ts
const { data } = await CreateItem(dataConnect, createItemVars);

// Operation UpdateItem:  For variables, look at type UpdateItemVars in ../index.d.ts
const { data } = await UpdateItem(dataConnect, updateItemVars);

// Operation UpdateItemStatus:  For variables, look at type UpdateItemStatusVars in ../index.d.ts
const { data } = await UpdateItemStatus(dataConnect, updateItemStatusVars);

// Operation DeleteItem:  For variables, look at type DeleteItemVars in ../index.d.ts
const { data } = await DeleteItem(dataConnect, deleteItemVars);

// Operation CreateLendingRequest:  For variables, look at type CreateLendingRequestVars in ../index.d.ts
const { data } = await CreateLendingRequest(dataConnect, createLendingRequestVars);

// Operation UpdateLendingRequestStatus:  For variables, look at type UpdateLendingRequestStatusVars in ../index.d.ts
const { data } = await UpdateLendingRequestStatus(dataConnect, updateLendingRequestStatusVars);

// Operation CreateReview:  For variables, look at type CreateReviewVars in ../index.d.ts
const { data } = await CreateReview(dataConnect, createReviewVars);

// Operation ListItems: 
const { data } = await ListItems(dataConnect);

// Operation GetItem:  For variables, look at type GetItemVars in ../index.d.ts
const { data } = await GetItem(dataConnect, getItemVars);


```