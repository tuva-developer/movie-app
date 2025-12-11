import ImageComponent from "@/components/ImageComponent";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import { useLoaderData } from "react-router-dom";

const GENDER_MAPPING: Record<number, string> = {
  0: "Not set / not specified",
  1: "Male",
  2: "Female",
  3: "Non-binary",
};

const PeoplePage = () => {
  const peopleInfo = useLoaderData() as People;

  const knowForList = peopleInfo.combined_credits?.cast || [];

  return (
    <div className="bg-black text-white text-[1.2vw]">
      <div className="container">
        <div className="flex-1">
          <ImageComponent
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${peopleInfo.profile_path}`}
            width={600}
            height={900}
            className="mb-6"
          />
          <div>
            <p className="mb-6 text-[1.3vw] font-bold">Personal Info</p>
            <div className="space-y-4">
              <div>
                <p className="font-bold">Known For</p>
                <p>{peopleInfo.known_for_department}</p>
              </div>
              <div>
                <p className="font-bold">Gender</p>
                <p>{GENDER_MAPPING[peopleInfo.gender || 0]}</p>
              </div>
              <div>
                <p className="font-bold">Place of Birth</p>
                <p>{peopleInfo.place_of_birth}</p>
              </div>
              <div>
                <p className="font-bold">Birthday</p>
                <p>{peopleInfo.birthday}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-2">
          <p className="mb-6 text-[1.5vw] font-bold">{peopleInfo.name}</p>
          <div className="mb-6">
            <p className="mb-4 text-[1.4vw] font-bold">Biography</p>
            <p className="whitespace-pre-line">{peopleInfo.biography}</p>
          </div>
          <RelatedMediaList
            title="Know For"
            isLoading={false}
            mediaList={knowForList}
          />
        </div>
      </div>
    </div>
  );
};
export default PeoplePage;
