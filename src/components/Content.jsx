import Relationship from "@/components/Relationship";
import CosmicConstellation from "@/components/CosmicConstellation";
import Memory from "@/components/Memory";
import Video from "@/components/Video";
import LoveQuotes from "@/components/LoveQuotes";
import LoveMap from "@/components/LoveMap";
import LoveJar from "@/components/LoveJar";
import Mail from "@/components/Mail";

const Content = ({ nightMode }) => {
  return (
    <div>
      <Relationship nightMode={nightMode} />
      <CosmicConstellation nightMode={nightMode} />
      <Memory nightMode={nightMode} />
      <Video nightMode={nightMode} />
      <LoveQuotes nightMode={nightMode} />
      <LoveMap nightMode={nightMode} />
      <LoveJar nightMode={nightMode} />
      <Mail nightMode={nightMode} />
    </div>
  );
};

export default Content;

