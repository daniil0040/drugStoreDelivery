export type Store = {
  id: number;
  companyName: string;
  coordinates: {
    lat: number;
    lang: number;
  };
  infoWindow: string;
};
