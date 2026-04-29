# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `local-lender`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListItems*](#listitems)
  - [*GetItem*](#getitem)
  - [*ListMyItems*](#listmyitems)
  - [*ListIncomingRequests*](#listincomingrequests)
  - [*ListOutgoingRequests*](#listoutgoingrequests)
  - [*ListMyReviews*](#listmyreviews)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*FindUserByDisplayName*](#finduserbydisplayname)
  - [*ListReviews*](#listreviews)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*CreateItem*](#createitem)
  - [*UpdateItem*](#updateitem)
  - [*UpdateItemStatus*](#updateitemstatus)
  - [*DeleteItem*](#deleteitem)
  - [*CreateLendingRequest*](#createlendingrequest)
  - [*UpdateLendingRequestStatus*](#updatelendingrequeststatus)
  - [*UpdateUserRating*](#updateuserrating)
  - [*CreateReview*](#createreview)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `local-lender`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@local-lender/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@local-lender/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@local-lender/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `local-lender` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListItems
You can execute the `ListItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listItems(options?: ExecuteQueryOptions): QueryPromise<ListItemsData, undefined>;

interface ListItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListItemsData, undefined>;
}
export const listItemsRef: ListItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListItemsData, undefined>;

interface ListItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListItemsData, undefined>;
}
export const listItemsRef: ListItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listItemsRef:
```typescript
const name = listItemsRef.operationName;
console.log(name);
```

### Variables
The `ListItems` query has no variables.
### Return Type
Recall that executing the `ListItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListItemsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListItemsData {
  items: ({
    id: UUIDString;
    title: string;
    description: string;
    createdAt: TimestampString;
    status: string;
    price?: number | null;
    imageUrl?: string | null;
    locationDetails?: string | null;
    category?: string | null;
    meetupLocationType?: string | null;
    meetupLocationDetails?: string | null;
    condition?: string | null;
    lender?: {
      uid: string;
      displayName: string;
      photoUrl?: string | null;
    } & User_Key;
  } & Item_Key)[];
}
```
### Using `ListItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listItems } from '@local-lender/dataconnect';


// Call the `listItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listItems(dataConnect);

console.log(data.items);

// Or, you can use the `Promise` API.
listItems().then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

### Using `ListItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listItemsRef } from '@local-lender/dataconnect';


// Call the `listItemsRef()` function to get a reference to the query.
const ref = listItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.items);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

## GetItem
You can execute the `GetItem` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getItem(vars: GetItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetItemData, GetItemVariables>;

interface GetItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetItemVariables): QueryRef<GetItemData, GetItemVariables>;
}
export const getItemRef: GetItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getItem(dc: DataConnect, vars: GetItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetItemData, GetItemVariables>;

interface GetItemRef {
  ...
  (dc: DataConnect, vars: GetItemVariables): QueryRef<GetItemData, GetItemVariables>;
}
export const getItemRef: GetItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getItemRef:
```typescript
const name = getItemRef.operationName;
console.log(name);
```

### Variables
The `GetItem` query requires an argument of type `GetItemVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetItem` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetItemData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetItemData {
  item?: {
    id: UUIDString;
    title: string;
    description: string;
    createdAt: TimestampString;
    status: string;
    price?: number | null;
    imageUrl?: string | null;
    locationDetails?: string | null;
    category?: string | null;
    meetupLocationType?: string | null;
    meetupLocationDetails?: string | null;
    condition?: string | null;
    lender?: {
      uid: string;
      displayName: string;
      photoUrl?: string | null;
    } & User_Key;
  } & Item_Key;
}
```
### Using `GetItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getItem, GetItemVariables } from '@local-lender/dataconnect';

// The `GetItem` query requires an argument of type `GetItemVariables`:
const getItemVars: GetItemVariables = {
  id: ..., 
};

// Call the `getItem()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getItem(getItemVars);
// Variables can be defined inline as well.
const { data } = await getItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getItem(dataConnect, getItemVars);

console.log(data.item);

// Or, you can use the `Promise` API.
getItem(getItemVars).then((response) => {
  const data = response.data;
  console.log(data.item);
});
```

### Using `GetItem`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getItemRef, GetItemVariables } from '@local-lender/dataconnect';

// The `GetItem` query requires an argument of type `GetItemVariables`:
const getItemVars: GetItemVariables = {
  id: ..., 
};

// Call the `getItemRef()` function to get a reference to the query.
const ref = getItemRef(getItemVars);
// Variables can be defined inline as well.
const ref = getItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getItemRef(dataConnect, getItemVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.item);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.item);
});
```

## ListMyItems
You can execute the `ListMyItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listMyItems(options?: ExecuteQueryOptions): QueryPromise<ListMyItemsData, undefined>;

interface ListMyItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyItemsData, undefined>;
}
export const listMyItemsRef: ListMyItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyItemsData, undefined>;

interface ListMyItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyItemsData, undefined>;
}
export const listMyItemsRef: ListMyItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyItemsRef:
```typescript
const name = listMyItemsRef.operationName;
console.log(name);
```

### Variables
The `ListMyItems` query has no variables.
### Return Type
Recall that executing the `ListMyItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyItemsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyItemsData {
  items: ({
    id: UUIDString;
    title: string;
    description: string;
    createdAt: TimestampString;
    status: string;
    price?: number | null;
    imageUrl?: string | null;
    locationDetails?: string | null;
    category?: string | null;
    meetupLocationType?: string | null;
    meetupLocationDetails?: string | null;
    condition?: string | null;
  } & Item_Key)[];
}
```
### Using `ListMyItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyItems } from '@local-lender/dataconnect';


// Call the `listMyItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyItems(dataConnect);

console.log(data.items);

// Or, you can use the `Promise` API.
listMyItems().then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

### Using `ListMyItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyItemsRef } from '@local-lender/dataconnect';


// Call the `listMyItemsRef()` function to get a reference to the query.
const ref = listMyItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.items);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

## ListIncomingRequests
You can execute the `ListIncomingRequests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listIncomingRequests(options?: ExecuteQueryOptions): QueryPromise<ListIncomingRequestsData, undefined>;

interface ListIncomingRequestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListIncomingRequestsData, undefined>;
}
export const listIncomingRequestsRef: ListIncomingRequestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listIncomingRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListIncomingRequestsData, undefined>;

interface ListIncomingRequestsRef {
  ...
  (dc: DataConnect): QueryRef<ListIncomingRequestsData, undefined>;
}
export const listIncomingRequestsRef: ListIncomingRequestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listIncomingRequestsRef:
```typescript
const name = listIncomingRequestsRef.operationName;
console.log(name);
```

### Variables
The `ListIncomingRequests` query has no variables.
### Return Type
Recall that executing the `ListIncomingRequests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListIncomingRequestsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListIncomingRequestsData {
  lendingRequests: ({
    id: UUIDString;
    requestedAt: TimestampString;
    status: string;
    borrowerNotes: string;
    startDate?: DateString | null;
    endDate?: DateString | null;
    item?: {
      id: UUIDString;
      title: string;
      price?: number | null;
    } & Item_Key;
      borrower?: {
        uid: string;
        displayName: string;
        averageRating?: number | null;
        reviewCount?: number | null;
      } & User_Key;
  } & LendingRequest_Key)[];
}
```
### Using `ListIncomingRequests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listIncomingRequests } from '@local-lender/dataconnect';


// Call the `listIncomingRequests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listIncomingRequests();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listIncomingRequests(dataConnect);

console.log(data.lendingRequests);

// Or, you can use the `Promise` API.
listIncomingRequests().then((response) => {
  const data = response.data;
  console.log(data.lendingRequests);
});
```

### Using `ListIncomingRequests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listIncomingRequestsRef } from '@local-lender/dataconnect';


// Call the `listIncomingRequestsRef()` function to get a reference to the query.
const ref = listIncomingRequestsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listIncomingRequestsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lendingRequests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lendingRequests);
});
```

## ListOutgoingRequests
You can execute the `ListOutgoingRequests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listOutgoingRequests(options?: ExecuteQueryOptions): QueryPromise<ListOutgoingRequestsData, undefined>;

interface ListOutgoingRequestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOutgoingRequestsData, undefined>;
}
export const listOutgoingRequestsRef: ListOutgoingRequestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOutgoingRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOutgoingRequestsData, undefined>;

interface ListOutgoingRequestsRef {
  ...
  (dc: DataConnect): QueryRef<ListOutgoingRequestsData, undefined>;
}
export const listOutgoingRequestsRef: ListOutgoingRequestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOutgoingRequestsRef:
```typescript
const name = listOutgoingRequestsRef.operationName;
console.log(name);
```

### Variables
The `ListOutgoingRequests` query has no variables.
### Return Type
Recall that executing the `ListOutgoingRequests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOutgoingRequestsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOutgoingRequestsData {
  lendingRequests: ({
    id: UUIDString;
    requestedAt: TimestampString;
    status: string;
    borrowerNotes: string;
    startDate?: DateString | null;
    endDate?: DateString | null;
    item?: {
      id: UUIDString;
      title: string;
      price?: number | null;
      lender?: {
        uid: string;
        displayName: string;
      } & User_Key;
    } & Item_Key;
      lender?: {
        uid: string;
        displayName: string;
        averageRating?: number | null;
        reviewCount?: number | null;
      } & User_Key;
  } & LendingRequest_Key)[];
}
```
### Using `ListOutgoingRequests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOutgoingRequests } from '@local-lender/dataconnect';


// Call the `listOutgoingRequests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOutgoingRequests();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOutgoingRequests(dataConnect);

console.log(data.lendingRequests);

// Or, you can use the `Promise` API.
listOutgoingRequests().then((response) => {
  const data = response.data;
  console.log(data.lendingRequests);
});
```

### Using `ListOutgoingRequests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOutgoingRequestsRef } from '@local-lender/dataconnect';


// Call the `listOutgoingRequestsRef()` function to get a reference to the query.
const ref = listOutgoingRequestsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOutgoingRequestsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lendingRequests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lendingRequests);
});
```

## ListMyReviews
You can execute the `ListMyReviews` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listMyReviews(options?: ExecuteQueryOptions): QueryPromise<ListMyReviewsData, undefined>;

interface ListMyReviewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyReviewsData, undefined>;
}
export const listMyReviewsRef: ListMyReviewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyReviews(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyReviewsData, undefined>;

interface ListMyReviewsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyReviewsData, undefined>;
}
export const listMyReviewsRef: ListMyReviewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyReviewsRef:
```typescript
const name = listMyReviewsRef.operationName;
console.log(name);
```

### Variables
The `ListMyReviews` query has no variables.
### Return Type
Recall that executing the `ListMyReviews` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyReviewsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyReviewsData {
  reviews: ({
    id: UUIDString;
    rating: number;
    comment: string;
    createdAt: TimestampString;
    helpful?: boolean | null;
    reviewer?: {
      uid: string;
      displayName: string;
    } & User_Key;
      lendingRequest?: {
        id: UUIDString;
        startDate?: DateString | null;
        endDate?: DateString | null;
        status: string;
        borrower?: {
          uid: string;
          displayName: string;
        } & User_Key;
          lender?: {
            uid: string;
            displayName: string;
          } & User_Key;
            item?: {
              id: UUIDString;
              title: string;
              imageUrl?: string | null;
              category?: string | null;
            } & Item_Key;
      } & LendingRequest_Key;
  } & Review_Key)[];
}
```
### Using `ListMyReviews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyReviews } from '@local-lender/dataconnect';


