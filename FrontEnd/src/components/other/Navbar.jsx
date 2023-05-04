import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import React from "react";
import Dropdown from "./Dropdown";
import DropdownAccount from "./DropdownAccount";
import Notification from "./Notification";

const Navbar = () => {
  return (
    <Disclosure as="nav" className="" style={{background: "#009900"}}>
      {({ open }) => (
        <>
          <div className="max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    {/* <div className="hidden h-8 w-auto lg:block">Fellox</div> */}
                    <div className="mx-auto mb-2 h-10 w-52 text-white items-center text-center text-4xl font-bold" >Fellox</div>

                  </Link>
                </div>
                {/* <div
                  style={{ marginTop: "15px " }}
                  className="hidden sm:ml-6 sm:block"
                >
                  <div className="flex space-x-4">
                    <Dropdown icon={true} name={"Các không gian làm việc"} />
                  </div>
                </div> */}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Notification /> 
                <DropdownAccount />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
