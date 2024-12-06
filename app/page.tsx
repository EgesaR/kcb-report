"use client";

import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

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
    <div className="w-full bg-white/80 px-3 pt-1 flex flex-col dark:bg-[#111113] dark:text-white">
      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
      >
        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-2.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
            KCB Reports Beta Is Coming Soon!
          </span>

          <div className="max-w-5xl flex text-center text-3xl sm:text-5xl sm:leading-tight md:text-7xl">
            <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text font-medium leading-tight text-transparent md:leading-tight">
              Make
            </h1>
            <div className="mx-2 flex flex-col gap-2 mt-1 font-semibold overflow-hidden">
              <div className="text-green-600">outstanding</div>
              <div className="text-rose-600">dynamic</div>
              <div className="text-sky-700">powerful</div>
              <div className="text-amber-500">friendly</div>
            </div>
            <h1 className="bg-gradient-to-br from-white to-gray-400 bg-clip-text font-medium leading-tight text-transparent md:leading-tight">
              reports.
            </h1>
          </div>

          <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, et,
            distinctio eum impedit nihil ipsum modi.
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
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
          >
            Start free trial
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </div>
      </motion.section>
      <div className="h-[90vh] w-full flex">
        <div className="w-1/2 h-full"></div>
        <div className="w-1/2 h-full flex items-center">
          <div className="text-[28px]">
            Involve school stakeholders with student's progress to archive the
            best of it.
          </div>
        </div>
      </div>

      <div className="h-[90vh] w-full flex">
        <div className="w-1/2 h-full flex items-center">
          <div className="text-[28px]">
            <label className="text-green-600">Receive</label>,&nbsp;
            <label className="text-purple-500">Predict</label>,&nbsp;
            <label className="text-blue-600">Evaluate</label>&nbsp; and
            take&nbsp;
            <label className="text-orange-500">Action</label>&nbsp; of the
            subject and class performance.
          </div>
        </div>
        <div className="w-1/2 h-full"></div>
      </div>
    </div>
  );
};

export default Home;
