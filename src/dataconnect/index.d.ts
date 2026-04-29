import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateItemData {
  item_insert: Item_Key;
}

export interface CreateItemVariables {
  title: string;
  description: string;
  price?: number | null;
  imageUrl?: string | null;
  locationDetails?: string | null;
  category?: string | null;
  condition?: string | null;
}

export interface CreateLendingRequestData {
  lendingRequest_insert: LendingRequest_Key;
}

export interface CreateLendingRequestVariables {
  itemId: UUIDString;
  lenderUid: string;
  borrowerNotes: string;
  startDate?: DateString | null;
  endDate?: DateString | null;
}

export interface CreateReviewData {
  review_insert: Review_Key;
}

export interface CreateReviewVariables {
  reviewedUserUid: string;
  rating: number;
  comment: string;
  lendingRequestId?: UUIDString | null;
}

export interface DeleteItemData {
  item_delete?: Item_Key | null;
}

export interface DeleteItemVariables {
  id: UUIDString;
}

export interface FindUserByDisplayNameData {
  users: ({
    uid: string;
    displayName: string;
    averageRating?: number | null;
    reviewCount?: number | null;
  } & User_Key)[];
}

export interface FindUserByDisplayNameVariables {
  displayName: string;
}

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

export interface GetItemVariables {
  id: UUIDString;
}

export interface Item_Key {
  id: UUIDString;
  __typename?: 'Item_Key';
}

export interface LendingRequest_Key {
  id: UUIDString;
  __typename?: 'LendingRequest_Key';
}

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

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface UpdateItemData {
  item_update?: Item_Key | null;
}

export interface UpdateItemStatusData {
  item_update?: Item_Key | null;
}

export interface UpdateItemStatusVariables {
  id: UUIDString;
  status: string;
}

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

export interface UpdateLendingRequestStatusData {
  lendingRequest_update?: LendingRequest_Key | null;
}

export interface UpdateLendingRequestStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateUserRatingData {
  user_update?: User_Key | null;
}

export interface UpdateUserRatingVariables {
  uid: string;
  averageRating: number;
  reviewCount: number;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  displayName: string;
  email: string;
  photoUrl?: string | null;
}

export interface User_Key {
  uid: string;
  __typename?: 'User_Key';
}

interface ListItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListItemsData, undefined>;
  operationName: string;
}
export const listItemsRef: ListItemsRef;

export function listItems(options?: ExecuteQueryOptions): QueryPromise<ListItemsData, undefined>;
export function listItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListItemsData, undefined>;

interface GetItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetItemVariables): QueryRef<GetItemData, GetItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetItemVariables): QueryRef<GetItemData, GetItemVariables>;
  operationName: string;
}
export const getItemRef: GetItemRef;

export function getItem(vars: GetItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetItemData, GetItemVariables>;
export function getItem(dc: DataConnect, vars: GetItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetItemData, GetItemVariables>;

interface ListMyItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyItemsData, undefined>;
  operationName: string;
}
export const listMyItemsRef: ListMyItemsRef;

export function listMyItems(options?: ExecuteQueryOptions): QueryPromise<ListMyItemsData, undefined>;
export function listMyItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyItemsData, undefined>;

interface ListIncomingRequestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListIncomingRequestsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListIncomingRequestsData, undefined>;
  operationName: string;
}
export const listIncomingRequestsRef: ListIncomingRequestsRef;

export function listIncomingRequests(options?: ExecuteQueryOptions): QueryPromise<ListIncomingRequestsData, undefined>;
export function listIncomingRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListIncomingRequestsData, undefined>;

interface ListOutgoingRequestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOutgoingRequestsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOutgoingRequestsData, undefined>;
  operationName: string;
}
export const listOutgoingRequestsRef: ListOutgoingRequestsRef;

export function listOutgoingRequests(options?: ExecuteQueryOptions): QueryPromise<ListOutgoingRequestsData, undefined>;
export function listOutgoingRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOutgoingRequestsData, undefined>;

interface ListMyReviewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyReviewsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyReviewsData, undefined>;
  operationName: string;
}
export const listMyReviewsRef: ListMyReviewsRef;

