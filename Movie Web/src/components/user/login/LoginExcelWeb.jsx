import './login.scss';
import React, { useEffect, useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { oauthService } from '../../../services/oauthService.js';
//import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const LoginExcelWeb = () => {

  const [cookies, setCookie] = useCookies([]);
  //const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({});

  const defaultValues = {
    email: '',
    password: '',
    keep_login: false
  }

  useEffect(() => {
    if (message !== null) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const onSubmit = (data) => {
    setFormData(data);
    oauthService.login(data).then(res => {
      const token = res?.data?.access_token;
      if (token) {
        oauthService.getUser(token)
          .then(res => {
            const role = res.data.role;
            setCookie("token", token, {
              path: "/"
            });
            setCookie("role", role, {
              path: "/"
            });
            if (role.includes('admin')) {
              //navigate('editdashboard');
            }
            else {
              //navigate('dashboard');
            }
          })
          .catch(error => {
            console.log(error)
            setMessage('Login fail')
          })
      }
      else {
        setMessage('Login fail')
      }
    }).catch(e => {
      if (e.response?.status === 401) {
        setMessage(e.response?.data.message)
      } else {
        setMessage('Try again')
      }
    })
  };

  const handleRegister = () => {
    //navigate('/signup');
  }

  const handleForgotPW = () => {
    //navigate('/password/forgot');
  }

  return (
    <div className='login-page'>
      <div className='login-box'>
        <Card>
          <div className='card-body login-card-body'>
            <div>
              <div className='login-card-body-header'>
                Login
              </div>
              <div className='login-card-body-header-content '>
                See your growth and get consulting support!
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
              <div className="field">
                <span className="p-label">
                  <label htmlFor="email" className={classNames({ 'p-error': errors.email }, 'field-name-label')}>Email address</label>
                  <Controller name="email" control={control} rules={{ required: 'Email address is required' }} render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} type='email' autoFocus className={classNames({ 'p-invalid': fieldState.invalid }, 'place-holder-style')} placeholder='Email' />
                  )} />
                </span>
                {getFormErrorMessage('email')}
              </div>

              <div className="field">
                <span className="p-label">
                  <label htmlFor="password" className={classNames({ 'p-error': errors.password }, 'field-name-label')}>Password</label>
                  <Controller name="password" control={control} rules={{ required: 'Password is required' }} render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} type='password' className={classNames({ 'p-invalid': fieldState.invalid }, 'place-holder-style')} placeholder='Enter password' />
                  )} />
                </span>
                {getFormErrorMessage('password')}
              </div>

              <div className='d-flex justify-content-between'>
                <div className="field-checkbox">
                  <Controller name="keep_login" control={control} render={({ field, fieldState }) => (
                    <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid }, 'checkbox-box')} />
                  )} />
                  <label htmlFor="keep_login" className={classNames({ 'p-error': errors.accept }, 'checkbox-text')}>Remember me</label>
                </div>

                <div className='forgot-pw-text' onClick={handleForgotPW}>
                  Forgot password
                </div>
              </div>

              <Button type='submit' className="discord d-flex justify-content-center" aria-label="login">
                <span className='login-btn'>Login</span>
              </Button>

              {message != null ? <div className="alert alert-danger mt-3" role="alert">
                {message}
              </div> : null}
            </form>

            <div className='d-flex flex-row justify-content-center' style={{ marginTop: '24px', marginBottom: '24px' }}>
              <hr style={{ width: '61px', height: '2px' }} />
              <span className='txt-fs12'>
                Or continue with email
              </span>
              <hr style={{ width: '61px', height: '2px' }} />
            </div>

            <div>
              <a className="login-email-btn d-flex justify-content-center" aria-label="loginByEmail">
                <span className='login-email-text '>
                  <i className="pi pi-google" ></i>
                  &nbsp;
                  <span className='txt'>Google</span>
                </span>
              </a>
            </div>

            <div className='d-flex flex-row justify-content-center' style={{ marginTop: '65px', fontSize: '16px' }}>
              <span>Don’t have an account? </span>
              &nbsp;
              <span style={{ color: '#2B79F7', cursor: 'pointer' }} onClick={handleRegister}>Register</span>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}
export default LoginExcelWeb;