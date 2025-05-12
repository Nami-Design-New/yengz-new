import React from "react";
import { Link } from "react-router";
import { formattedDate } from "../../utils/helpers";

function BlogCard({ blog }) {
  return (
    <Link to={`/blogs/${blog?.id}`} className="blog-card" data-aos="fade-up">
      {blog?.image && (
        <div className="">
          <img src={blog?.image} alt={blog?.name} />
        </div>
      )}
      <div className="data">
        <h5 className="title">{blog?.name}</h5>
        {blog?.description && (
          <p className="description">{blog?.description}</p>
        )}
        <div className="date">
          <i className="fa-duotone fa-calendar-days"></i>
          <span>{formattedDate(blog?.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
