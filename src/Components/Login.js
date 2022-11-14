import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { yupResolver }from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";

const schema = yup.object().shape({
    "Username": yup.string().required(),
    "Password": yup.string().min(6).required()
});

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const saveLoginDetails = (data) => {
        console.log(data["Company Name"]);
       
        axios.post("http://localhost:9099/authenticate",{

        userName : data["Username"],
        userPassword : data["Password"],


        })
            .then(res => {
                console.log(res);
                localStorage.token=res.data.jwtToken
                localStorage.isLoggedIn = true;
                window.location = "/";
                alert("Login Successful")
            })
            .catch(e => {console.log(e)
            alert("Login Failed")});
            
    };


    return(            
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(saveLoginDetails)}>
                                <h2 className="login">Login to your account</h2>
                                <div className="form-group">
                                    <label>Username: </label>
                                    <input placeholder="Enter username" type="text" name="userName" className="form-control" {...register('Username')} />
                                    <p className="error-message">{ errors['Username']?.message }</p>
                                </div>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input placeholder="Enter password" type="password" name="password" className="form-control" {...register('Password')} />
                                    <p className="error-message">{ errors['Password']?.message }</p>
                                </div>
                                <div className="SubmitButton">
                                    <button className="loginSuccess" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}