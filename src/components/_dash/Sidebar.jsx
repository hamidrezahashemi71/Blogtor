import {Link, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {useSelector} from "react-redux";
import {userSelect} from "../../features/Slice";
import baseUrl from "../../lib/server";

const Sidebar = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const currentUser = useSelector(userSelect);

  const logout = () => {
    cookies.remove("ut", {path: "/"});
    window.location.reload(false);
    navigate("/");
  };

  return (
    <div
      className='w-60 h-full shadow-md bg-gray-800 absolute'
      id='sidenavSecExample'>
      <div className='pt-4 pb-2 px-6'>
        <Link to='#!'>
          <div className='flex items-center'>
            <div className='shrink-0'>
              <img
                src={
                  currentUser.avatar == ""
                    ? "assets/images/user.png"
                    : `${baseUrl}/${currentUser.avatar}`
                }
                className='rounded-full w-10'
                alt='Avatar'
              />
            </div>
            <div className='grow ml-3'>
              <p className='text-sm font-semibold text-blue-600'>
                {currentUser.name}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <ul className='relative px-1'>
        <li className='relative'>
          <Link
            className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out'
            to={"/"}
            data-mdb-ripple='true'
            data-mdb-ripple-color='primary'>
            <span>Home</span>
          </Link>
        </li>
      </ul>
      <hr className='my-2' />
      <ul className='relative px-1'>
        <li className='relative'>
          <Link
            className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out'
            to={"/dashboard/write"}
            data-mdb-ripple='true'
            data-mdb-ripple-color='primary'>
            <span>Post Blog</span>
          </Link>
        </li>
        <li className='relative'>
          <Link
            className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out'
            to={"/dashboard/myblogs"}
            data-mdb-ripple='true'
            data-mdb-ripple-color='primary'>
            <span>My Blogs</span>
          </Link>
        </li>
        <li className='relative'>
          <Link
            className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out'
            to={"/dashboard/profile"}
            data-mdb-ripple='true'
            data-mdb-ripple-color='primary'>
            <span>My Profile</span>
          </Link>
        </li>
        <li className='relative'>
          <p
            className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden cursor-pointer text-white text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out'
            onClick={logout}
            data-mdb-ripple='true'
            data-mdb-ripple-color='primary'>
            <span>Sign Out</span>
          </p>
        </li>
      </ul>
      <div className='text-center bottom-0 absolute w-full'>
        <hr className='m-0' />
        <p className='py-2 text-sm text-white'>Blogtor</p>
      </div>
    </div>
  );
};

export default Sidebar;
