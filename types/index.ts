import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  // isDisabled: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  addLimit?: (limit: number) => void;
}

export interface SearchBarProps {
  setManufacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
  selected?: string;
  setSelected?: (selected: string) => void;
};

interface Options {
  title: string | number;
  value: string | number;
};

export interface CustomFilterProps {
  title: string;
  options: Array<Options>;
  // la méthode ci dessous fonctionne bien mais avec un erreur TS, je la garde en cas de problèmes
  // options: Array<T>;
  setFilter?: (filter: any) => void;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
  selected: string;
  setSelected: (selected: string) => void;
}

export interface CarCardProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarCardProps;
};

export interface FilterProps {
  manufacturer: string,
  model: string,
  year: any,
  fuel: string,
  limit: number
}

export interface ShowMoreProps {
  pageNumber: number,
  isNext: boolean;
  setLimit?: (limit: number) => void;
}

//ici je définis le typage des props d'un élément réutilisable, ci dessus, l'élément CustomButton
