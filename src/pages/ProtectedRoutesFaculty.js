import React from 'react'
import { useNavigate } from "react-router-dom"
import UserDetails from '../store/UserDetails';
import { useEffect } from "react";
import { useRecoilState } from 'recoil';

function ProtectedRoutesFaculty(props) {
  const [userData, setuserData] = useRecoilState(UserDetails)
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {

    if (userData == '') {
      navigate('/')
    }
  })
  return (
    <div>
      <Component />
    </div>
  )
}

export default ProtectedRoutesFaculty

