import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext.jsx";
import toast from "react-hot-toast";
import { ClimbingBoxLoader } from "react-spinners";
import backgroundImg from "../../assets/backgroundImg.png";

const Login = () => {
  const { signInWithGoogle, signInUser, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const form = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDemoCredentials = (role) => {
    if (role === "user") {
      setUserEmail("user@test.com");
      setPassword("Asd@1234");
      toast.success("Demo User credentials filled");
    }

    if (role === "admin") {
      setUserEmail("admin@test.com");
      setPassword("Asd@1234");
      toast.success("Demo Admin credentials filled");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userEmail || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    signInUser(userEmail, password)
      .then((res) => {
        toast.success("Login Successful");
        navigate(location.state ? location.state : "/");
        form.current.reset();
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password");
        } else {
          toast.error("Login failed. Please try again");
        }
      });
  };

  const handleGoogleSignin = () => {
    if (googleLoading) return;

    setGoogleLoading(true);

    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        setUser({
          displayName: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        });
        toast.success("Google Sign-in successful!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google sign-in failed");
      })
      .finally(() => {
        setGoogleLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  return (
    <div
      className="w-11/12 mx-auto flex md:flex-row flex-col-reverse justify-evenly items-center gap-4"
      style={{ backgroundImage: `url('${backgroundImg}')` }}
    >
      <section className="flex-1 text-center max-w-[100vh] h-screen py-5 place-content-center-safe place-items-center-safe space-y-6">
        <h1 className="text-3xl md:text-6xl font-black text-[rgb(26,30,33)]">
          Welcome Back
        </h1>
        <p className="text-[0.9rem] text-black md:text-lg">
          Login to begin your food journey
        </p>
      </section>
      <section className="flex-1 py-5 place-items-center-safe">
        <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-[#fffaf0]">
          <div className="card-body">
            <p className="font-bold text-2xl mb-4">Login</p>

            <form
              ref={form}
              onSubmit={handleLogin}
              className="space-y-4 bg-[#fff6c8]"
            >
              <fieldset className="fieldset rounded-box w-full border p-7">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input rounded-2xl p-6"
                  name="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Email"
                />

                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    className="input rounded-2xl p-6"
                    placeholder={show ? "Password" : "******"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-[18px] top-[32px] text-2xl cursor-pointer z-50"
                  >
                    {show ? <FaEye /> : <IoEyeOff />}
                  </span>
                </div>

                <Link
                  to="/forgetpassword"
                  state={userEmail}
                  className="link link-hover"
                >
                  Forgot password?
                </Link>

                <button className="btn btn-neutral rounded-2xl mt-4 px-6">
                  Login
                </button>

                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-16 bg-slate-800"></div>
                  <span className="text-sm">or</span>
                  <div className="h-px w-16 bg-slate-800"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="btn bg-white text-black border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>{" "}
                  Login with Google
                </button>
              </fieldset>
            </form>

            <div className="text-center">
              Don't have an account?
              <Link
                to="/signup"
                className="link link-hover text-blue-400 hover:text-blue-600"
              >
                {" "}
                Sign Up
              </Link>
            </div>

            <div className="flex gap-3 justify-center mb-3">
              <button
                type="button"
                onClick={() => handleDemoCredentials("user")}
                className="btn btn-outline btn-sm rounded-xl"
              >
                👤 Demo User
              </button>

              <button
                type="button"
                onClick={() => handleDemoCredentials("admin")}
                className="btn btn-outline btn-sm rounded-xl"
              >
                🛠 Demo Admin
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
