import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HiOutlineLocationMarker } from "react-icons/hi";
import LocationModal from "./locationBox";
const navigation = [
  { name: "Health", href: "#", current: false },
  { name: "Medicines & Health Services", href: "#", current: false },
  { name: "Services", href: "#", current: false },
  { name: "About Us", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-200 hover:text-black focus:ring-2 focus:ring-black focus:outline-none">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <h2 className="text-2xl font-bold text-teal ml-2">HAMS</h2>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "hover:border-b-2 border-teal-700 transition"
                          : "text-black hover:border-b-2 border-teal-700 transition",
                        " px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-full bg-white p-1 text-black hover:text-blue-600 focus:ring-2 focus:ring-white focus:outline-none"
              >
                <span className="sr-only">View location</span>
                <HiOutlineLocationMarker className="text-xl" />
              </button>

              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="bg-blue-900 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition">
                    SIGN UP / Register
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-200 text-black"
                    : "text-black hover:bg-gray-100 hover:text-black",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {open && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-4xl max-h-[80vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Popular Cities</h2>
        <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-black">✕</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {Object.entries(cityIcons).map(([city, icon]) => (
          <div
            key={city}
            className="bg-gray-100 hover:bg-yellow-100 rounded-md p-3 text-center cursor-pointer shadow-sm"
          >
            <div className="text-xl mb-1 text-blue-800">{icon}</div>
            <div className="text-sm font-medium text-gray-800">{city}</div>
          </div>
        ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
