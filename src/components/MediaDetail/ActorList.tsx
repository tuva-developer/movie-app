import { useState } from "react";
import ActorInfo from "@/components/MediaDetail/ActorInfo";

type Actor = {
  id: string;
  name: string;
  character: string;
  profile_path: string;
  episodeCount?: number;
};

type ActorListProps = {
  actors: Actor[];
};

const ActorList = ({ actors }: ActorListProps) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const currentActors = !isShowMore
    ? actors?.slice(0, 4) || []
    : actors?.slice(0, 32) || [];

  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Actors</p>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {currentActors.map((actor) => {
          return (
            <ActorInfo
              key={actor.id}
              name={actor.name}
              character={actor.character}
              profile_path={actor.profile_path}
              espisodeCount={actor?.episodeCount}
            />
          );
        })}
      </div>
      {actors.length > 4 && (
        <p
          className="mt-1 cursor-pointer"
          onClick={() => setIsShowMore(!isShowMore)}
        >
          {isShowMore ? "Show Less" : "Show More"}
        </p>
      )}
    </div>
  );
};
export default ActorList;
