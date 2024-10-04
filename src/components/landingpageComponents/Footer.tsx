import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

  return (
    <footer ref={footerRef} className="py-10 rounded-xl lg:rounded-none mt-20 bg-black w-full text-center text-gray-400">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Image Repository provides secure and easy-to-use cloud storage for your images.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Upload</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Gallery</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">
              Email: info@imagerepository.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Image Repository. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;