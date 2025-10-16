import Image from "next/image";
import BlogCard from "./components/blog-card";
import BlogFetch, { getBlogById }  from "../lib/blogFetch";

export default async function Home() {
  const blogs = await BlogFetch()

  return (
    <div className="flex gap-8">
      {blogs.map((item, index)=>(
        <div key={index}>
          <BlogCard blog={item}/>
        </div>
      ))}
    </div>
  );
}
