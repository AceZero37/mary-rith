import Memory from "@/components/Memory";
import Video from "@/components/Video";
import LoveQuotes from "@/components/LoveQuotes";
import Mail from "@/components/Mail";
import Relationship from "@/components/Relationship";

const Content = ({ nightMode }) => {
  return (
    <div>
      <Relationship nightMode={nightMode} />
      <Memory nightMode={nightMode} />
      <Video nightMode={nightMode} />
      <LoveQuotes nightMode={nightMode} />
      <Mail nightMode={nightMode} />
    </div>
  );
};

export default Content;
