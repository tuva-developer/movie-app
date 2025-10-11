import { currencyFormatter } from "@/libs/utils";
import Image from "@/components/Image"

type MovieInfomationProps = {
  movieInfo: MovieDetailType | undefined;
}

const MovieInfomation = ({ movieInfo }: MovieInfomationProps) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Infomation</p>
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{movieInfo?.original_title}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        {(movieInfo?.origin_country || []).map((countryCode) => (
          <Image
            key={countryCode}
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
          ></Image>
        ))}
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{movieInfo?.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Budget</p>
        <p>{currencyFormatter(movieInfo?.budget || 0)}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Revenue</p>
        <p>{currencyFormatter(movieInfo?.revenue || 0)}</p>
      </div>
    </div>
  );
};
export default MovieInfomation;
