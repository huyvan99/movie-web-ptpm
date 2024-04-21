import React, { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [cookie, setCokkie, removeCookie] = useCookies(["token", "role"]);
  const navigate = useNavigate();

  useEffect(() => {
    removeCookie('token', { path: '/' });
    removeCookie('role', { path: '/' });
    navigate('/');
  }, [])

  return (
    <></>
  );
}
export default Logout;