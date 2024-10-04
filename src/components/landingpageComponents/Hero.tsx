import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import logo1 from "../../images/airbnb.jpg";
import logo2 from "../../images/uberlogo.svg";
import logo3 from "../../images/kfc2.png";
import logo4 from "../../images/img1.webp";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";

type Props = {};

const Hero = (props: Props) => {
  gsap.registerPlugin(ScrollTrigger);
  // Refs for elements to animate
  const heroText1Ref = useRef(null);
  const heroText2Ref = useRef(null);
  const heroButtonRef = useRef(null);
  const logoRef1 = useRef<HTMLImageElement | null>(null);
  const logoRef2 = useRef<HTMLImageElement | null>(null);
  const logoRef3 = useRef<HTMLImageElement | null>(null);
  const imageRef = useRef(null);

  const dispatch = useAppDispatch();

  useGSAP(() => {
    // GSAP Animations
    gsap.from(heroText1Ref.current, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(heroText2Ref.current, {
      y: 50,
      opacity: 0,
      delay: 0.5,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(heroButtonRef.current, {
      scale: 0.8,
      opacity: 0,
      delay: 1,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from([logoRef1.current, logoRef2.current, logoRef3.current], {
      opacity: 0,
      stagger: 0.2,
      delay: 1.2,
      duration: 1.2,
      y: 50,
      ease: "power3.out",
    });

    gsap.from(imageRef.current, {
      scale: 1.5, // Start at 1.5x the size
      duration: 1.5,
      marginTop: 100,

      scrollTrigger: {
        snap: { ease: "power1.inOut" },
        trigger: imageRef.current, // Trigger the animation on the image element
        start: "top 80%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
        scrub: true, // Allows for smooth scrubbing (animations linked to scroll position)
      },
    });
  });

  return (
    <div>
      <div className="herotext text-center max-w-[650px] mx-auto mt-10">
        {/* Animated Text */}
        <p
          className="font-bold text-[3.9rem] leading-[4rem] herotext1"
          ref={heroText1Ref}
        >
          Store Your Images <br /> on the Cloud
        </p>
        <p
          className="mt-5 text-lg md:text-xl font-[440] herotext2 text-[#303030]"
          ref={heroText2Ref}
        >
          Easily upload images <br /> and manage them securely with full access.
        </p>

        {/* Animated Button */}
        <Link
          href={"/home"}
          onClick={() => {
            dispatch(openModal());
          }}
        >
          <button
            className="mt-10 px-6 py-3 herotextbtn bg-black text-white rounded-full font-semibold"
            ref={heroButtonRef}
          >
            {" "}
            Get Started
          </button>
        </Link>

        <p className="mt-[2.6rem]">Trusted by </p>

        {/* Animated Logos */}
        <div className="max-w-[400px] mx-auto flex justify-between">
          <Image
            src={logo1}
            alt="logo1"
            className="object-contain w-[7rem]"
            ref={logoRef1}
          />
          <Image
            src={logo2}
            alt="logo2"
            className="object-contain w-[5.2rem]"
            ref={logoRef2}
          />
          <Image
            src={logo3}
            alt="logo3"
            className="object-contain w-[6.5rem]"
            ref={logoRef3}
          />
        </div>
      </div>

      {/* Animated Main Image */}
      <div className="bg-black w-full mt-14 p-10 max-w-[1200px] rounded-2xl mx-auto">
        <Image
          src={logo4}
          ref={imageRef}
          alt="logo"
          className="object-contain mx-auto rounded-2xl"
        />
      </div>
      {/* <div className="relative bg-gradient-to-r from-black to-gray-800 w-full mt-20 p-8 sm:p-12 max-w-[1200px] rounded-3xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30"></div>
        <Image
          src={logo4}
          ref={imageRef}
          alt="Hero image"
          className="object-cover w-full h-full rounded-2xl relative z-10 transition-transform duration-300 hover:scale-105"
        />
      </div> */}
    </div>
  );
};

export default Hero;
