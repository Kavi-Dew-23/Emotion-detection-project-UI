import React from "react";
import Particles from "react-tsparticles";
import particlesConfigure from "../../config/particles_configure";

const ParticlesBackground = () => {
  return <Particles options={particlesConfigure} />;
};

export default ParticlesBackground;
