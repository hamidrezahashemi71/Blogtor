import {Link} from "react-router-dom";

const UserCard = () => {
  return (
    <Link to={"/users/:id"}>
      <div className='rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 mx-2 bg-blue-500 hover:bg-blue-700 transition ease-in-out delay-150 '>
        <img src='https://i.imgur.com/dYcYQ7E.png' className='w-full' />
        <div className='flex justify-center -mt-8'>
          <img
            src={"assets/images/user.png"}
            className='rounded-full border-solid border-white border-2 -mt-3 h-24'
          />
        </div>
        <div className='text-center px-3 pb-6 pt-2'>
          <h3 className='text-white text-sm bold font-sans'>Olivia Dunham</h3>
          <p className='mt-2 font-sans font-light text-white'>
            Hello, i'm from another the other side!
          </p>
        </div>
        <div className='flex justify-center pb-3 text-white'>
          <div className='text-center mr-3 border-r pr-3'>
            <h2>5</h2>
            <span>Blogs</span>
          </div>
          <div className='text-center'>
            <h2>3.5</h2>
            <span>Rate</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
