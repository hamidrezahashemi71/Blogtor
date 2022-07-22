import {Link} from "react-router-dom";
import ReactStars from "react-stars";
import AddComment from "../../components/_web/AddComment";
import Comments from "../../components/_web/Comments";

const SingleBlog = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <>
      <article className='pt-12 px-4'>
        <h1 className='text-4xl text-center mb-4 font-semibold font-heading'>
          The Official Dunder Mifflin Scranton Diary
        </h1>
        <img
          className='rounded-t-lg mx-auto my-2 h-[500px] w-auto'
          src='https://flowbite.com/docs/images/blog/image-1.jpg'
          alt=''
        />
        <p className='text-center'>
          <span>October 22, by</span>
          <Link className='ml-1 text-indigo-600 hover:underline' to='#'>
            Michael Scott
          </Link>
        </p>

        <div className='max-w-3xl mx-auto'>
          <p className='mb-4'>
            We offer a dependable and quick supply of copy paper suited to all
            kinds of printers. Each of our various products is designed to
            provide the finest performance and meet international standards.
          </p>
          <p className='mb-4'>
            We’re dedicated to ensure the highest level of customer satisfaction
            based on long-term professional relationships. By creating the
            positive working environment we’re enabling our employees to
            significantly improve not only their productivity, but what’s more
            important – job satisfaction.
          </p>
          <ul className='mb-4 list-inside list-disc'>
            <li>High durability</li>
            <li>Value-based price</li>
            <li>Perfect performance on copy machines</li>
            <li>Long lasting whiteness</li>
          </ul>
          <p className='mb-10'>
            We deliver our services with passion and dedication unmatched by
            other so called “big players”. We create a friendly environment for
            our workers and that’s what makes their dedication soar to the
            maximum. You are getting not only the best possible product, but
            also our love for paper (completely free of charge).
          </p>
          <blockquote className='text-center mb-10'>
            <p className='text-lg font-semibold mb-2'>
              "I would say I kind of have an unfair advantage, because I watch
              reality dating shows like a hawk, and I learn. I absorb
              information from the strategies of the winners and the losers.
              Actually, I probably learn more from the losers."
            </p>
            <footer className='text-gray-400'>Michael Scott</footer>
          </blockquote>
        </div>
      </article>
      <div className='flex items-center justify-between my-5 px-10 py-5 max-w-3xl mx-auto bg-gray-700 rounded-lg'>
        <div>
          <p className='text-center text-white'>Rating:</p>
          <ReactStars
            count={5}
            edit={false}
            value={4}
            size={24}
            color2={"#ffd700"}
          />
        </div>
        <div>
          <p className='text-center text-white'>Rate This Blog:</p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            color2={"#ffd700"}
          />
        </div>
      </div>
      <AddComment />
      <Comments />
    </>
  );
};

export default SingleBlog;
