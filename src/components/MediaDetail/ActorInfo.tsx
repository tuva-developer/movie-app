import ImageComponent from "@/components/ImageComponent";
import { Link } from "react-router-dom";

type ActorDetailProps = {
  id: string;
  name: string;
  character: string;
  profile_path: string;
  espisodeCount?: number;
};

const ActorDetail = ({
  id,
  name,
  character,
  profile_path,
  espisodeCount,
}: ActorDetailProps) => {
  return (
    <Link
      to={`/people/${id}`}
      className="rounded-lg border border-slate-300 shadow-sm duration-200 hover:scale-102"
    >
      <ImageComponent
        className="rounded-lg"
        width={276}
        height={350}
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w276_and_h350_face${profile_path}`
            : `/imgs/ActorNoImage.svg`
        }
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {espisodeCount && <p>{espisodeCount} Espisodes</p>}
      </div>
    </Link>
  );
};
export default ActorDetail;
