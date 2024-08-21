import { useState } from "react";
import LoginCSS from "/public/styles/Login.module.css";
import { useLogin, useRegister } from "/src/hooks/user.js";

export default function Login() {

  const [bottomError, setBottomError] = useState()

  const [errors,setErrors] = useState({
    usernameError : '',
    passwordError : ''
  })

  const {
    loading: loginLoading,
    error: loginErrors,
    handleUseLogin,
  } = useLogin();
  const {
    loading: registerLoading,
    error: registerErrors,
    handleUseRegister,
  } = useRegister();
  
  const [form, setForm] = useState({
    username: "",
    password: "",
    check: false,
  });

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setForm((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setErrors(oldvalues =>{
      return{
        ...oldvalues,
        usernameError : '',
        passwordError : ''
      }
    })


    try {
      await handleUseLogin(form);
      if(loginErrors.message){
        setBottomError(loginErrors.message)
      }
      if( loginErrors.username){
        setErrors(oldvalues => {
          return{
            ...oldvalues,
            usernameError : loginErrors.username
          }
        })
      }if(loginErrors.password){
        setErrors(oldvalues => {
          return{
            ...oldvalues,
            passwordError : loginErrors.password
          }
        })
      }
    } catch (error) {
      console.error("Login catch error:", error);  
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    setErrors(oldvalues =>{
      return{
        ...oldvalues,
        usernameError : '',
        passwordError : ''
      }
    })

    try {
      await handleUseRegister(form);
      console.log(registerErrors)
      if( registerErrors && registerErrors.message){
        setBottomError(registerErrors.message)
      }
      if( registerErrors.username){
        setErrors(oldvalues => {
          return{
            ...oldvalues,
            usernameError : registerErrors.username
          }
        })
      }if(registerErrors.password){
        setErrors(oldvalues => {
          return{
            ...oldvalues,
            passwordError : registerErrors.password
          }
        })
      }
    } catch (error) {
      console.error("Register catch error:", error);
    }
  };

  return (
    <div id={LoginCSS.root}>
      <div className={LoginCSS.page}>
        <div className={LoginCSS.main}>
          <div className={LoginCSS.main_content}>
            <div className={LoginCSS.h1_div}>
              <h1>Resume builder</h1>
            </div>

            <form className={LoginCSS.form} onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="username">User name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                className={LoginCSS.input_field}
                onChange={handleChange}
              />
              { errors.usernameError && (
                <p className="error-text">{errors.usernameError}</p>
              )}
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                className={LoginCSS.input_field}
                onChange={handleChange}
              />
              {errors.passwordError && (
                <p className="error-text">{errors.passwordError}</p>
              )}
              <br />
  <div className={LoginCSS.checkboxAndLabel}>
              <input
                type="checkbox"
                id="check"
                name="check"
                checked={form.check}
                onChange={handleChange}
              />
              <label htmlFor="check" className="check_label">
                Remember me
              </label>

              </div>

              <br />
              <div className={LoginCSS.buttons}>
                <button
                  className={LoginCSS.button}
                  onClick={handleLogin}
                  disabled={loginLoading}
                >
                  Sign in
                </button>
                <button
                  className={LoginCSS.button}
                  onClick={handleSignUp}
                  disabled={registerLoading}
                >
                  Sign up
                </button>
              </div>
              <div className={LoginCSS.userNotFound}>
                {bottomError && (
                  <p>
                    {bottomError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
