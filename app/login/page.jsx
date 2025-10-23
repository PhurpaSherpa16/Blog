"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "../components/auth/AuthContext";
import { loginWithGoogle } from "@/lib/firebaseAuth";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const {user, setUser} = useAuth()

  console.log(user, 'login page')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleLoginWithGoogle = async () =>{
    const loggedUser = await loginWithGoogle()
    if (loggedUser) {setUser(loggedUser)}
  }

  if(user){
    router.push("/admin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400">{error}</p>}
        <button className="bg-blue-600 hover:bg-blue-700 py-2 rounded">Login</button>
      </form>
      <button onClick={handleLoginWithGoogle} className="btn">
          Login with Google
        </button>
        <Link href={'/register'}>Create Account</Link>
    </div>
  );
}
