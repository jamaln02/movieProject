import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import { FaRegMoon } from "react-icons/fa";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { FiSun } from "react-icons/fi";

function NavList() {
  return (
    <List className=" mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as={Link}
        to={"/"}
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 pr-4 text-lg">
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
        <ListItem className="flex items-center gap-2 pr-4 text-lg">
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
        <ListItem className="flex items-center gap-2 pr-4 text-lg">
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
        <ListItem className="flex items-center gap-2 pr-4 text-lg">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export function Header() {
  const [openNav, setOpenNav] = useState(false);

  const [brTheme, setBrTheme] = useState(true);
  console.log(brTheme);

  function setDarkTheme() {
    localStorage.theme = "dark";
    setBrTheme(!brTheme);
  }

  function setLightTheme() {
    localStorage.theme = "light";
    setBrTheme(!brTheme);
  }

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
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="gradient" size="sm" fullWidth>
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
      </Collapse>
    </Navbar>
  );
}
