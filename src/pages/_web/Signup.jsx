import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../../features/Slice";
import axios from "axios";
import {toast} from "react-toastify";
import baseUrl from "../../lib/server";
import {useState} from "react";

const Signup = () => {
  const [userRegInfo, setUserRegInfo] = useState({
    username: "",
    name: "",
  });

  const signupData = {
    username: userRegInfo.username,
    name: userRegInfo.name,
  };

  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = () => {
    fetch(`${baseUrl}/user/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (res.ok) {
          console.log("HTTP request successful");
        } else {
          console.log("HTTP request unsuccessful");
        }
        console.log(res);

        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.msg === "Unauthorized")
          setTimeout(() => {
            navigate("/login");
          }, 3000);

        if (data._id) dispatch(setCurrentUser(data));
      });
  };

  const signUp = () => {
    axios
      .post(`${baseUrl}/user/signup`, signupData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data.token);
        cookies.set("ut", data.data.token);
        if (data.data.token) {
          fetchUser();
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        if (err.response.data.msg === "bad input")
          return toast.error("You should fill out all fields!");

        if (
          err.response.data.msg ===
          "this username already exists in the database"
        )
          return toast.error("This username already exists!");
      });
  };

  return (
    <section className='h-screen'>
      <div className='px-6 h-full text-gray-800'>
        <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
          <div className='grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'>
            <img
              src={"assets/images/JoinUs.png"}
              className='w-[400px]'
              alt='Sample image'
            />
          </div>
          <div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
            <p className='text-lg mb-0 mr-4'>Sign Up now!</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'></div>
              <div className='mb-6'>
                <input
                  value={userRegInfo.username}
                  onChange={(e) =>
                    setUserRegInfo({...userRegInfo, username: e.target.value})
                  }
                  type='text'
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='exampleFormControlInput2'
                  placeholder='Username'
                />
              </div>
              <div className='mb-6'>
                <input
                  value={userRegInfo.name}
                  onChange={(e) =>
                    setUserRegInfo({...userRegInfo, name: e.target.value})
                  }
                  type='text'
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='exampleFormControlInput2'
                  placeholder='Name'
                />
              </div>

              <div className='text-center lg:text-left'>
                <button
                  onClick={signUp}
                  type='button'
                  className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                  Sign Up
                </button>
                <p className='text-sm font-semibold mt-2 pt-1 mb-0'>
                  Already have an account?
                  <Link
                    to={"/login"}
                    className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
