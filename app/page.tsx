"use client";

import Image from "next/image";
import { CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import {CarCard} from "@/components";
import { useEffect, useState } from "react";

export default function Home() {

  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);

  //search states

  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(10);

  const addLimit = () => {
    setLimit(limit  + 10);
  }

  const getCars = async () => {

    setLoading(true);
    

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        model: model || "",
        year: year || "",
        fuel: fuel || "",
        limit: limit || 10
      });
      
      setAllCars(result);  
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    getCars();
  }, [manufacturer, model, fuel, year, limit])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear}/>
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex flex-center">
                <Image 
                src="/steering-wheel.svg"
                alt="loader"
                width={50}
                height={50}
                className="object-contain"
                />
              </div>
            )}
              <ShowMore 
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
              />
          </section>
        ) : (
          <div className="home_error-container min-h-[140px]">
            <h2 className="text-black text-xl">Oups, no results, try again eee</h2>
            {/* <p>{allCars?.message}</p> */}
          </div>
        )}
      </div>
    </main>
  );
}
