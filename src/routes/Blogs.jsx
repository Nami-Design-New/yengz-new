import React from "react";
import useBlogsList from "../hooks/blogs/useBlogsList";
import SectionHeader from "../ui/SectionHeader";
import DataLoader from "../ui/DataLoader";
import BlogCard from "../ui/cards/BlogCard";
import EmptyData from "../ui/EmptyData";

const Blogs = () => {
  const { isLoading, data: blogs } = useBlogsList();
  return (
    <>
      <SectionHeader />
      {isLoading ? (
        <DataLoader />
      ) : (
        <section className="blogs">
          <div className="container">
            <div className="row">
              {blogs?.length > 0 ? (
                blogs?.map((blog) => (
                  <div className="col-lg-4 col-md-6 col-12 p-2" key={blog?.id}>
                    <BlogCard blog={blog} />
                  </div>
                ))
              ) : (
                <EmptyData>Sorry, there are no blogs right now.</EmptyData>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Blogs;
