import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import logo from "../../images/logo.png";
import { useGSAP } from "@gsap/react";
import { openModal } from "@/lib/slices/modalSlice";
import { useAppDispatch } from "@/lib/hooks";

type Props = {};

const Nav = (props: Props) => {
  const navRef = useRef<HTMLDivElement>(null);

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
  });
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="h-32">
        <div
          ref={navRef}
          className="flex header w-full max-w-[600px] rounded-full bg-[hsla(0,0%,93%,0.72)] backdrop-blur-xl fixed left-1/2 top-4  -translate-x-1/2 items-center justify-between gap-x-24 px-6 py-[0.8rem] z-[100]"
        >
          <Image
            src={logo}
            alt="logo"
            className=" w-[6rem] lg:w-[10rem] object-contain"
          />
          <div className="flex items-center gap-4">
            <Link
              href="/home"
              onClick={() => {
                dispatch(openModal());
              }}
              className="font-semibold hover:text-black"
            >
              Upload
            </Link>

            <Link
              href="/home"
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
