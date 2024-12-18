"use client";

import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import CardLayout from "@/components/CardLayout";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const Home = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <div className="w-full bg-white/80 pt-1 pb-8 flex flex-col dark:bg-[#111113] dark:text-white">
      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-12 sm:py-24 text-gray-200"
      >
        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-2.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
            KCB Reports Beta Is Coming Soon!
          </span>

          <div className="max-w-5xl flex text-center text-[26px] sm:text-5xl sm:leading-tight md:text-5xl">
            <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text font-medium leading-tight text-transparent md:leading-tight">
              Make
            </h1>
            <h1 className="mx-1 sm:mx-2 leading-tight md:leading-tight font-semibold from-teal-400 to-green-500 bg-clip-text text-transparent bg-gradient-to-b">
              outstanding
            </h1>
            <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text font-medium leading-tight text-transparent md:leading-tight">
              reports
            </h1>
          </div>

          <p className="mb-6 mt-4 sm:mb-6 sm:mt-4 max-w-xl text-center text-base leading-relaxed md:text-xl md:leading-relaxed">
            that are creatative, optimum, responsive and engaging.
          </p>

          <motion.button
            style={{
              border,

              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="-ml-4 sm:-ml-8 group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
          >
            Start free trial
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </div>
      </motion.section>
      <motion.section className="min-h-screen w-full pt-24">
        <h1 className="w-full text-3xl md:text-5xl font-semibold text-[#202124] dark:text-slate-300 text-center px-4">
          <label>Create the most </label>
          <label className="text-green-600 bg-[#ceead6] rounded-xl px-2 py-1 mb-2">
            outstanding
          </label>
          <br />
          <label>processed reports basing on school's preferences</label>
        </h1>
        <div className="gap-4 sm:gap-2 grid grid-cols-1 sm:grid-cols-4 mt-14 px-4 sm:px-3">
          <CardLayout>
            <h4 className="font-bold text-large">
              Personalized Report Designs
            </h4>
            <small className="text-slate-500 text-sm sm:text-[15px]">
              <label>
                KCB Reports offers a variety of customizable and collaborative
                report designs tailored to highlight the core mission and
                objectives of educational institutions.
              </label>
              <br />
              <label className="hidden">
                These designs are crafted to ensure clarity and focus,
                effectively communicating the essential purpose of the school.
              </label>
            </small>
            <div>
              <button></button>
            </div>
          </CardLayout>
          <CardLayout>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardLayout>
          <CardLayout>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardLayout>
          <CardLayout>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardLayout>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
