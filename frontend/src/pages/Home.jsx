import React, { useState, useEffect } from "react";
import {
  Album,
  CircleDot,
  LayoutPanelLeft,
  Lock,
  Plus,
  SquareUser,
} from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("/api/v1/programs")
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res?.success) {
          setPrograms(res.data);
        }
      });
  }, [setPrograms]);

  return (
    <div className="flex flex-col items-center min-h-[100dvh] bg-gradient-to-b from-[#F87B4050] to-white max-sm:px-6 pb-20">
      <header className="flex items-center justify-between w-full sm:w-5/6 p-4">
        <div className="flex gap-2 items-center justify-center">
          <img src="/logo.svg" alt="" className="h-10 w-10 object-contain" />
          <p className="text-[#F87B40] text-xl font-extrabold tracking-tight">
            InnerBhakti
          </p>
        </div>
        <div className="flex items-center justify-around gap-2">
          <button className="bg-white rounded-full p-2">
            <CircleDot />
          </button>
          <button className="bg-white rounded-full p-2">
            <Plus />
          </button>
        </div>
      </header>
      <h1 className="text-2xl font-extrabold tracking-tight mb-6 sm:w-4/6 w-full">
        Prarthana Plans
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 sm:w-4/6 w-full">
        {programs.length > 0 &&
          programs.map((program, index) => (
            <Link
              to={`/program/${program._id}`}
              className="flex flex-col justify-end rounded-xl relative overflow-hidden aspect-square"
              key={index}
            >
              <img
                src={program.image}
                alt=""
                className="absolute w-full h-full object-cover"
              />
              <div className="p-2 backdrop-blur-sm w-fit rounded-full absolute top-2 right-2 bg-transparent/20">
                <Lock color="white" />
              </div>
              <div className="bg-gradient-to-tr from-transparent/80 via-transparent/5 to-transparent z-10 p-3">
                <h1 className="font-lg font-semibold tracking-tight text-white">
                  {program.name}
                </h1>
                <p className="text-white/80">20 Days Plan</p>
              </div>
            </Link>
          ))}
      </div>
      <nav className="flex items-center justify-around fixed bottom-0 w-full p-2 bg-white z-20">
        <button className="flex flex-col items-center justify-center">
          <div className="hover:bg-[#F87B40] hover:text-white transition-colors px-4 py-2 rounded-2xl">
            <Album />
          </div>
          Guide
        </button>
        <button className="flex flex-col items-center justify-center">
          <div className="bg-[#F87B40] text-white hover:text-black transition-colors px-4 py-2 rounded-2xl">
            <LayoutPanelLeft />
          </div>
          Explore
        </button>
        <button className="flex flex-col items-center justify-center">
          <div className="hover:bg-[#F87B40] hover:text-white transition-colors px-4 py-2 rounded-2xl">
            <SquareUser />
          </div>
          Me
        </button>
      </nav>
    </div>
  );
}

export default Home;
