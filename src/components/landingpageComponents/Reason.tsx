"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GrStorage } from "react-icons/gr";
import { RiUploadCloud2Line } from "react-icons/ri";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { useGSAP } from "@gsap/react";

type Props = {};

const Reason = (props: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".card");

    const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    // Animate the header
    timeline.from(headerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
     
    });

    // Animate the cards
    timeline.from(cards, {
      x: -100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      
    });
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 md:px-20 max-w-5xl mt-10 mx-auto"
    >
      <h2 ref={headerRef} className="text-5xl font-bold text-center text-black">
        Why Use Our <br /> Image Repository?
      </h2>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white card p-6 border  rounded-xl text-center">
          <RiUploadCloud2Line className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-semibold">Easy Upload</h3>
          <p className="mt-2 text-gray-600">
            Quickly upload your images to the cloud with a simple interface.
          </p>
        </div>

        <div className="bg-white card p-6 border  rounded-xl text-center">
          <GrStorage className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-semibold">Secure Storage</h3>
          <p className="mt-2 text-gray-600">
            Your images are stored securely using Cloudinary's reliable
            infrastructure.
          </p>
        </div>

        <div className="bg-white card p-6 border  rounded-xl text-center">
          <HiOutlineComputerDesktop className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-semibold">Local Access</h3>
          <p className="mt-2 text-gray-600">
            Keep track of your uploads and access them from your browser's local
            storage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reason;
