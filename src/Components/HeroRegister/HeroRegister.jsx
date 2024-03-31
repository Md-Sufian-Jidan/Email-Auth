import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";

const HeroRegister = () => {
    const [success , setSuccess] = useState();
    const [errorMessage , setErrorMessage] = useState();
    const handleRegister = (e) => {
        event.preventDefault();
        // console.log('from submit2');
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        //reset error
        setErrorMessage("");
        setSuccess("");

        //password validation
        if(password.length < 6){
            setErrorMessage("Password should be at least 6 characters longer!!!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const loggedIn = result.user;
                console.log(result.user);
                setSuccess(loggedIn);
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error.message);
            });
    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required/>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
                    {
                        errorMessage && <p className="text-red-700">{errorMessage}</p>
                    }
                    {
                        success && <p className="text-green-500 text-2xl">User Account created successfully</p>
                    }
            </div>
        </div>
    );
};

export default HeroRegister;