import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { sellerAuthContext, userAuthContext } from "../../Contexts";
import { InputField, CustomButton } from "../UI";
import classes from "./Login.module.css";
import LoginHero from "./LoginHero";
import { useNotification } from "@web3uikit/core";
import axios from "axios";

const Login = () => {
  const redirect = useNavigate();
  const { loginSeller, sellerError, clearSellerErrors, isSellerAuthenticated } =
    useContext(sellerAuthContext);
  const { login, error, clearErrors, isUserAuthenticated } =
    useContext(userAuthContext);
  const dispatch = useNotification();
  const handleNotification = (message, title) => {
    dispatch({
      type: "info",
      message,
      title,
      position: "topR",
    });
  };
  useEffect(() => {
    if (isUserAuthenticated || isSellerAuthenticated) {
      redirect("/");
    }

    if (sellerError) {
      clearSellerErrors();
    } else if (error) {
      clearErrors();
    }
    //eslint-disable-next-line
  }, [sellerError, error, isSellerAuthenticated, isUserAuthenticated]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChangeHandler = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitSellerHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      handleNotification("Please enter all fields!", "Notification");
    } else {
      await loginSeller({ email, password });
      axios
        .post("/api/seller/login", { email, password })
        .then((response) => {
          handleNotification(response.data.message);
          redirect("/");
        })
        .catch((error) => {
          handleNotification(error.response.data.message);
        });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      handleNotification("Please enter all fields!", "Notification");
    } else {
      await login({ email, password });
      axios
        .post("/api/user/login", { email, password })
        .then((response) => {
          handleNotification(response.data.message);
          redirect("/");
        })
        .catch((error) => {
          handleNotification(error.response.data.message);
        });
    }
  };

  return (
    <>
      <div className={classes.login_section}>
        <div className={classes.left_section}>
          <LoginHero />
        </div>
        <div className={classes.right_section}>
          <h1 className={classes.login_text}>Log in</h1>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes.inputs}>
              <InputField
                type="email"
                onChange={onChangeHandler}
                value={email}
                label="Email Address"
                name="email"
                placeholder="Email Address"
                required
              />
              <InputField
                type={showPassword ? "text" : "password"}
                onChange={onChangeHandler}
                value={password}
                label="Password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className={classes.checkbox_container}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className={classes.checkBox}
              />
              <label className={classes.showPasswordLabel}>Show Password</label>
            </div>
            <div className={classes.btn}>
              {!isUserAuthenticated ? (
                <CustomButton
                  onClick={onSubmitHandler}
                  disabled={isUserAuthenticated}
                  label="User Log In"
                  filled
                />
              ) : null}
              {!isSellerAuthenticated ? (
                <CustomButton
                  onClick={onSubmitSellerHandler}
                  label="Seller Log In"
                  disabled={isSellerAuthenticated}
                  filled
                />
              ) : null}
            </div>
            <p className={classes.login_para}>
              Don&apos;t have an account?{" "}
              <NavLink to="/signup">Create an Account</NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
