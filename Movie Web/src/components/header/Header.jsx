import React, { useState, useRef } from "react"
import "./header.css"
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Chọn chủ đề CSS mà bạn muốn sử dụng
import 'primereact/resources/primereact.min.css';
import { oauthService } from "../../services/oauthService.js";
import { Toast } from 'primereact/toast';

const Header = () => {
  const [Mobile, setMobile] = useState(false)
  const toastBR = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleRegister, setVisibleRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataUser, setDataUser] = useState();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const showBottomRight = (message) => {
    toastBR.current.show({ severity: 'success', summary: '', detail: message, life: 2000 });
  }
  const showBottomRightErr = (message) => {
    toastBR.current.show({ severity: 'error', summary: '', detail: message, life: 2000 });
  }

  const handleLogin = () => {
    let params = {
      email: email,
      password: password
    }
    oauthService.login(params).then(res => {
      const token = res?.data?.data.token;
      if (token) {
        setDataUser(res?.data.data)
        showBottomRight(res?.data.message)
        setVisible(false);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', res?.data?.data.userId);
      }
      else {
        showBottomRightErr("Login fail!")
      }
    })
  };

  const handleSubmit = () => {
    // Tạo FormData từ dữ liệu form
    let paramsRegister = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address
    }

    oauthService.signup(paramsRegister).then(res => {
      if (res.status == 201) {

        showBottomRight(res?.data.message)
        setVisibleRegister(false);
        resetForm();
      }
      else {
        if (res?.data?.message)
          showBottomRightErr(res?.data?.message)
        else
          showBottomRightErr("Register user fail")
      }
    })
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setAddress('');
  };

  const handleHide = () => {
    resetForm();
    setVisibleRegister(false);
  };

  const clearToken = () => {
    localStorage.setItem('authToken', null);
    localStorage.setItem('userId', null);
    window.location.reload()
  }

  return (
    <>
      <Toast ref={toastBR} position="bottom-right" />
      <header>
        <div className='container flexSB'>
          <nav className='flexSB'>
            <div className='logo'>
              <img src='./images/logo.png' alt='' />
            </div>
            {/*<ul className='flexSB'>*/}
            <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
              <li>
                <a href='/'>Home</a>
              </li>

              <li>
                <a href='/'>Movies</a>
              </li>
              {/* <li>
                <a href='/'>Pages</a>
              </li>
              <li>
                <a href='/'>Pricing</a>
              </li>
              <li>
                <a href='/'>Contact</a>
              </li> */}
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
          <div className='account flexSB'>
            <i className='fa fa-user-times' style={{ cursor: 'pointer' }} onClick={clearToken}></i>
            {dataUser?.name ?
              <span>
                Hello {dataUser.name}
              </span> :
              <>
                <i title="Login" style={{ cursor: 'pointer' }} className='fa fa-user' onClick={() => setVisible(true)}></i>
                <i title="Register" style={{ cursor: 'pointer' }} className='fa fa-user-plus' onClick={() => setVisibleRegister(true)}></i>
              </>
            }

          </div>
        </div>
      </header>

      <Dialog style={{ width: '30%', height: '250px' }} header="Login" visible={visible} onHide={() => setVisible(false)}>
        <div className="p-grid" style={{ margin: '2rem' }}>
          <div className="p-col-12" style={{ marginBottom: '1rem' }}>
            <span className="p-float-label">
              <InputText style={{ width: '100%', lineHeight: '30px' }} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="p-col-12" style={{ marginBottom: '1rem' }}>
            <span className="p-float-label">
              <InputText style={{ width: '100%', lineHeight: '30px' }} id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: 'auto', padding: '10px' }} label="Login" onClick={handleLogin} />
        </div>
      </Dialog>

      <Dialog style={{ width: '30%', height: '450px' }} header="Register" visible={visibleRegister} onHide={handleHide}>
        <div className="p-grid" style={{ margin: '2rem' }}>
          <div className="p-col-12" style={{ marginBottom: '1rem' }}>
            <span className="p-float-label">
              <InputText
                style={{ width: '100%', lineHeight: '30px' }}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Name</label>
            </span>
          </div>

          <div className="p-col-12" style={{ marginBottom: '1rem' }}>
            <span className="p-float-label">
              <InputText
                style={{ width: '100%', lineHeight: '30px' }}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>

          <div className="p-col-12" style={{ marginBottom: '1rem' }}>
            <span className="p-float-label">
              <InputText
                style={{ width: '100%', lineHeight: '30px' }}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </span>
          </div>

          <div className="p-col-12" style={{ marginBottom: '1rem' }}>
            <span className="p-float-label">
              <InputText
                style={{ width: '100%', lineHeight: '30px' }}
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="phone">Phone</label>
            </span>
          </div>

          <div className="p-col-12" style={{ marginBottom: '1rem' }}>
            <span className="p-float-label">
              <InputText
                style={{ width: '100%', lineHeight: '30px' }}
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label htmlFor="address">Address</label>
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ margin: 'auto', padding: '10px' }} label="Submit" onClick={handleSubmit} />
        </div>
      </Dialog>
    </>

  )
}

export default Header
