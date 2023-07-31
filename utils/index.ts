
import { CarCardProps } from "@/types";
import { FilterProps } from "@/types";
import { useRouter } from "next/navigation";

export async function fetchCars(filters: FilterProps) {

  const {manufacturer, model, year, limit, fuel} = filters;
  //il faut copier les headers de notre compte(ceux ci dessus)
  const headers = {
    "X-RapidAPI-Key": "26fe4166e2msh8c482a1b1d4e213p1bb14cjsnbc867cdd8e2d",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
  // ?model=corolla
  //ceci sera mon endpoint pour chercher une voiture particulière
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImagesUrl = (car: CarCardProps, angle? : string) => {
  //key in comments: hrjavascript-mastery
  const url = new URL("https://cdn.imagin.studio/getimage");
  const {make, year, model} = car;
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
}
// cette fonction fait une sorte d'appel API qui renvoie l'image du modèle en question

export const updateSearchParams = (type: string, value: any) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${
    window.location.pathname
  }?${searchParams.toString()}`;

  return newPathname;
};