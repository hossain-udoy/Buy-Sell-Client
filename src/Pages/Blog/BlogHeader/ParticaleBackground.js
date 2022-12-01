import Particles from "react-tsparticles";
import particaleConfig from "./particleConfig";

export default function ParticaleBackground() {
  return (
    <div>
      hi
      <Particles params={particaleConfig}></Particles>
    </div>
  );
}
