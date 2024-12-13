export interface Payment {
  id: number;
  user_id: number;
  amount: string;
  origin: string;
  trace_number: string;
  count: number;
  status: number;
  model: string;
  model_id: string;
  created_at: string;
  updated_at: string;
  payment_uuid: string;
  unique_id: string;
}

export interface PaymentsResponse {
  success: boolean;
  data: Payment[];
}
