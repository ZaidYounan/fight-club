import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import './Login.css'
import { signIn } from "../../api/auth";
import { useHistory } from "react-router";


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const history = useHistory();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const eMail = value => {
      if (!isEmail(value)) {
        return (
          <div className="alert alert-danger" role="alert">
            This is not a valid email.
          </div>
          //Email validation
        );
      }
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
    
        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            signIn(email, password).then(
              () => {
                setMessage(email + ' has signed in.')
                history.push("/");
                window.location.reload();
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                setLoading(false);
                setMessage(resMessage);
              }
            );
          } else {
            setLoading(false);
          }
        }


return (
    <div className="container">
        <div className="card card-container">
        <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, eMail]}
            />
            </div>

            <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
            />
            </div>

            <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
            </button>
            </div>

            {message && (
            <div className="form-group">
                <div className="alert alert-danger" role="alert">
                {message}
                </div>
            </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </div>
    </div>
    );
};

    export default Login;
    