export type TOrderItem = {
  id: string;
  name: string;
  pharmaciesIds: string[];
  quantity: number;
  price: number;
};

export type TOrder = {
  uid: string;
  userName: string;
  userUid: string | null;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  totalPrice: number;
  orderItems: TOrderItem[];
  deliveryStatus:
    | 'Placed'
    | 'Packing'
    | 'Awaiting shipment'
    | 'In transit'
    | 'Out for delivery'
    | 'Deliveried'
    | 'Returned'
    | 'Canceled';
  orderId: string;
};
