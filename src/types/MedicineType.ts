export type Medicine = {
  id: string;
  medicineTitle: string;
  pharmacy: string;
  price: number;
};

export type CartMedicine = {
  quantity: number;
} & Medicine;
