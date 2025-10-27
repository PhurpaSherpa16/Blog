"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";
import BlogCard from "../components/blog-card";
import { useAuthorBlogs, useBlogs } from "@/lib/RealtimeBlogFetch";
import Link from "next/link";
import Loading from "../components/admin/Loading";
import CompleteProfile from "../components/admin/CompleteProfile";

export default function AdminPage() {
  const { user, loading, userData} = useAuth();
  const blog = useAuthorBlogs(user?.uid)
  const router = useRouter();
  
  useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
  }, [loading, user]);
  
  if (!user || !blog || loading)
    return (
    <div className="absolute -left-[30%] w-[130%] h-screen">
      <Loading/>
    </div>
  );

  if(!userData) return <CompleteProfile/>


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
    <div className="admin-padding-inLine py-8 md:py-16 w-full">
      <div className="grid gap-8">
        <div className="flex justify-between items-center">
          <h1>Welcome, <br /><span className="uppercase">{userData?.fullName}</span></h1>
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
    </div>
  );
}