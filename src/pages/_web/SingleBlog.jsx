import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import ReactStars from "react-stars";
import NotFound from "../../components/_general/NotFound";
import Loading from "../../components/_general/Loading";
import baseUrl from "../../lib/server";
import AddComment from "../../components/_web/AddComment";
import Comments from "../../components/_web/Comments";
import moment from "moment";
import Cookies from "universal-cookie";
import {toast} from "react-toastify";

const SingleBlog = () => {
  const [snigleBlog, setSingleBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState("");
  const params = useParams();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}/blog/single-blog/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg === "Unexpected token u in JSON at position 0") {
          setNotFound(true);
        }
        setSingleBlog(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/comment/by-blog/${snigleBlog._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [comments]);

  const submitRate = (newRating) => {
    if (!cookies.get("ut"))
      return toast.warn("Only Blogtor users can submit ratings!");
    fetch(`${baseUrl}/blog/submit-rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        blogId: params.id,
        score: Number(newRating),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        return toast.success("Thanks for contributing!");
      });
  };

  const commentBlog = () => {
    if (!cookies.get("ut"))
      return toast.warn("Only Blogtor users can submit comments!");
    fetch(`${baseUrl}/comment/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("ut")}`,
      },
      body: JSON.stringify({
        blogId: String(snigleBlog._id),
        text: myComment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg === "Unauthorized")
          return toast.warn("for submiting a comment, please login first.");
        if (data.msg === "bad request: bad inputs")
          return toast.error("Field cannot be empty!");
        if (data.msg === "ok")
          return toast.success("Your comment added successfully!");
      })
      .then(setMyComment(""));
  };

  if (loading) return <Loading />;
  if (notFound) return <NotFound />;
  // console.log(snigleBlog);
  return (
    <>
      <article className='pt-12 px-4'>
        <h1 className='text-4xl text-center mb-4 font-semibold font-heading'>
          {snigleBlog.title}
        </h1>
        <img
          className='rounded-t-lg mx-auto my-2 h-[500px] w-auto'
          src={
            snigleBlog.imgurl === ""
              ? "/assets/images/blog-image.webp"
              : snigleBlog.imgurl
          }
          alt=''
        />
        <p className='text-center'>
          <span>{`${moment(snigleBlog.createdAt).format(
            "dddd, MMMM Do YYYY"
          )} , by`}</span>
          <Link
            className='ml-1 text-indigo-600 hover:underline'
            to={`/users/${snigleBlog.creator._id}`}>
            {snigleBlog.creator.name}
          </Link>
        </p>

        <div
          className='max-w-3xl mx-auto text-center mt-3'
          dangerouslySetInnerHTML={{__html: snigleBlog.content}}></div>
      </article>
      <div className='flex items-center justify-between my-5 px-10 py-5 max-w-3xl mx-auto bg-gray-700 rounded-lg'>
        <div>
          <p className='text-center text-white'>Rating:</p>
          <ReactStars
            count={5}
            edit={false}
            value={snigleBlog.averageScore}
            size={24}
            color2={"#ffd700"}
          />
        </div>
        <div>
          <p className='text-center text-white'>Rate This Blog:</p>
          <ReactStars
            count={5}
            onChange={submitRate}
            size={24}
            color2={"#ffd700"}
          />
        </div>
      </div>
      <AddComment
        commentBlog={commentBlog}
        myComment={myComment}
        setMyComment={setMyComment}
      />
      <Comments comments={comments} />
    </>
  );
};

export default SingleBlog;
