import { ArrowLeft, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Program() {
  const { programId } = useParams();

  const [program, setProgram] = useState({
    _id: "",
    name: "",
    image: "",
    track: "",
    description: "",
    milestones: [],
    cover: "",
  });

  useEffect(() => {
    fetch(`/api/v1/programDetails/${programId}`)
      .then((parsed) => parsed.json())
      .then((res) => {
        if (res?.success) {
          setProgram(res.data);
        }
      });
  }, [setProgram]);

  return (
    <div className="flex flex-col items-center min-h-[100dvh] bg-stone-950 text-white">
      <div className="flex flex-col justify-end relative w-full h-60 font-serif">
        <h1 className="text-4xl font-extrabold tracking-tighter z-10 w-full text-center py-10">
          {program.name}
        </h1>
        <img
          src={program.cover}
          alt=""
          className="h-full w-full object-cover absolute blur-sm"
        />
      </div>
      <div className="bg-stone-800 sm:py-10 py-5 w-full font-serif">
        <p className="sm:w-4/6 px-4 mx-auto">{program.description}</p>
      </div>
      {program?.milestones?.length > 0 &&
        program?.milestones.map((milestone, index) => (
          <div className="border-b-2 border-stone-800 w-full p-4" key={index}>
            <div className="sm:w-4/6 mx-auto">
              <h3 className="text-xl font-semibold tracking-tight font-sans">
                {milestone.title}
              </h3>
              <p className="text-stone-200 font-mono">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      <div className="fixed flex items-center justify-center bottom-0 w-full py-2">
        <Link to="/" className="absolute left-0 p-4">
          <ArrowLeft />
        </Link>
        <Link
          to={`/player/${program.track}`}
          className="px-5 py-3 bg-[#F87B40] rounded-full"
        >
          <Play />
        </Link>
      </div>
    </div>
  );
}

export default Program;
