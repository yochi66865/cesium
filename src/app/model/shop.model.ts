export interface Shop {
  id?: string;
  name?: string;
  city?: string;
  address?: string;
  coordinates?: {
    x: number;
    y: number;
    z: number;
  };
}
