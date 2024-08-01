export type TOrderItem = {
  id: string;
  name: string;
  pharmacyId: string;
  quantity: number;
  price: number;
};

export type TOrder = {
  userName: string;
  userUid: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  totalPrice: number;
  orderItems: TOrderItem[];
};
