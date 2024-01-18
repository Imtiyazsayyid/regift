'use client'
import React from "react";
import axios from 'axios';
import {useEffect} from 'react';

const UsersPage = () => {
  const getUser = async () => {
    const res = await axios.get("http://localhost:3000/users");
    console.log(res.data.data);
  }
  useEffect(()=> {
    getUser();
  },[])
  return <div>Users Page</div>;
};

export default UsersPage;
