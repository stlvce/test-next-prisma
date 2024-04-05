import { RegisterOptions } from "react-hook-form";

export interface ITechCharacteristics {
  car_id: number;
  brand: string;
  model: string;
  productionYear: number;
  body: string;
  mileage: number;
}

export interface IOption {
  option_name: string;
}

export interface ICar {
  id: number;
  images?: FileList;
  name: string;
  description: string;
  price: number;
  contacts: string;
  technical_characteristics?: ITechCharacteristics;
  options?: IOption[];
}
