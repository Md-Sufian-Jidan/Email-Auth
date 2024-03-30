
const Register = () => {
    const handleRegister = (e) => {
        event.preventDefault();
        console.log('form submit')
        const email = e.target.email.value;
        const password = e.target.email.value;
        console.log(email , password);
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2">
            <h3 className="text-3xl">Please Register</h3>
                <form onSubmit={handleRegister}>
                    <input className="my-3 w-3/4 py-2 px-4" type="email" name="email" id="" placeholder="Your Email Address"/>
                    <br />
                    <input 
                    className="my-3 w-3/4 py-2 px-4"
                    type="password" name="password" placeholder="Password"/><br />
                    <input 
                    className="btn btn-secondary my-3 w-3/4" type="submit" value="Register" name="" id="" />
                </form>
            </div>
        </div>
    );
};

export default Register;