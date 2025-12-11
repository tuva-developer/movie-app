import { currencyFormatter } from "@/libs/utils";
import ImageComponent from "@/components/ImageComponent";

type MediaInfomationProps = {
  mediaInfo: MediaDetail | undefined;
};

const MediaInfomation = ({ mediaInfo }: MediaInfomationProps) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Infomation</p>
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>
          {mediaInfo?.media_type === "tv"
            ? mediaInfo?.original_name
            : mediaInfo?.original_title}
        </p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        {(mediaInfo?.origin_country || []).map((countryCode) => (
          <ImageComponent
            key={countryCode}
            src={
              countryCode &&
              `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`
            }
            width={48}
            height={36}
          />
        ))}
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{mediaInfo?.status}</p>
      </div>
      {mediaInfo?.media_type === "movie" && (
        <>
          <div className="mb-4">
            <p className="font-bold">Budget</p>
            <p>{currencyFormatter(mediaInfo?.budget || 0)}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Revenue</p>
            <p>{currencyFormatter(mediaInfo?.revenue || 0)}</p>
          </div>
        </>
      )}
      {mediaInfo?.media_type === "tv" && (
        <div className="mb-4">
          <p className="font-bold">Network</p>
          {(mediaInfo.networks || []).map((network) => (
            <div
              key={network.id}
              className="inline-flex items-center justify-center rounded-md bg-white/100 px-2 py-1"
            >
              <img
                src={`https://media.themoviedb.org/t/p/h30/${network.logo_path}`}
                alt={network.name}
                className="max-h-[30px] object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MediaInfomation;
