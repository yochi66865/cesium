export interface Shop {
  id?: string;
  name?: string;
  address?: string;
  coordinates?: {
    x: number;
    y: number;
    z: number;
  };
}
