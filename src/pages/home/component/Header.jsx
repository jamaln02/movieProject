import { Button } from "@material-tailwind/react";
import React from "react";

const HomeHeader = () => {
  return (
    <div className="my-10 container mx-auto">
      <div className="text-light-blue-500 md:text-4xl text-2xl uppercase font-bold text-center ">
        home
      </div>
      <div className="flex md:justify-between justify-center items-center md:text-lg text-xs font-medium md:w-full container mx-auto flex-wrap flex-col md:flex-row">
        <div className="w-1/3 md:ms-10">
          <h1 className="md:text-2xl text-lg font-bold mb-5 text-center">
            Sort By
          </h1>
          <div className="flex flex-row md:justify-evenly justify-center md:mx-2 md:flex-wrap ">
            <div>
              {" "}
              <Button
                className="m-1 dark:text-white dark:border-white"
                variant="outlined"
              >
                Title
              </Button>
              <Button
                className="m-1 dark:text-white dark:border-white"
                variant="outlined"
              >
                Poplarity
              </Button>
            </div>
            <div>
              <Button
                className="m-1 dark:text-white dark:border-white"
                variant="outlined"
              >
                Date
              </Button>
              <Button
                className="m-1 dark:text-white dark:border-white"
                variant="outlined"
              >
                Ratin
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/3 md:w-1/3">
          <h1 className="md:text-2xl text-lg font-bold mb-5 text-center">
            Sort order
          </h1>
          <div className="flex flex-row md:justify-evenly justify-center md:flex-wrap ">
            <Button
              className="m-1 dark:text-white dark:border-white"
              variant="outlined"
            >
              Descingin
            </Button>
            <Button
              className="m-1 dark:text-white dark:border-white"
              variant="outlined"
            >
              Ascending
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
