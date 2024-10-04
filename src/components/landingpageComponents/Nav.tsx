import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import logo from "../../images/logo.png";
import { useGSAP } from "@gsap/react";

type Props = {};

const Nav = (props: Props) => {
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);

  useGSAP(() => {
   
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -50 }, 
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5, 
      }
    );

    
    linkRefs.current.forEach((link) => {
      if (link) {
        gsap.fromTo(
          link,
          { scale: 1 },
          {
            scale: 1.1,
            duration: 0.3,
            ease: "power1.out",
            onEnter: () => gsap.to(link, { scale: 1.1 }), 
            onLeave: () => gsap.to(link, { scale: 1 }), 
          }
        );
      }
    });
  });

  return (
    <div>
      <div className="h-32">
        <div
          ref={navRef}
          className="flex header w-full max-w-[600px] rounded-full bg-[hsla(0,0%,93%,0.72)] backdrop-blur-xl fixed left-1/2 top-4  -translate-x-1/2 items-center justify-between gap-x-24 px-6 py-[0.8rem] z-[100]"
        >
          <Image src={logo} alt="logo" className=" w-[6rem] lg:w-[10rem] object-contain" />
          <div className="flex items-center gap-4">
            <Link
              href="/upload"
              ref={(el) => {
                if (el) linkRefs.current[0] = el;
              }}
              className="font-semibold hover:text-black"
            >
              Upload
            </Link>
            <Link
              href="/view"
              ref={(el) => {
                if (el) linkRefs.current[1] = el;
              }}
              className="bg-black hover:scale-105 ease-in-out duration-150 font-semibold text-white py-2 rounded-full px-5"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
