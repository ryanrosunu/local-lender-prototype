export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful?: boolean;
  reviewerId: string;
  reviewerName: string;
  reviewedUserId: string;
  reviewedUserName: string;
  lendingRequestId?: string;
}

export interface ReviewFormValues {
  reviewedUserName: string;
  rating: number;
  comment: string;
  lendingRequestId?: string;
}
