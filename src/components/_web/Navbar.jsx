import {Fragment} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import * as AiIcons from "react-icons/ai";
import Cookies from "universal-cookie";
import {useSelector} from "react-redux";
import {userSelect} from "../../features/Slice";

const Navbar = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const currentUser = useSelector(userSelect);

  const navigation = [
    {name: "Home", to: "/", current: true},
    {name: "Blogs", to: "/blogs", current: false},
    {name: "Users", to: "/users", current: false},
    {name: "Dashboard", to: "/dashboard", current: false},
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const logout = () => {
    cookies.remove("ut", {path: "/"});
    window.location.reload(false);
    navigate("/");
  };
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({open}) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <AiIcons.AiOutlineClose
                      className='block h-6 w-6'
                      aria-hidden='true'
                    />
                  ) : (
                    <AiIcons.AiOutlineMenu
                      className='block h-6 w-6'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='block lg:hidden h-8 w-auto'
                    src={"/assets/images/logo.png"}
                    alt='Blogtor'
                  />
                  <img
                    className='hidden lg:block h-8 w-25'
                    src={"/assets/images/logo-white.png"}
                    alt='Blogtor'
                  />
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                {currentUser ? (
                  <>
                    <Menu as='div' className='ml-3 relative'>
                      <div>
                        <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='h-8 w-8 rounded-full'
                            src={"assets/images/user.png"}
                            alt='user'
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({active}) => (
                              <Link
                                to={"/dashboard/profile"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}>
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({active}) => (
                              <Link
                                to='#'
                                onClick={logout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}>
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>
                    <div className='sm:block sm:ml-6'>
                      <div className='flex space-x-4'>
                        <Link
                          to={"/login"}
                          className={
                            "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          }>
                          Login
                        </Link>
                        <Link
                          to={"/signup"}
                          className={
                            "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          }>
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
