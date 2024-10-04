"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // Import the hook

import Image from "next/image";
import Link from "next/link";
import logo1 from "../images/airbnb.jpg";
import logo2 from "../images/uberlogo.svg";
import logo3 from "../images/kfc2.png";
import logo4 from "../images/img1.webp";
import Reason from "@/components/landingpageComponents/Reason";
import CalltoAction from "@/components/landingpageComponents/CalltoAction";
import Footer from "@/components/landingpageComponents/Footer";
import Hero from "@/components/landingpageComponents/Hero";
import Nav from "@/components/landingpageComponents/Nav";

export default function Home() {
  
  
  return (
    <div className="w-full px-4 lg:px-0 ">
     <Nav/>
      <Hero />
     <Reason />
     <CalltoAction />
     <Footer />
    </div>
  );
}
