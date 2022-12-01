import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import { RiImageAddFill } from "react-icons/ri";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useToken from "../../Hooks/useToken";

const Registeration = () => {
  // show password state
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState("password");

  const [registerUserEmail, setRegisterUserEmail] = useState("");
  const [token] = useToken(registerUserEmail);

  // firebase error state
  const [firebaseError, setFirebaseError] = useState("");

  const {
    setLoading,
    continueWithGoogle,
    createUserWithEmailAndPass,
    userProfileUpdate,
  } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  // sign up with google
  const signUpWithGoogle = () => {
    setLoading(true);
    continueWithGoogle()
      .then((result) => {
        toast.success("Sign in Account Successfully");
        setLoading(false);
        const user = result.user;
        fetch("https://buy-sell-server-khaki.vercel.app/userCollection", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email,
            name: user?.displayName,
            image: user?.photoURL,
            role: "buyer",
            verified: "false",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.acknowledged) {
              setRegisterUserEmail(user?.email);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        setFirebaseError(error.message);
        setLoading(false);
      });
    setFirebaseError("");
  };

  // create user
  const createUser = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImageKey}`,
      { method: "POST", body: formData }
    )
      .then((res) => res.json())
      .then((img) => {
        if (img.success) {
          const image = img.data.url;

          createUserWithEmailAndPass(data.email, data.password)
            .then((result) => {
              userProfileUpdate(data.name, image);

              const users = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                image: img.data.url,
                verified: "false",
              };
              fetch("https://buy-sell-server-khaki.vercel.app/userCollection", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(users),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.acknowledged) {
                    setLoading(false);
                    setRegisterUserEmail(users?.email);
                    toast.success("Account Created Successful", {
                      duration: 1500,
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log(users);
            })
            .catch((error) => {
              setLoading(false);
              setFirebaseError(error.message);
            });
          setFirebaseError("");
        }
      });
  };

  if (token) {
    navigate(from, { replace: true });
    setLoading(false);
  }

  return (
    <div>
      <section>
        <div className="flex flex-col items-center justify-center sm:px-6 py-8 animationContainer mx-auto   lg:py-0">
          <div
            className={`w-full rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md customAnimation xl:p-0 border-gray-700`}
          >
            {firebaseError && (
              <p className=" text-center text-red-400 font-semibold">
                {firebaseError
                  .replaceAll("Firebase:", " ")
                  .replaceAll("Error", " Error:")
                  .replaceAll("(auth/", " ")
                  .replaceAll("email", "Email")
                  .replaceAll(")", "")}
              </p>
            )}
            <div className="p-6 pt-2 space-y-4 md:space-y-6 ">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign Up
              </h1>

              <form
                onSubmit={handleSubmit(createUser)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=" Your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 font-semibold flex items-center gap-1 mt-1">
                      <FaTimes /> {errors.name?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Chose your role
                  </label>
                  <select
                    id="role"
                    className="bg-gray-50 border font-bold border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    {...register("role")}
                  >
                    <option value="buyer" defaultValue>
                      Buyer
                    </option>
                    <option value="seller">Seller</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 font-semibold flex items-center gap-1 mt-1">
                      <FaTimes /> {errors.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="flex  relative items-center">
                    <input
                      type={showPassword}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
                          message:
                            "password must have uppercase , lowercase , number & special character",
                        },
                        minLength: {
                          value: 6,
                          message: "Password should be at least 6 characters",
                        },
                      })}
                    />

                    <div
                      onClick={() => setShow(!show)}
                      className="absolute cursor-pointer right-2"
                    >
                      {show ? (
                        <FaEye
                          onClick={() => setShowPassword("password")}
                          className="text-gray-400  "
                        />
                      ) : (
                        <FaEyeSlash
                          onClick={() => setShowPassword("text")}
                          className="text-gray-400  "
                        />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 font-semibold flex items-center gap-1 mt-1">
                      {errors.password.message && <FaTimes className="mt-1" />}
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                <div>
                  {/* <label
                    htmlFor="photo"
                    className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 flex-col  flex items-center font-bold  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600   w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {
                      <>
                        <RiImageAddFill className="w-7 h-7" />
                        <h1>Upload Image </h1>
                      </>
                    }
                  </label> */}
                  <input
                    type="file"
                    name="image"
                    className="w-full border border-gray-300 p-3 rounded-md"
                    accept="image/*"
                    id="photo"
                    {...register("image", { required: "Photo is required" })}
                  />
                  {errors.image && (
                    <p className="text-red-500 font-semibold flex items-center gap-1 mt-1">
                      <FaTimes /> {errors.image?.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400   dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>

                <p className="text-sm font-light text-gray-500-400">
                  Already have an account?
                  <Link to="/login" className="font-medium   hover:underline  ">
                    Login here
                  </Link>
                </p>
              </form>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-400 before:mt-0.5 after:flex-1 after:border-t after:border-gray-400 after:mt-0.5">
                <p className="text-center text-gray-300  font-bold mx-4 mb-0">
                  Or
                </p>
              </div>
              <div>
                <button
                  onClick={signUpWithGoogle}
                  className=" w-full py-2 flex justify-center items-center gap-1 px-1 text-gray-500 border-gray-500 rounded-lg  hover:bg-gray-700 hover:text-white transition-all border"
                >
                  <FcGoogle className="text-xl lg:text-2xl" />
                  <span>Sign up with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registeration;
