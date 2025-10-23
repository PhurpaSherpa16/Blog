"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";
import BlogCard from "../components/blog-card";
import { useAuthorBlogs, useBlogs } from "@/lib/RealtimeBlogFetch";
import Link from "next/link";

export default function AdminPage() {
  const { user, loading, logout, userData} = useAuth();
  const blog = useAuthorBlogs(user?.uid)
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);
  
  
  if (loading)
    return (
  <div className="flex items-center justify-center min-h-screen">
        Checking authentication...
      </div>
    );
    
    if (!user || !userData || !blog)
      return (
    <div className="flex items-center justify-center min-h-screen">
        Redirecting...
      </div>
    );


    if (blog.length<1){
      return (
        <div className="flex items-center justify-center min-h-screen gap-1">
        <span>No, post please</span>
        <span className="text-blue-500 font-bold">
           <Link href={'/admin/posts'}>Add Some Post</Link>
        </span>
      </div>
      )
    }
    

  return (
    <div className="admin-padding-inLine admin-padding-block w-full">
        <div className="flex justify-between items-center">
        <h1>Welcome, <span className="uppercase">{userData.fullName}</span></h1>
        </div>
        <div className="w-full">
          <span>Recent Posts</span>
          <div className="cardDiv gap-8 w-full">
            {
              blog.map((blog, index)=>(
                <div key={index}>
                  <BlogCard blog={blog}/>
                </div>
              ))
            }
          </div>
        </div>

    </div>
  );
}
