import {Link} from "react-router-dom";
import moment from "moment";
import baseUrl from "../../lib/server";

const UserCard = ({user}) => {
  return (
    <Link to={"/users/:id"}>
      <div className='rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 mx-2 bg-blue-500 hover:bg-blue-700 transition ease-in-out delay-150 '>
        <img src='https://i.imgur.com/dYcYQ7E.png' className='w-full' />
        <div className='flex justify-center -mt-8'>
          <img
            src={
              user.avatar == ""
                ? "assets/images/user.png"
                : `${baseUrl}/${user.avatar}`
            }
            className='rounded-full border-solid border-white border-2 -mt-3 h-24'
          />
        </div>
        <div className='text-center px-3 pb-6 pt-2'>
          <h3 className='text-white text-sm bold font-sans'>{user.name}</h3>
          <h3 className='text-white text-sm bold font-sans'>{`Username: ${user.username}`}</h3>
          <p className='mt-2 font-sans font-light text-white'>
            {user.bio === "" ? `${user.name} has not added any bio.` : user.bio}
          </p>
        </div>
        <div className='flex justify-center pb-3 text-white'>
          <div className='text-center mr-3 border-r pr-3'>
            <h2>{moment(user.createdAt, "YYYYMMDD").fromNow()}</h2>
            <span>Joined</span>
          </div>
          <div className='text-center'>
            <h2>{user.averageScore}</h2>
            <span>Rate</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