// Call the `listMyReviews()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyReviews();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyReviews(dataConnect);

console.log(data.reviews);

// Or, you can use the `Promise` API.
listMyReviews().then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

### Using `ListMyReviews`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyReviewsRef } from '@local-lender/dataconnect';


// Call the `listMyReviewsRef()` function to get a reference to the query.
const ref = listMyReviewsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyReviewsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reviews);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  users: ({
    uid: string;
    displayName: string;
    email: string;
    photoUrl?: string | null;
    location?: string | null;
    createdAt: TimestampString;
    averageRating?: number | null;
    reviewCount?: number | null;
  } & User_Key)[];
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@local-lender/dataconnect';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@local-lender/dataconnect';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## FindUserByDisplayName
You can execute the `FindUserByDisplayName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
findUserByDisplayName(vars: FindUserByDisplayNameVariables, options?: ExecuteQueryOptions): QueryPromise<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;

interface FindUserByDisplayNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: FindUserByDisplayNameVariables): QueryRef<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;
}
export const findUserByDisplayNameRef: FindUserByDisplayNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
findUserByDisplayName(dc: DataConnect, vars: FindUserByDisplayNameVariables, options?: ExecuteQueryOptions): QueryPromise<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;

interface FindUserByDisplayNameRef {
  ...
  (dc: DataConnect, vars: FindUserByDisplayNameVariables): QueryRef<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;
}
export const findUserByDisplayNameRef: FindUserByDisplayNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the findUserByDisplayNameRef:
```typescript
const name = findUserByDisplayNameRef.operationName;
console.log(name);
```

### Variables
The `FindUserByDisplayName` query requires an argument of type `FindUserByDisplayNameVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface FindUserByDisplayNameVariables {
  displayName: string;
}
```
### Return Type
Recall that executing the `FindUserByDisplayName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FindUserByDisplayNameData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface FindUserByDisplayNameData {
  users: ({
    uid: string;
    displayName: string;
    averageRating?: number | null;
    reviewCount?: number | null;
  } & User_Key)[];
}
```
### Using `FindUserByDisplayName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, findUserByDisplayName, FindUserByDisplayNameVariables } from '@local-lender/dataconnect';

