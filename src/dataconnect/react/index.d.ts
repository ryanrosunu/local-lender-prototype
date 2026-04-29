import { ListItemsData, GetItemData, GetItemVariables, ListMyItemsData, ListIncomingRequestsData, ListOutgoingRequestsData, ListMyReviewsData, GetCurrentUserData, FindUserByDisplayNameData, FindUserByDisplayNameVariables, ListReviewsData, UpsertUserData, UpsertUserVariables, CreateItemData, CreateItemVariables, UpdateItemData, UpdateItemVariables, UpdateItemStatusData, UpdateItemStatusVariables, DeleteItemData, DeleteItemVariables, CreateLendingRequestData, CreateLendingRequestVariables, UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables, UpdateUserRatingData, UpdateUserRatingVariables, CreateReviewData, CreateReviewVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListItems(options?: useDataConnectQueryOptions<ListItemsData>): UseDataConnectQueryResult<ListItemsData, undefined>;
export function useListItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListItemsData>): UseDataConnectQueryResult<ListItemsData, undefined>;

export function useGetItem(vars: GetItemVariables, options?: useDataConnectQueryOptions<GetItemData>): UseDataConnectQueryResult<GetItemData, GetItemVariables>;
export function useGetItem(dc: DataConnect, vars: GetItemVariables, options?: useDataConnectQueryOptions<GetItemData>): UseDataConnectQueryResult<GetItemData, GetItemVariables>;

export function useListMyItems(options?: useDataConnectQueryOptions<ListMyItemsData>): UseDataConnectQueryResult<ListMyItemsData, undefined>;
export function useListMyItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyItemsData>): UseDataConnectQueryResult<ListMyItemsData, undefined>;

export function useListIncomingRequests(options?: useDataConnectQueryOptions<ListIncomingRequestsData>): UseDataConnectQueryResult<ListIncomingRequestsData, undefined>;
export function useListIncomingRequests(dc: DataConnect, options?: useDataConnectQueryOptions<ListIncomingRequestsData>): UseDataConnectQueryResult<ListIncomingRequestsData, undefined>;

export function useListOutgoingRequests(options?: useDataConnectQueryOptions<ListOutgoingRequestsData>): UseDataConnectQueryResult<ListOutgoingRequestsData, undefined>;
export function useListOutgoingRequests(dc: DataConnect, options?: useDataConnectQueryOptions<ListOutgoingRequestsData>): UseDataConnectQueryResult<ListOutgoingRequestsData, undefined>;

export function useListMyReviews(options?: useDataConnectQueryOptions<ListMyReviewsData>): UseDataConnectQueryResult<ListMyReviewsData, undefined>;
export function useListMyReviews(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyReviewsData>): UseDataConnectQueryResult<ListMyReviewsData, undefined>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useFindUserByDisplayName(vars: FindUserByDisplayNameVariables, options?: useDataConnectQueryOptions<FindUserByDisplayNameData>): UseDataConnectQueryResult<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;
export function useFindUserByDisplayName(dc: DataConnect, vars: FindUserByDisplayNameVariables, options?: useDataConnectQueryOptions<FindUserByDisplayNameData>): UseDataConnectQueryResult<FindUserByDisplayNameData, FindUserByDisplayNameVariables>;

export function useListReviews(options?: useDataConnectQueryOptions<ListReviewsData>): UseDataConnectQueryResult<ListReviewsData, undefined>;
export function useListReviews(dc: DataConnect, options?: useDataConnectQueryOptions<ListReviewsData>): UseDataConnectQueryResult<ListReviewsData, undefined>;

export function useUpsertUser(options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
export function useUpsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;

export function useCreateItem(options?: useDataConnectMutationOptions<CreateItemData, FirebaseError, CreateItemVariables>): UseDataConnectMutationResult<CreateItemData, CreateItemVariables>;
export function useCreateItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateItemData, FirebaseError, CreateItemVariables>): UseDataConnectMutationResult<CreateItemData, CreateItemVariables>;

export function useUpdateItem(options?: useDataConnectMutationOptions<UpdateItemData, FirebaseError, UpdateItemVariables>): UseDataConnectMutationResult<UpdateItemData, UpdateItemVariables>;
export function useUpdateItem(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateItemData, FirebaseError, UpdateItemVariables>): UseDataConnectMutationResult<UpdateItemData, UpdateItemVariables>;

export function useUpdateItemStatus(options?: useDataConnectMutationOptions<UpdateItemStatusData, FirebaseError, UpdateItemStatusVariables>): UseDataConnectMutationResult<UpdateItemStatusData, UpdateItemStatusVariables>;
export function useUpdateItemStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateItemStatusData, FirebaseError, UpdateItemStatusVariables>): UseDataConnectMutationResult<UpdateItemStatusData, UpdateItemStatusVariables>;

export function useDeleteItem(options?: useDataConnectMutationOptions<DeleteItemData, FirebaseError, DeleteItemVariables>): UseDataConnectMutationResult<DeleteItemData, DeleteItemVariables>;
export function useDeleteItem(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteItemData, FirebaseError, DeleteItemVariables>): UseDataConnectMutationResult<DeleteItemData, DeleteItemVariables>;

export function useCreateLendingRequest(options?: useDataConnectMutationOptions<CreateLendingRequestData, FirebaseError, CreateLendingRequestVariables>): UseDataConnectMutationResult<CreateLendingRequestData, CreateLendingRequestVariables>;
export function useCreateLendingRequest(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLendingRequestData, FirebaseError, CreateLendingRequestVariables>): UseDataConnectMutationResult<CreateLendingRequestData, CreateLendingRequestVariables>;

export function useUpdateLendingRequestStatus(options?: useDataConnectMutationOptions<UpdateLendingRequestStatusData, FirebaseError, UpdateLendingRequestStatusVariables>): UseDataConnectMutationResult<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;
export function useUpdateLendingRequestStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLendingRequestStatusData, FirebaseError, UpdateLendingRequestStatusVariables>): UseDataConnectMutationResult<UpdateLendingRequestStatusData, UpdateLendingRequestStatusVariables>;

export function useUpdateUserRating(options?: useDataConnectMutationOptions<UpdateUserRatingData, FirebaseError, UpdateUserRatingVariables>): UseDataConnectMutationResult<UpdateUserRatingData, UpdateUserRatingVariables>;
export function useUpdateUserRating(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserRatingData, FirebaseError, UpdateUserRatingVariables>): UseDataConnectMutationResult<UpdateUserRatingData, UpdateUserRatingVariables>;

export function useCreateReview(options?: useDataConnectMutationOptions<CreateReviewData, FirebaseError, CreateReviewVariables>): UseDataConnectMutationResult<CreateReviewData, CreateReviewVariables>;
export function useCreateReview(dc: DataConnect, options?: useDataConnectMutationOptions<CreateReviewData, FirebaseError, CreateReviewVariables>): UseDataConnectMutationResult<CreateReviewData, CreateReviewVariables>;
