import {useState, useEffect} from "react";
import Loading from "../../components/_general/Loading";
import baseUrl from "../../lib/server";
import {useSelector} from "react-redux";
import {userSelect} from "../../features/Slice";
import Cookies from "universal-cookie";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
  const [userEditData, setUserEditData] = useState({
    name: "",
    avatar: "",
    bio: "",
  });
  const currentUser = useSelector(userSelect);
  const [file, setFile] = useState(null);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/user/singleUser/${currentUser._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setUserEditData({
          ...userEditData,
          name: data.name,
          bio: data.bio,
          avatar: data.avatar,
        })
      )
      .then(setLoading(false));
  }, []);

  const submitAvatar = async () => {
    try {
      if (!file) return;

      // console.log(file);

      const formData = new FormData();
      formData.append("avatar", file);

      fetch(`${baseUrl}/user/update-avatar`, {
        method: "POST",
        headers: {
          auth: `ut ${cookies.get("ut")}`,
        },
        body: formData,
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log("lol");
    }
  };

  const editProfile = () => {
    fetch(`${baseUrl}/user/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        name: userEditData.name,
        bio: userEditData.bio,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        submitAvatar();
        // console.log(data);
      })
      .then(toast.success("Your profile has been updated successfully!"))
      .then(navigate("/dashboard"));
  };

  if (loading) return <Loading />;
  return (
    <>
      <form className='pt-12 px-12 ml-52' onSubmit={(e) => e.preventDefault()}>
        <p className='text-3xl text-center text-blue-700 text- pt-10 mx-auto mb-5'>
          Edit Your Profile
        </p>
        <div className='flex items-center justify-center mb-5'>
          <div className='shrink-0'>
            <img
              src={`${baseUrl}/${currentUser.avatar}`}
              onError={(e) => (e.target.src = "/assets/images/user.png")}
              className='aspect-square object-cover cursor-pointer w-28 h-28 rounded-full '
              alt='Avatar'
            />
          </div>
        </div>
        <label htmlFor='name' className='sr-only'>
          Name
        </label>
        <div className='flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700'>
          <input
            id='file'
            type='file'
            className='hidden'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className='text-center'>
            <label htmlFor='file' className='cursor-pointer text-black'>
              <svg
                aria-hidden='true'
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                  clipRule='evenodd'></path>
              </svg>
            </label>
          </div>

          <textarea
            value={userEditData.name}
            onChange={(e) =>
              setUserEditData({...userEditData, name: e.target.value})
            }
            id='name'
            rows='1'
            className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Name ... '></textarea>
          <button
            onClick={editProfile}
            type='submit'
            className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'>
            <svg
              aria-hidden='true'
              className='w-6 h-6 rotate-90'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
            </svg>
            <span className='sr-only'>Send message</span>
          </button>
        </div>
        <textarea
          value={userEditData.bio}
          onChange={(e) =>
            setUserEditData({...userEditData, bio: e.target.value})
          }
          className='mt-5 rounded w-full p-2 resize-none mb-5'
          rows={10}
          placeholder='My bio ...'></textarea>
      </form>
    </>
  );
};

export default EditProfile;
