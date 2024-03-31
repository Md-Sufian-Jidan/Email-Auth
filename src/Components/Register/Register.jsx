import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        event.preventDefault();
        // console.log('form submit');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted, name);
        //reset error and success
        setRegisterError("");
        setSuccess("");

        // add validation
        if (password.length < 6) {
            setRegisterError("Password Should be at least 6 character or longer");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your Password should have one uppercase characters');
            return;
        }
        else if(!accepted){
            setRegisterError('Please Accept Our Terms and Conditions!');
            return;
        }

        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setSuccess('User Created Successfully');

                    // Update Profile
                    updateProfile(result.user, {
                        displayName : name,
                        photoURL : "https://example.com/jane-q-user/profile.jpg",
                    })
                    .then(() => console.log('Profile Updated'))
                    .catch((error) => {
                        console.log(error.message)
                    })
                }
                else {
                    alert("Please verify Your email");
                }
                sendEmailVerification(result.user)
                .then(() => {
                alert("Please check your email and verify yours account");
                })
            })
            .catch((error) => {
                console.log(error);
                setRegisterError(error.message)
            })
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h3 className="text-3xl">Please Register</h3>
                <form onSubmit={handleRegister}>
                    <input className="my-3 w-full py-2 px-4" type="text" name="name" id="" placeholder="Your Name" required />
                    <br />
                    <input className="my-3 w-full py-2 px-4" type="email" name="email" id="" placeholder="Your Email Address" required />
                    <br />
                    <div className="my-3 relative border">
                        <input className="w-full py-2 px-4"
                            type={showPassword ? "text" : "password"}
                            name="password" placeholder="Password" required />
                        {/* password toggel */}
                        <span className="absolute top-3 right-3" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash /> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <br />
                    <div className="mb-3">
                    <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms" className="ml-2">Accept Our <a>Terms And Condition</a></label>
                    </div>
                    <br />
                    <input
                        className="btn btn-secondary my-3 w-full" type="submit" value="Register" name="" id="" />
                </form>
                {
                    registerError && <p className="text-red-700">{registerError}</p>
                }
                {
                    success && <p className="text-green-600">{success}</p>
                }
                <p>All Ready Have an Account? <Link to="/login">Login</Link></p>
            </div>
        </div >
    );
};

export default Register;