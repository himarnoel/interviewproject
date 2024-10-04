import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { openModal } from "@/lib/slices/modalSlice";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const Footer = (props: Props) => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(footerRef.current, {
      yPercent: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        toggleActions: "play none none reverse",
      },
    });
  }, []);
  const dispatch = useAppDispatch();
  return (
    <footer
      ref={footerRef}
      className="py-10 rounded-xl lg:rounded-none mt-20 bg-black w-full text-center text-gray-400"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Mobbins provides secure and easy-to-use cloud storage for your
              images.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li>
                <Link
                  href={"/home"}
                  className="hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/home"}
                  onClick={() => {
                    dispatch(openModal());
                  }}
                  className="hover:text-white transition-colors duration-300"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  href={"/home"}
                  className="hover:text-white transition-colors duration-300"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">
              Email: olaimarnoel@gmail.com
              <br />
              Phone: +2348088443186
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Mobbins. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