export function listMyReviews(options?: ExecuteQueryOptions): QueryPromise<ListMyReviewsData, undefined>;
export function listMyReviews(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyReviewsData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface FindUserByDisplayNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: FindUserByDisplayNameVariables): QueryRef<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: FindUserByDisplayNameVariables): QueryRef<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;
  operationName: string;
}
export const findUserByDisplayNameRef: FindUserByDisplayNameRef;

export function findUserByDisplayName(vars: FindUserByDisplayNameVariables, options?: ExecuteQueryOptions): QueryPromise<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;
export function findUserByDisplayName(dc: DataConnect, vars: FindUserByDisplayNameVariables, options?: ExecuteQueryOptions): QueryPromise<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;

interface ListReviewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListReviewsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListReviewsData, undefined>;
  operationName: string;
}
export const listReviewsRef: ListReviewsRef;

export function listReviews(options?: ExecuteQueryOptions): QueryPromise<ListReviewsData, undefined>;
export function listReviews(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListReviewsData, undefined>;

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface CreateItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
  operationName: string;
}
export const createItemRef: CreateItemRef;

export function createItem(vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;
export function createItem(dc: DataConnect, vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface UpdateItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
  operationName: string;
}
export const updateItemRef: UpdateItemRef;

export function updateItem(vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;
export function updateItem(dc: DataConnect, vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;

interface UpdateItemStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateItemStatusVariables): MutationRef<UpdateItemStatusData, UpdateItemStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateItemStatusVariables): MutationRef<UpdateItemStatusData, UpdateItemStatusVariables>;
  operationName: string;
}
export const updateItemStatusRef: UpdateItemStatusRef;

export function updateItemStatus(vars: UpdateItemStatusVariables): MutationPromise<UpdateItemStatusData, UpdateItemStatusVariables>;
export function updateItemStatus(dc: DataConnect, vars: UpdateItemStatusVariables): MutationPromise<UpdateItemStatusData, UpdateItemStatusVariables>;

interface DeleteItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
  operationName: string;
}
export const deleteItemRef: DeleteItemRef;

export function deleteItem(vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;
export function deleteItem(dc: DataConnect, vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;

interface CreateLendingRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLendingRequestVariables): MutationRef<CreateLendingRequestData, CreateLendingRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLendingRequestVariables): MutationRef<CreateLendingRequestData, CreateLendingRequestVariables>;
  operationName: string;
}
export const createLendingRequestRef: CreateLendingRequestRef;

export function createLendingRequest(vars: CreateLendingRequestVariables): MutationPromise<CreateLendingRequestData, CreateLendingRequestVariables>;
export function createLendingRequest(dc: DataConnect, vars: CreateLendingRequestVariables): MutationPromise<CreateLendingRequestData, CreateLendingRequestVariables>;

interface UpdateLendingRequestStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLendingRequestStatusVariables): MutationRef<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLendingRequestStatusVariables): MutationRef<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;
  operationName: string;
}
export const updateLendingRequestStatusRef: UpdateLendingRequestStatusRef;

export function updateLendingRequestStatus(vars: UpdateLendingRequestStatusVariables): MutationPromise<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;
export function updateLendingRequestStatus(dc: DataConnect, vars: UpdateLendingRequestStatusVariables): MutationPromise<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;

interface UpdateUserRatingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRatingVariables): MutationRef<UpdateUserRatingData, UpdateUserRatingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRatingVariables): MutationRef<UpdateUserRatingData, UpdateUserRatingVariables>;
  operationName: string;
}
export const updateUserRatingRef: UpdateUserRatingRef;

export function updateUserRating(vars: UpdateUserRatingVariables): MutationPromise<UpdateUserRatingData, UpdateUserRatingVariables>;
export function updateUserRating(dc: DataConnect, vars: UpdateUserRatingVariables): MutationPromise<UpdateUserRatingData, UpdateUserRatingVariables>;

interface CreateReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReviewVariables): MutationRef<CreateReviewData, CreateReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateReviewVariables): MutationRef<CreateReviewData, CreateReviewVariables>;
  operationName: string;
}
export const createReviewRef: CreateReviewRef;

export function createReview(vars: CreateReviewVariables): MutationPromise<CreateReviewData, CreateReviewVariables>;
export function createReview(dc: DataConnect, vars: CreateReviewVariables): MutationPromise<CreateReviewData, CreateReviewVariables>;