// The `FindUserByDisplayName` query requires an argument of type `FindUserByDisplayNameVariables`:
const findUserByDisplayNameVars: FindUserByDisplayNameVariables = {
  displayName: ..., 
};

// Call the `findUserByDisplayName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await findUserByDisplayName(findUserByDisplayNameVars);
// Variables can be defined inline as well.
const { data } = await findUserByDisplayName({ displayName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await findUserByDisplayName(dataConnect, findUserByDisplayNameVars);

console.log(data.users);

// Or, you can use the `Promise` API.
findUserByDisplayName(findUserByDisplayNameVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `FindUserByDisplayName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, findUserByDisplayNameRef, FindUserByDisplayNameVariables } from '@local-lender/dataconnect';

// The `FindUserByDisplayName` query requires an argument of type `FindUserByDisplayNameVariables`:
const findUserByDisplayNameVars: FindUserByDisplayNameVariables = {
  displayName: ..., 
};

// Call the `findUserByDisplayNameRef()` function to get a reference to the query.
const ref = findUserByDisplayNameRef(findUserByDisplayNameVars);
// Variables can be defined inline as well.
const ref = findUserByDisplayNameRef({ displayName: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = findUserByDisplayNameRef(dataConnect, findUserByDisplayNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListReviews
You can execute the `ListReviews` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listReviews(options?: ExecuteQueryOptions): QueryPromise<ListReviewsData, undefined>;

interface ListReviewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListReviewsData, undefined>;
}
export const listReviewsRef: ListReviewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listReviews(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListReviewsData, undefined>;

interface ListReviewsRef {
  ...
  (dc: DataConnect): QueryRef<ListReviewsData, undefined>;
}
export const listReviewsRef: ListReviewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listReviewsRef:
```typescript
const name = listReviewsRef.operationName;
console.log(name);
```

### Variables
The `ListReviews` query has no variables.
### Return Type
Recall that executing the `ListReviews` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListReviewsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListReviewsData {
  reviews: ({
    id: UUIDString;
    rating: number;
    comment: string;
    reviewedUser?: {
      uid: string;
      displayName: string;
      averageRating?: number | null;
      reviewCount?: number | null;
    } & User_Key;
  } & Review_Key)[];
}
```
### Using `ListReviews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listReviews } from '@local-lender/dataconnect';


// Call the `listReviews()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listReviews();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listReviews(dataConnect);

console.log(data.reviews);

// Or, you can use the `Promise` API.
listReviews().then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

### Using `ListReviews`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listReviewsRef } from '@local-lender/dataconnect';


// Call the `listReviewsRef()` function to get a reference to the query.
const ref = listReviewsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listReviewsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reviews);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `local-lender` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  displayName: string;
  email: string;
  photoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@local-lender/dataconnect';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  displayName: ..., 
  email: ..., 
  photoUrl: ..., // optional
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ displayName: ..., email: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@local-lender/dataconnect';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  displayName: ..., 
  email: ..., 
  photoUrl: ..., // optional
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ displayName: ..., email: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateItem
You can execute the `CreateItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createItem(vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface CreateItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
}
export const createItemRef: CreateItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createItem(dc: DataConnect, vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface CreateItemRef {
  ...
  (dc: DataConnect, vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
}
export const createItemRef: CreateItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createItemRef:
```typescript
const name = createItemRef.operationName;
console.log(name);
```

### Variables
The `CreateItem` mutation requires an argument of type `CreateItemVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateItemVariables {
  title: string;
  description: string;
  price?: number | null;
  imageUrl?: string | null;
  locationDetails?: string | null;
  category?: string | null;
  condition?: string | null;
}
```
### Return Type
Recall that executing the `CreateItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateItemData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateItemData {
  item_insert: Item_Key;
}
```
### Using `CreateItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createItem, CreateItemVariables } from '@local-lender/dataconnect';

// The `CreateItem` mutation requires an argument of type `CreateItemVariables`:
const createItemVars: CreateItemVariables = {
  title: ..., 
  description: ..., 
  price: ..., // optional
  imageUrl: ..., // optional
  locationDetails: ..., // optional
  category: ..., // optional
  condition: ..., // optional
};

// Call the `createItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createItem(createItemVars);
// Variables can be defined inline as well.
const { data } = await createItem({ title: ..., description: ..., price: ..., imageUrl: ..., locationDetails: ..., category: ..., condition: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createItem(dataConnect, createItemVars);

console.log(data.item_insert);

// Or, you can use the `Promise` API.
createItem(createItemVars).then((response) => {
  const data = response.data;
  console.log(data.item_insert);
});
```

### Using `CreateItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createItemRef, CreateItemVariables } from '@local-lender/dataconnect';

// The `CreateItem` mutation requires an argument of type `CreateItemVariables`:
const createItemVars: CreateItemVariables = {
  title: ..., 
  description: ..., 
  price: ..., // optional
  imageUrl: ..., // optional
  locationDetails: ..., // optional
  category: ..., // optional
  condition: ..., // optional
};

// Call the `createItemRef()` function to get a reference to the mutation.
const ref = createItemRef(createItemVars);
// Variables can be defined inline as well.
const ref = createItemRef({ title: ..., description: ..., price: ..., imageUrl: ..., locationDetails: ..., category: ..., condition: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createItemRef(dataConnect, createItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.item_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.item_insert);
});
```

## UpdateItem
You can execute the `UpdateItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateItem(vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;

interface UpdateItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
}
export const updateItemRef: UpdateItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateItem(dc: DataConnect, vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;

interface UpdateItemRef {
  ...
  (dc: DataConnect, vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
}
export const updateItemRef: UpdateItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateItemRef:
```typescript
const name = updateItemRef.operationName;
console.log(name);
```

### Variables
The `UpdateItem` mutation requires an argument of type `UpdateItemVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateItemVariables {
  id: UUIDString;
  title: string;
  description: string;
  price?: number | null;
  imageUrl?: string | null;
  locationDetails?: string | null;
  category?: string | null;
  condition?: string | null;
}
```
### Return Type
Recall that executing the `UpdateItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateItemData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateItemData {
  item_update?: Item_Key | null;
}
```
### Using `UpdateItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateItem, UpdateItemVariables } from '@local-lender/dataconnect';

// The `UpdateItem` mutation requires an argument of type `UpdateItemVariables`:
const updateItemVars: UpdateItemVariables = {
  id: ..., 
  title: ..., 
  description: ..., 
  price: ..., // optional
  imageUrl: ..., // optional
  locationDetails: ..., // optional
  category: ..., // optional
  condition: ..., // optional
};

// Call the `updateItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateItem(updateItemVars);
// Variables can be defined inline as well.
const { data } = await updateItem({ id: ..., title: ..., description: ..., price: ..., imageUrl: ..., locationDetails: ..., category: ..., condition: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateItem(dataConnect, updateItemVars);

console.log(data.item_update);

// Or, you can use the `Promise` API.
updateItem(updateItemVars).then((response) => {
  const data = response.data;
  console.log(data.item_update);
});
```

### Using `UpdateItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateItemRef, UpdateItemVariables } from '@local-lender/dataconnect';

// The `UpdateItem` mutation requires an argument of type `UpdateItemVariables`:
const updateItemVars: UpdateItemVariables = {
  id: ..., 
  title: ..., 
  description: ..., 
  price: ..., // optional
  imageUrl: ..., // optional
  locationDetails: ..., // optional
  category: ..., // optional
  condition: ..., // optional
};

// Call the `updateItemRef()` function to get a reference to the mutation.
const ref = updateItemRef(updateItemVars);
// Variables can be defined inline as well.
const ref = updateItemRef({ id: ..., title: ..., description: ..., price: ..., imageUrl: ..., locationDetails: ..., category: ..., condition: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateItemRef(dataConnect, updateItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.item_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.item_update);
});
```

## UpdateItemStatus
You can execute the `UpdateItemStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateItemStatus(vars: UpdateItemStatusVariables): MutationPromise<UpdateItemStatusData, UpdateItemStatusVariables>;

interface UpdateItemStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateItemStatusVariables): MutationRef<UpdateItemStatusData, UpdateItemStatusVariables>;
}
export const updateItemStatusRef: UpdateItemStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateItemStatus(dc: DataConnect, vars: UpdateItemStatusVariables): MutationPromise<UpdateItemStatusData, UpdateItemStatusVariables>;

interface UpdateItemStatusRef {
  ...
  (dc: DataConnect, vars: UpdateItemStatusVariables): MutationRef<UpdateItemStatusData, UpdateItemStatusVariables>;
}
export const updateItemStatusRef: UpdateItemStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateItemStatusRef:
```typescript
const name = updateItemStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateItemStatus` mutation requires an argument of type `UpdateItemStatusVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateItemStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateItemStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateItemStatusData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateItemStatusData {
  item_update?: Item_Key | null;
}
```
### Using `UpdateItemStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateItemStatus, UpdateItemStatusVariables } from '@local-lender/dataconnect';

// The `UpdateItemStatus` mutation requires an argument of type `UpdateItemStatusVariables`:
const updateItemStatusVars: UpdateItemStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateItemStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateItemStatus(updateItemStatusVars);
// Variables can be defined inline as well.
const { data } = await updateItemStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateItemStatus(dataConnect, updateItemStatusVars);

console.log(data.item_update);

// Or, you can use the `Promise` API.
updateItemStatus(updateItemStatusVars).then((response) => {
  const data = response.data;
  console.log(data.item_update);
});
```

### Using `UpdateItemStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateItemStatusRef, UpdateItemStatusVariables } from '@local-lender/dataconnect';

// The `UpdateItemStatus` mutation requires an argument of type `UpdateItemStatusVariables`:
const updateItemStatusVars: UpdateItemStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateItemStatusRef()` function to get a reference to the mutation.
const ref = updateItemStatusRef(updateItemStatusVars);
// Variables can be defined inline as well.
const ref = updateItemStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateItemStatusRef(dataConnect, updateItemStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.item_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.item_update);
});
```

## DeleteItem
You can execute the `DeleteItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteItem(vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;

interface DeleteItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
}
export const deleteItemRef: DeleteItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteItem(dc: DataConnect, vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;

interface DeleteItemRef {
  ...
  (dc: DataConnect, vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
}
export const deleteItemRef: DeleteItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteItemRef:
```typescript
const name = deleteItemRef.operationName;
console.log(name);
```

### Variables
The `DeleteItem` mutation requires an argument of type `DeleteItemVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteItemData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteItemData {
  item_delete?: Item_Key | null;
}
```
### Using `DeleteItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteItem, DeleteItemVariables } from '@local-lender/dataconnect';

// The `DeleteItem` mutation requires an argument of type `DeleteItemVariables`:
const deleteItemVars: DeleteItemVariables = {
  id: ..., 
};

// Call the `deleteItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteItem(deleteItemVars);
// Variables can be defined inline as well.
const { data } = await deleteItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteItem(dataConnect, deleteItemVars);

console.log(data.item_delete);

// Or, you can use the `Promise` API.
deleteItem(deleteItemVars).then((response) => {
  const data = response.data;
  console.log(data.item_delete);
});
```

### Using `DeleteItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteItemRef, DeleteItemVariables } from '@local-lender/dataconnect';

