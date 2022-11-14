import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  UserName: yup.string().required(),
  UserFirstName: yup.string().required(),
  UserLastName: yup.string().required(),
  UserPassword: yup.string().min(6).max(15).required(),
  ConfirmPassword: yup.string().oneOf([yup.ref("UserPassword"), null]),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const saveUserDetails = (data) => {
    console.log({
      userName: data["UserName"],
      userFirstName: data["UserFirstName"],
      userLastName: data["UserLastName"],
      userPassword: data["UserPassword"],
    });

    axios
      .post("http://localhost:9099/registerNewUser", {
        userName: data["UserName"],
        userFirstName: data["UserFirstName"],
        userLastName: data["UserLastName"],
        userPassword: data["UserPassword"],
      })
      .then((res) => {
        console.log(res);
        localStorage.isLoggedIn = true;
        window.location = "/";
        alert("Signup Successful");
      })
      .catch((e) => {
        console.log(e);
        alert("Signup Failed");
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form onSubmit={handleSubmit(saveUserDetails)}>
                <h2 className="login">Create new account</h2>

                <div className="form-group">
                  <label>Username: </label>
                  <input
                    placeholder="Enter username"
                    type="text"
                    name="UserName"
                    className="form-control"
                    {...register("UserName")}
                  />
                </div>
                <p className="error-message">{errors["UserName"]?.message}</p>

                <div className="form-group">
                  <label>First Name: </label>
                  <input
                    placeholder="Enter your first name"
                    type="text"
                    name="UserFirstName"
                    className="form-control"
                    {...register("UserFirstName")}
                  />
                </div>
                <p className="error-message">
                  {errors["UserFirstName"]?.message}
                </p>

                <div className="form-group">
                  <label>Last Name: </label>
                  <input
                    placeholder="Enter your last name"
                    type="text"
                    name="UserLastName"
                    className="form-control"
                    {...register("UserLastName")}
                  />
                </div>
                <p className="error-message">
                  {errors["UserLastName"]?.message}
                </p>

                <div className="form-group">
                  <label>Password: </label>
                  <input
                    placeholder="Enter password"
                    type="password"
                    name="UserPassword"
                    className="form-control"
                    {...register("UserPassword")}
                  />
                </div>
                <p className="error-message">
                  {errors["UserPassword"]?.message}
                </p>
                <div className="form-group">
                  <label>Confirm Password: </label>
                  <input
                    placeholder="Enter password"
                    type="password"
                    name="confpassword"
                    className="form-control"
                    {...register("ConfirmPassword")}
                  />
                </div>
                <p className="error">
                  {errors.ConfirmPassword && "Passwords Should Match!"}
                </p>

                <div className="SubmitButton">
                  <button className="loginSuccess" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
