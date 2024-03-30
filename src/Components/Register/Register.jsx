import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";

const Register = () => {
    const [registerError , setRegisterError] = useState("");
    const [success , setSuccess] = useState("");

    const handleRegister = (e) => {
        event.preventDefault();
        console.log('form submit')
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email , password);
        //reset error
        setRegisterError("");
        setSuccess("");

        if(password.length < 6){
            setRegisterError("Password Should be at least 6 character or longer");
            return;
        }

        //create user
        createUserWithEmailAndPassword(auth , email , password)
        .then((result)=>{
            console.log(result.user);
            setSuccess('User Created Successfully');
        })
        .catch((error)=>{
            console.log(error);
            setRegisterError(error.message)
        })
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2">
            <h3 className="text-3xl">Please Register</h3>
                <form onSubmit={handleRegister}>
                    <input className="my-3 w-3/4 py-2 px-4" type="email" name="email" id="" placeholder="Your Email Address" required/>
                    <br />
                    <input 
                    className="my-3 w-3/4 py-2 px-4"
                    type="password" name="password" placeholder="Password" required/><br />
                    <input 
                    className="btn btn-secondary my-3 w-3/4" type="submit" value="Register" name="" id="" />
                </form>
                {
                    registerError && <p className="text-red-700">{registerError}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
            </div>
        </div>
    );
};

export default Register;