// The `DeleteItem` mutation requires an argument of type `DeleteItemVariables`:
const deleteItemVars: DeleteItemVariables = {
  id: ..., 
};

// Call the `deleteItemRef()` function to get a reference to the mutation.
const ref = deleteItemRef(deleteItemVars);
// Variables can be defined inline as well.
const ref = deleteItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteItemRef(dataConnect, deleteItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.item_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.item_delete);
});
```

## CreateLendingRequest
You can execute the `CreateLendingRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createLendingRequest(vars: CreateLendingRequestVariables): MutationPromise<CreateLendingRequestData, CreateLendingRequestVariables>;

interface CreateLendingRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLendingRequestVariables): MutationRef<CreateLendingRequestData, CreateLendingRequestVariables>;
}
export const createLendingRequestRef: CreateLendingRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLendingRequest(dc: DataConnect, vars: CreateLendingRequestVariables): MutationPromise<CreateLendingRequestData, CreateLendingRequestVariables>;

interface CreateLendingRequestRef {
  ...
  (dc: DataConnect, vars: CreateLendingRequestVariables): MutationRef<CreateLendingRequestData, CreateLendingRequestVariables>;
}
export const createLendingRequestRef: CreateLendingRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLendingRequestRef:
```typescript
const name = createLendingRequestRef.operationName;
console.log(name);
```

