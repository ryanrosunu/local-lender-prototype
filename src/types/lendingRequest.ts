export type LendingRequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface LendingRequest {
  id: string;
  requestedAt: string;
  status: LendingRequestStatus;
  borrowerNotes: string;
  startDate?: string;
  endDate?: string;
  itemId: string;
  itemTitle: string;
  borrowerId: string;
  borrowerName: string;
  lenderId: string;
}

export interface LendingRequestFormValues {
  borrowerNotes: string;
  startDate?: string;
  endDate?: string;
}
