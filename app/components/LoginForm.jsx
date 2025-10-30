"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "../components/auth/AuthContext";
import { loginWithGoogle } from "@/lib/firebaseAuth";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io"
import { IoLogIn } from "react-icons/io5";
import Loading from '@/public/LoadingElephant.json'
import Lottie from 'lottie-react';

export default function LoginForm({setLoginRegister}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const {user, setUser} = useAuth()


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError('')
    if(email==='' || password ===''){
        setError('Please confirm all filed are filled.')
        setLoading(false)
        return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
        setError("Invalid credentials");
    }
    finally{
        setLoading(false)
    }
  };

  const handleLoginWithGoogle = async () =>{
    try {
      const loggedUser = await loginWithGoogle();
      if (loggedUser) {
        setUser(loggedUser);
      }
    } catch (error) {
      setError("Google login failed");
    }
  }


  useEffect(() => {
      if (user) {
        router.push("/admin");
      }
  }, [user]);
  

  const handlePasswordShow = () =>{
    setPasswordShow((p)=>!p)
  }

  return (
    <div className="w-full lg:pt-24 2xl:pt-42 flex justify-center lg:justify-end relative">
        <div className="relative overflow-hidden flex flex-col items-center gap-6 justify-center 
        bg-[var(--whiteBlack)] border borderColor px-4 md:px-16 py-8 rounded-lg shadow-lg">
          {error &&
          <div className="absolute top-5 bg-[var(--background)] border borderColor p-2 rounded-lg">
            <div className="flex-center gap-2">
               <p className="text-red-400">{error}</p>
              <IoMdCloseCircle onClick={()=>setError('')} className="cursor-pointer"/>
            </div>
          </div>
          }
          <div className="flex-col flex-center">
            <h1 className="text-2xl md:text-4xl tracking-wider">Welcome Back</h1>
            <span className="text-[var(--textColor)]">Secure access to your account</span>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
            <div>
              <div className="full flex-center relative h-fit overflow-hidden">
                <input
                type="email"
                placeholder="you@example.com"
                className="relative p-2 rounded border borderColor tracking-wider px-10 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <div className="h-fit w-fit absolute left-2">
                  <FaUser className="h-6 w-6"/>
                </div>
              </div>
              <span className="text-[var(--textColor)] text-sm">Use the same email you registered with</span>
            </div>
            <div className="full flex-center relative h-fit overflow-hidden">
              <input
              type={passwordShow ? 'text' : 'password'} 
              placeholder="••••••••"
              className="relative p-2 rounded border borderColor tracking-widest px-10 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <div className="h-fit w-fit absolute left-2">
                <FaLock className="h-6 w-6"/>
              </div>

              <div className="h-fit w-fit absolute right-2 text-[var(--textColor)] hover:text-[var(--flat)]
              cursor-pointer">
                {passwordShow ? 
                <FaEye className="h-6 w-6" onClick={handlePasswordShow}/>
                :
                <FaEyeSlash className="h-6 w-6" onClick={handlePasswordShow}/>
                }
              </div>
            </div>
            <div className="w-full flex flex-col">
                {loading ? 
                <div className="flex-center">
                    <Lottie className='h-20 w-20 md:h-20 md:w-20 lg:h-20 lg:w-20' animationData={Loading} loop={true} />
                </div>
                    :
                <button className="bg-blue-600 hover:bg-blue-700 py-2 rounded text-white
                cursor-pointer flex-center gap-1 hover:shadow transition-all duration-200">
                    Continue
                    <IoLogIn className="h-6 w-6"/>
                </button>
                }
            </div>
          </form>
          <div className="grid w-full gap-4 items-center justify-center">
            <button onClick={handleLoginWithGoogle} className="flex-center gap-1 cursor-pointer">
              or, Login with <FcGoogle className="h-6 w-6"/>
            </button>
            <div className="flex-center flex-col w-full">
              <span className='text-center'>Don't have account? <button type="button"
              className="text-[var(--blue)] cursor-pointer hover:text-[var(--flat)]"
              onClick={()=>setLoginRegister(false)}>
              Let's create!</button></span>
              <Link href={'/'} className="text-[var(--textColor)] cursor-pointer hover:text-[var(--flat)]">Forget Password? </Link>
            </div>
          </div>
        </div>
    </div>
  )
}
