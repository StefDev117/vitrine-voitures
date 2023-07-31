"use client";

import { useRouter } from "next/navigation";
import {useState} from "react";
import { ShowMoreProps } from "@/types";
import {CustomButton} from "@/components";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {
    const router = useRouter();

    const [newPageNumber, setnewPageNumber] = useState(1);
    
    const handleNavigation = () => {
        // const newLimit = (newPageNumber) * 10;
        const newLimit = (pageNumber + 1) * 10;
        // const newPathName = updateSearchParams("limit", `${newLimit}`);
        // router.push(newPathName);
        if(setLimit) {

          setLimit(newLimit);
        }
    };

  return (

    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton
            title="Show More"
            btnType="button"
            containerStyles="bg-primary-blue rounded-full text-white"
            handleClick={handleNavigation}
            // handleClick={(e) => {setnewPageNumber(newPageNumber + 1); handleNavigation()}}
            />
        )}
    </div>
  );
};

export default ShowMore;
