import ImageComponent from "@/components/ImageComponent";

type ActorDetailProps = {
  name: string;
  character: string;
  profile_path: string;
  espisodeCount?: number;
};

const ActorDetail = ({
  name,
  character,
  profile_path,
  espisodeCount,
}: ActorDetailProps) => {
  return (
    <div className="rounded-lg border border-slate-300 shadow-sm">
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
    </div>
  );
};
export default ActorDetail;