### Variables
The `CreateLendingRequest` mutation requires an argument of type `CreateLendingRequestVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLendingRequestVariables {
  itemId: UUIDString;
  lenderUid: string;
  borrowerNotes: string;
  startDate?: DateString | null;
  endDate?: DateString | null;
}
```
### Return Type
Recall that executing the `CreateLendingRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLendingRequestData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLendingRequestData {
  lendingRequest_insert: LendingRequest_Key;
}
```
### Using `CreateLendingRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLendingRequest, CreateLendingRequestVariables } from '@local-lender/dataconnect';

// The `CreateLendingRequest` mutation requires an argument of type `CreateLendingRequestVariables`:
const createLendingRequestVars: CreateLendingRequestVariables = {
  itemId: ..., 
  lenderUid: ..., 
  borrowerNotes: ..., 
  startDate: ..., // optional
  endDate: ..., // optional
};

// Call the `createLendingRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLendingRequest(createLendingRequestVars);
// Variables can be defined inline as well.
const { data } = await createLendingRequest({ itemId: ..., lenderUid: ..., borrowerNotes: ..., startDate: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLendingRequest(dataConnect, createLendingRequestVars);

console.log(data.lendingRequest_insert);

// Or, you can use the `Promise` API.
createLendingRequest(createLendingRequestVars).then((response) => {
  const data = response.data;
  console.log(data.lendingRequest_insert);
});
```

### Using `CreateLendingRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLendingRequestRef, CreateLendingRequestVariables } from '@local-lender/dataconnect';

// The `CreateLendingRequest` mutation requires an argument of type `CreateLendingRequestVariables`:
const createLendingRequestVars: CreateLendingRequestVariables = {
  itemId: ..., 
  lenderUid: ..., 
  borrowerNotes: ..., 
  startDate: ..., // optional
  endDate: ..., // optional
};

// Call the `createLendingRequestRef()` function to get a reference to the mutation.
const ref = createLendingRequestRef(createLendingRequestVars);
// Variables can be defined inline as well.
const ref = createLendingRequestRef({ itemId: ..., lenderUid: ..., borrowerNotes: ..., startDate: ..., endDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLendingRequestRef(dataConnect, createLendingRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lendingRequest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lendingRequest_insert);
});
```

## UpdateLendingRequestStatus
You can execute the `UpdateLendingRequestStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateLendingRequestStatus(vars: UpdateLendingRequestStatusVariables): MutationPromise<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;

interface UpdateLendingRequestStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLendingRequestStatusVariables): MutationRef<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;
}
export const updateLendingRequestStatusRef: UpdateLendingRequestStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLendingRequestStatus(dc: DataConnect, vars: UpdateLendingRequestStatusVariables): MutationPromise<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;

