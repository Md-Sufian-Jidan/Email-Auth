import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState();
    const [success, setSuccess] = useState();
    const emailRef = useRef();

    const handleLogin = (e) => {
        event.preventDefault();
        const email = e.target.email?.value;
        const password = e.target.password?.value;
        console.log(email, password);

        //reset error and success
        setErrorMessage("");
        setSuccess("");

        //app validation
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setSuccess('You Login Successfully')
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
            })
    };
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log("Please Provide an email", emailRef.current.value);
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log("Please Write a valid email")
            return;
        }

        //send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("Please Check Your Email")
        })
        .catch((error) => {
            console.log(error);
        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a onClick={handleForgetPassword}
                                    href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        errorMessage && <p className="text-xl text-red-700">{errorMessage}</p>
                    }
                    {
                        success && <p className="mx-5 text-2xl text-green-700">{success}</p>
                    }
                    <p className="text-center my-3">New to This Website? Please <NavLink to="/register">Register</NavLink> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;