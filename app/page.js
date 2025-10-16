import Image from "next/image";
import BlogCard from "./components/blog-card";
import BlogFetch, { getBlogById }  from "../lib/blogFetch";

export default async function Home() {
  const blogs = await BlogFetch()

  if(!blogs){
      return <div className='container mx-auto py-8'>Post dont have data</div>
  }

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