interface UpdateLendingRequestStatusRef {
  ...
  (dc: DataConnect, vars: UpdateLendingRequestStatusVariables): MutationRef<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;
}
export const updateLendingRequestStatusRef: UpdateLendingRequestStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLendingRequestStatusRef:
```typescript
const name = updateLendingRequestStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateLendingRequestStatus` mutation requires an argument of type `UpdateLendingRequestStatusVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLendingRequestStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateLendingRequestStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLendingRequestStatusData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLendingRequestStatusData {
  lendingRequest_update?: LendingRequest_Key | null;
}
```
### Using `UpdateLendingRequestStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLendingRequestStatus, UpdateLendingRequestStatusVariables } from '@local-lender/dataconnect';

// The `UpdateLendingRequestStatus` mutation requires an argument of type `UpdateLendingRequestStatusVariables`:
const updateLendingRequestStatusVars: UpdateLendingRequestStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateLendingRequestStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLendingRequestStatus(updateLendingRequestStatusVars);
// Variables can be defined inline as well.
const { data } = await updateLendingRequestStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLendingRequestStatus(dataConnect, updateLendingRequestStatusVars);

console.log(data.lendingRequest_update);

// Or, you can use the `Promise` API.
updateLendingRequestStatus(updateLendingRequestStatusVars).then((response) => {
  const data = response.data;
  console.log(data.lendingRequest_update);
});
```

### Using `UpdateLendingRequestStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLendingRequestStatusRef, UpdateLendingRequestStatusVariables } from '@local-lender/dataconnect';

