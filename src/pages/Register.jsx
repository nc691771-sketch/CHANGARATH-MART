import { useState } from "react";
import { UserRound, Mail, Lock, UserPlus } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/users", {
        name,
        email: email.trim().toLowerCase(),
        password,
      });

      alert("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log("Registration failed:", error);
      alert("Cannot register. Make sure the server is running on port 3000.");
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#151515] p-8 rounded-2xl border border-white/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            CHANGARATH <span className="text-yellow-400">MART</span>
          </h1>
          <p className="text-gray-400 mt-3">Create your new account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-white text-sm">Full Name</label>
            <div className="flex items-center gap-3 bg-[#222] border border-white/10 rounded-lg px-4 mt-2">
              <UserRound className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent py-3 text-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm">Email Address</label>
            <div className="flex items-center gap-3 bg-[#222] border border-white/10 rounded-lg px-4 mt-2">
              <Mail className="text-gray-400" size={20} />
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
                placeholder="Create a password"
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
            <UserPlus size={20} />
            Create Account
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?
          <Link to="/login" className="text-yellow-400 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
