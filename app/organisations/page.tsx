'use client'
import { useEffect } from 'react';
import { Flex } from "@radix-ui/themes";
import React from "react";
import axios from "axios";

const OrganisationPage = () => {
  const getOrgs = async () => {
    const res = await axios.get("http://localhost:3000/organisation");
    console.log(res);
  }
 useEffect(() => {
  getOrgs();
 }, [])

  return <div>Organisation</div>
};

export default OrganisationPage;
