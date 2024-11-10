export type Medicine = {
  id: string;
  medicineTitle: string;
  pharmacies: TPharmacie[];
  price: number;
  activeIngredients: string[];
  medicineTypes: string[];
  pharmaGroup: string;
  stockQuantity: number;
  termOfSale: 'Without a prescription' | 'Prescription required';
  tradeName: string;
  category: string;
  countryOfManufacture: string;
  img: string[];
};

export type CartMedicine = {
  quantity: number;
} & Pick<Medicine, 'id' | 'medicineTitle' | 'price' | 'pharmacies'>;

export type TCoordinates = {
  lat: number;
  lng: number;
};

type TPharmacie = {
  name: string;
  price: number;
  filialsCoordinates: TCoordinates[];
};