// The `UpdateLendingRequestStatus` mutation requires an argument of type `UpdateLendingRequestStatusVariables`:
const updateLendingRequestStatusVars: UpdateLendingRequestStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateLendingRequestStatusRef()` function to get a reference to the mutation.
const ref = updateLendingRequestStatusRef(updateLendingRequestStatusVars);
// Variables can be defined inline as well.
const ref = updateLendingRequestStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLendingRequestStatusRef(dataConnect, updateLendingRequestStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lendingRequest_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lendingRequest_update);
});
```

## UpdateUserRating
You can execute the `UpdateUserRating` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateUserRating(vars: UpdateUserRatingVariables): MutationPromise<UpdateUserRatingData, UpdateUserRatingVariables>;

interface UpdateUserRatingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRatingVariables): MutationRef<UpdateUserRatingData, UpdateUserRatingVariables>;
}
export const updateUserRatingRef: UpdateUserRatingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserRating(dc: DataConnect, vars: UpdateUserRatingVariables): MutationPromise<UpdateUserRatingData, UpdateUserRatingVariables>;

interface UpdateUserRatingRef {
  ...
  (dc: DataConnect, vars: UpdateUserRatingVariables): MutationRef<UpdateUserRatingData, UpdateUserRatingVariables>;
}
export const updateUserRatingRef: UpdateUserRatingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRatingRef:
```typescript
const name = updateUserRatingRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserRating` mutation requires an argument of type `UpdateUserRatingVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserRatingVariables {
  uid: string;
  averageRating: number;
  reviewCount: number;
}
```
### Return Type
Recall that executing the `UpdateUserRating` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserRatingData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserRatingData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserRating`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserRating, UpdateUserRatingVariables } from '@local-lender/dataconnect';

// The `UpdateUserRating` mutation requires an argument of type `UpdateUserRatingVariables`:
const updateUserRatingVars: UpdateUserRatingVariables = {
  uid: ..., 
  averageRating: ..., 
  reviewCount: ..., 
};

// Call the `updateUserRating()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserRating(updateUserRatingVars);
// Variables can be defined inline as well.
const { data } = await updateUserRating({ uid: ..., averageRating: ..., reviewCount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserRating(dataConnect, updateUserRatingVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserRating(updateUserRatingVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserRating`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRatingRef, UpdateUserRatingVariables } from '@local-lender/dataconnect';

// The `UpdateUserRating` mutation requires an argument of type `UpdateUserRatingVariables`:
const updateUserRatingVars: UpdateUserRatingVariables = {
  uid: ..., 
  averageRating: ..., 
  reviewCount: ..., 
};

// Call the `updateUserRatingRef()` function to get a reference to the mutation.
const ref = updateUserRatingRef(updateUserRatingVars);
// Variables can be defined inline as well.
const ref = updateUserRatingRef({ uid: ..., averageRating: ..., reviewCount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRatingRef(dataConnect, updateUserRatingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## CreateReview
You can execute the `CreateReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createReview(vars: CreateReviewVariables): MutationPromise<CreateReviewData, CreateReviewVariables>;

interface CreateReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReviewVariables): MutationRef<CreateReviewData, CreateReviewVariables>;
}
export const createReviewRef: CreateReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createReview(dc: DataConnect, vars: CreateReviewVariables): MutationPromise<CreateReviewData, CreateReviewVariables>;

interface CreateReviewRef {
  ...
  (dc: DataConnect, vars: CreateReviewVariables): MutationRef<CreateReviewData, CreateReviewVariables>;
}
export const createReviewRef: CreateReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createReviewRef:
```typescript
const name = createReviewRef.operationName;
console.log(name);
```

### Variables
The `CreateReview` mutation requires an argument of type `CreateReviewVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateReviewVariables {
  reviewedUserUid: string;
  rating: number;
  comment: string;
  lendingRequestId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateReviewData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateReviewData {
  review_insert: Review_Key;
}
```
### Using `CreateReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createReview, CreateReviewVariables } from '@local-lender/dataconnect';

// The `CreateReview` mutation requires an argument of type `CreateReviewVariables`:
const createReviewVars: CreateReviewVariables = {
  reviewedUserUid: ..., 
  rating: ..., 
  comment: ..., 
  lendingRequestId: ..., // optional
};

// Call the `createReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createReview(createReviewVars);
// Variables can be defined inline as well.
const { data } = await createReview({ reviewedUserUid: ..., rating: ..., comment: ..., lendingRequestId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createReview(dataConnect, createReviewVars);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
createReview(createReviewVars).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

### Using `CreateReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createReviewRef, CreateReviewVariables } from '@local-lender/dataconnect';

// The `CreateReview` mutation requires an argument of type `CreateReviewVariables`:
const createReviewVars: CreateReviewVariables = {
  reviewedUserUid: ..., 
  rating: ..., 
  comment: ..., 
  lendingRequestId: ..., // optional
};

// Call the `createReviewRef()` function to get a reference to the mutation.
const ref = createReviewRef(createReviewVars);
// Variables can be defined inline as well.
const ref = createReviewRef({ reviewedUserUid: ..., rating: ..., comment: ..., lendingRequestId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createReviewRef(dataConnect, createReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.review_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.review_insert);
});
```

