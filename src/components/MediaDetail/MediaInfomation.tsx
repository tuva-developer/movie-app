import { currencyFormatter } from "@/libs/utils";
import Image from "@/components/Image"

type MediaInfomationProps = {
  mediaInfo: MovieDetailType | TVShowDetailType | undefined;
}

const MediaInfomation = ({ mediaInfo }: MediaInfomationProps) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Infomation</p>
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{mediaInfo?.original_title}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        {(mediaInfo?.origin_country || []).map((countryCode) => (
          <Image
            key={countryCode}
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
          ></Image>
        ))}
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{mediaInfo?.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Budget</p>
        <p>{currencyFormatter(mediaInfo?.budget || 0)}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Revenue</p>
        <p>{currencyFormatter(mediaInfo?.revenue || 0)}</p>
      </div>
    </div>
  );
};
export default MediaInfomation;
