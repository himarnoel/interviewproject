import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const CalltoAction = (props: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    timeline
      .from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(
        paragraphRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
  }, []);

  return (
    <section ref={sectionRef} className="py-16 rounded-xl bg-gray-200 w-full text-center mt-20">
      <h2 ref={headingRef} className="text-2xl md:text-4xl font-bold">
        Start Uploading Now!
      </h2>
      <p ref={paragraphRef} className="mt-4 text-lg text-gray-600">
        Experience the simplicity of managing your images with our cloud-based solution.
      </p>
      <Link href={"/upload"}><button
        ref={buttonRef}
        className="mt-6 px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
      >
        Upload Your Images
      </button>
      </Link>
    </section>
  );
};

export default CalltoAction;