export type Medicine = {
  id: number;
  medicineTitle: string;
  pharmacy: string;
  price: number;
};

export type CartMedicine = {
  quantity: number;
} & Medicine;
