import {useState} from "react";
import Search from "../../components/_web/Search";
import UserCard from "../../components/_web/UserCard";
import Loading from "../../components/_general/Loading";

const Users = () => {
  const [loading, setLoading] = useState(false);

  if (loading) return <Loading />;
  return (
    <>
      <Search />
      <div className='flex flex-wrap p-10 mx-auto '>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </>
  );
};

export default Users;
