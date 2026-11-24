import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useState } from "react";
import { UserRound, Lock, LogIn } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/users");

      const normalizedEmail = email.trim().toLowerCase();
      const user = response.data.find(
        (item) =>
          item.email?.trim().toLowerCase() === normalizedEmail &&
          item.password === password
      );

      if (user) {
        dispatch(loginUser(user));
        alert("Login successful!");
        navigate("/");
        window.location.reload();
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed! Make sure the server is running on port 3000.");
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#151515] p-8 rounded-2xl border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            CHANGARATH <span className="text-yellow-400">MART</span>
          </h1>
          <p className="text-gray-400 mt-3">Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-white text-sm">Email Address</label>
            <div className="flex items-center gap-3 bg-[#222] border border-white/10 rounded-lg px-4 mt-2">
              <UserRound className="text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-3 text-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <div className="flex items-center gap-3 bg-[#222] border border-white/10 rounded-lg px-4 mt-2">
              <Lock className="text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-3 text-white outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Don't have an account?
          <Link to="/register" className="text-yellow-400 ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
