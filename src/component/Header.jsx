import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaRegMoon } from "react-icons/fa";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieSearchResults,
  getSeriesSearchResults,
  handleSearch,
} from "../redux-system/redux-slices/searchSlice";

const SearchMenu = ({ children, listOpen, inputValue }) => {
  const { movieSearchResults } = useSelector((state) => state.searchResult);
  const { seriesSearchResults } = useSelector((state) => state.searchResult);
  return (
    <Menu>
      <MenuHandler>{children}</MenuHandler>
      {inputValue !== "" && (
        <div>
          {movieSearchResults && (
            <MenuList className="max-h-72 max-w-sm bg-gray-300 dark:bg-gray-500 text-gray-800 font-semibold">
              {movieSearchResults &&
                movieSearchResults
                  ?.filter((element, index) => index < 6)
                  ?.map((ele, ind) => (
                    <MenuItem key={ind}>
                      <Link to={`/movie/${ele.id}/title/${ele.title}`}>
                        <div className="flex items-center justify-evenly  p-2">
                          <div className="rounded-full w-1/3">
                            {ele?.poster_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.poster_path}`}
                                alt=""
                                className="rounded-full w-2/3 h-16"
                              />
                            ) : (
                              <img
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.backdrop_path}`}
                                alt=""
                                className="rounded-full w-2/3 h-16"
                              />
                            )}
                          </div>
                          <div className="w-2/3">
                            <span className="uppercase">movie : </span>
                            {ele?.title}
                          </div>
                        </div>
                      </Link>
                    </MenuItem>
                  ))}
              {seriesSearchResults &&
                seriesSearchResults
                  ?.filter((element, index) => index < 6)
                  .map((ele, ind) => (
                    <MenuItem key={ind}>
                      <Link to={`/tv/${ele.id}/name/${ele.name}`}>
                        <div className="flex items-center justify-evenly  p-2">
                          <div className="rounded-full w-1/3">
                            {ele?.poster_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.poster_path}`}
                                alt=""
                                className="rounded-full w-2/3 h-16"
                              />
                            ) : (
                              <img
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.backdrop_path}`}
                                alt=""
                                className="rounded-full w-2/3 h-16"
                              />
                            )}
                          </div>
                          <div className="w-2/3">
                            <span className="uppercase">series : </span>
                            {ele?.name}
                          </div>
                        </div>
                      </Link>
                    </MenuItem>
                  ))}
            </MenuList>
          )}
        </div>
      )}
    </Menu>
  );
};

function NavList() {
  return (
    <List className=" mt-2 mb-1 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as={Link}
        to={"/"}
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 pe-4 text-lg">
          Home
        </ListItem>
      </Typography>
      <Typography
        as={Link}
        to={"/movies"}
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 pe-4 text-lg">
          movies
        </ListItem>
      </Typography>
      <Typography
        as={Link}
        to={"/series"}
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 pe-4 text-lg">
          series
        </ListItem>
      </Typography>

      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 pe-4 text-lg">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export function Header() {
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = useState(false);
  const [brTheme, setBrTheme] = useState(true);
  const { inputValue } = useSelector((state) => state.searchResult);
  const { listOpen } = useSelector((state) => state.searchResult);

  function setDarkTheme() {
    localStorage.theme = "dark";
    setBrTheme(!brTheme);
  }

  function setLightTheme() {
    localStorage.theme = "light";
    setBrTheme(!brTheme);
  }

  useEffect(() => {
    dispatch(getMovieSearchResults(inputValue));
    dispatch(getSeriesSearchResults(inputValue));
  }, [inputValue]);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, [brTheme]);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 bg-gray-300 bg-opacity-60  fixed z-10">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Movie Mania
        </Typography>
        <div className="hidden items-center gap-x-2 lg:flex">
          <div className="relative flex w-full gap-2 md:w-max">
            <SearchMenu listOpen={listOpen} inputValue={inputValue}>
              <Input
                value={inputValue}
                onChange={(e) => dispatch(handleSearch(e))}
                type="search"
                label=""
                placeholder="Search"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                className=" !border-t-blue-gray-300 ps-9 placeholder:text-blue-gray-100 focus:!border-blue-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </SearchMenu>
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="#CFD8DC"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="#CFD8DC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <Link to={`/search/for/${inputValue}`}>
            <Button size="sm" className="rounded-lg p-3 bg-light-blue-500">
              Search
            </Button>
          </Link>
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button variant="gradient" size="sm">
            Log In
          </Button>
          <div
            className="p-2 cursor-pointer text-2xl "
            onClick={brTheme ? setLightTheme : setDarkTheme}
          >
            {brTheme ? <FiSun /> : <FaRegMoon />}
          </div>
        </div>

        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />

        <div className="flex flex-nowrap items-center gap-4 lg:hidden">
          <Button variant="gradient" size="sm" className="px-8 py-3 my-2">
            Log In
          </Button>
          <div className="p-2 cursor-pointer text-2xl ">
            {brTheme ? (
              <FiSun onClick={setLightTheme} />
            ) : (
              <FaRegMoon onClick={setDarkTheme} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
          <div className="relative w-full gap-2 md:w-max">
            <SearchMenu listOpen={listOpen} inputValue={inputValue}>
              <Input
                onChange={(e) => dispatch(handleSearch(e))}
                type="search"
                placeholder="Search"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                className=" !border-t-blue-gray-300 ps-9 placeholder:text-blue-gray-100 focus:!border-blue-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </SearchMenu>
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="#CFD8DC"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="#CFD8DC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <Link to={`/search/for/${inputValue}`}>
            <Button
              size="md"
              className="mt-1 rounded-lg sm:mt-0 bg-light-blue-500"
            >
              Search
            </Button>
          </Link>
        </div>
      </Collapse>
    </Navbar>
  );
}
