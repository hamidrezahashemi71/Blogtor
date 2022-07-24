import {useState, useEffect} from "react";
import Search from "../../components/_web/Search";
import UserCard from "../../components/_web/UserCard";
import Loading from "../../components/_general/Loading";
import baseUrl from "../../lib/server";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      <Search />
      <div className='flex flex-wrap p-10 mx-auto '>
        {allUsers.length === 0 ? (
          <p className='font-semibold text-center text-xl text-blue-700'>
            There are no users yet!
          </p>
        ) : (
          allUsers.map((user) => {
            return <UserCard key={user._id} user={user} />;
          })
        )}
      </div>
    </>
  );
};

export default Users;
