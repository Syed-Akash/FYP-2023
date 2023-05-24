import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import sellerAuthContext from "../../Contexts/SellerAuthContext/sellerAuthContext";
import userAuthContext from "../../Contexts/UserAuthContext/userAuthContext";
import classes from "./Signup.module.css";
import { Card, InputField, CustomButton } from "../UI";
import SignupHero from "./SignupHero";
import { useNotification } from "@web3uikit/core";

const Signup = (props) => {
  const redirect = useNavigate();
  const {
    registerSeller,
    sellerError,
    clearSellerErrors,
    isSellerAuthenticated,
  } = useContext(sellerAuthContext);
  const dispatch = useNotification();
  const handleNotification = (message, title) => {
    dispatch({
      type: "info",
      message,
      title,
      position: "topR",
    });
  };
  const { registerUser, error, clearErrors, isUserAuthenticated } =
    useContext(userAuthContext);

  useEffect(() => {
    if (isSellerAuthenticated || isUserAuthenticated) {
      redirect("/");
    }
    if (sellerError) {
      clearSellerErrors();
    } else if (error) {
      clearErrors();
    }
    //eslint-disable-next-line
  }, [sellerError, isSellerAuthenticated, error, isUserAuthenticated]); //,props.history]
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const onSubmitSellerHandler = async (e) => {
    e.preventDefault();
    function validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
    function validatePassword(password) {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return passwordPattern.test(password);
    }
    if (name === "" || email === "" || password === "") {
      // AlertContext.setAlert("Please enter all fields", "danger");
      setAlertMessage("Please enter all fields!");
      setAlertType("danger");
    } else if (!validateEmail(email)) {
      setAlertMessage("Email is invalid");
      setAlertType("danger");
    } else if (!validatePassword(password)) {
      setAlertMessage("Password is invalid");
      setAlertType("danger");
    } else if (password !== password2) {
      // AlertContext.setAlert("Passwords do not match", "danger");
      setAlertMessage("Passwords do not match!");
      setAlertType("danger");
    } else {
      try {
        await registerSeller({ name, email, password });
        handleNotification("Seller Registered Successfully!", "Notification");
        redirect("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    function validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
    function validatePassword(password) {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return passwordPattern.test(password);
    }
    if (name === "" || email === "" || password === "") {
      // AlertContext.setAlert("Please enter all fields", "danger");
      setAlertMessage("Please enter all fields!");
      setAlertType("danger");
    } else if (!validateEmail(email)) {
      setAlertMessage("Email is invalid");
      setAlertType("danger");
    } else if (!validatePassword(password)) {
      setAlertMessage("Password is invalid");
      setAlertType("danger");
    } else if (password !== password2) {
      // AlertContext.setAlert("Passwords do not match", "danger");
      setAlertMessage("Passwords do not match!");
      setAlertType("danger");
    } else {
      try {
        await registerUser({ name, email, password });
        handleNotification("User Registered Successfully!", "Notification");
        redirect("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getAlertStyles = () => {
    switch (alertType) {
      case "success":
        return {
          backgroundColor: "green",
          color: "white",
        };
      case "danger":
        return {
          backgroundColor: "red",
          color: "white",
        };
      default:
        return {};
    }
  };

  return (
    <>
      <div className={classes.signup}>
        <div className={classes.left_section}>
          <Card width="500px" height="650px" padding="0px">
            <div className={classes.form_container}>
              <h1 className={classes.signup_text}>Create Account.</h1>
              <form className={classes.form}>
                <div className={classes.inputs}>
                  <InputField
                    // reference={nameRef}
                    onChange={onChangeHandler}
                    type="name"
                    value={name}
                    label="Name"
                    name="name"
                    placeholder="Name"
                    required
                  />
                  <InputField
                    // reference={nameRef}
                    onChange={onChangeHandler}
                    type="email"
                    value={email}
                    label="Email Address"
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                  <InputField
                    // reference={nameRef}
                    onChange={onChangeHandler}
                    type="password"
                    value={password}
                    label="Password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <InputField
                    // reference={nameRef}
                    onChange={onChangeHandler}
                    type="password"
                    value={password2}
                    label="Confirm Password"
                    name="password2"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className={classes.btn}>
                  {!isUserAuthenticated ? (
                    <CustomButton
                      onClick={onSubmitHandler}
                      label="Create User"
                      disabled={isUserAuthenticated}
                      filled
                    />
                  ) : null}
                  {!isSellerAuthenticated ? (
                    <CustomButton
                      onClick={onSubmitSellerHandler}
                      label="Create Seller"
                      disabled={isSellerAuthenticated}
                      filled
                    />
                  ) : null}
                </div>
                <p className={classes.signup_para}>
                  Already a user?<NavLink to="/login"> Log In</NavLink>
                </p>
                {alertMessage && (
                  <div style={getAlertStyles()}>{alertMessage}</div>
                )}
                {/* <div className={classes.btn}>
                  <CustomButton
                    onClick={onSubmitSellerHandler}
                    label="Sign Up"
                    // filled
                  />
                </div> */}
              </form>
            </div>
          </Card>
        </div>

        <div className={classes.right_section}>
          <SignupHero />
        </div>
      </div>
    </>
  );
};

export default Signup;
