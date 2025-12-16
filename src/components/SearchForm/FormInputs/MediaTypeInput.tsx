import type { FieldValues } from "react-hook-form";
import type { RHFFieldProps } from "../FormField";

export type MediaType = "movie" | "tv";

type MediaTypeInputProps<TFV extends FieldValues = FieldValues> = RHFFieldProps<
  TFV,
  MediaType
>;

const MediaTypeInput = <TFV extends FieldValues = FieldValues>({
  onChange,
  name,
  value,
}: MediaTypeInputProps<TFV>) => {
  return (
    <div className="accent-black">
      <input
        type="radio"
        name={name}
        value="movie"
        onChange={onChange}
        checked={value === "movie"}
        id="sf-type-movie"
        className="mr-1"
      />
      <label htmlFor="sf-type-movie">Movie</label> <br />
      <input
        type="radio"
        name={name}
        value="tv"
        onChange={onChange}
        checked={value === "tv"}
        id="sf-type-tv"
        className="mr-1"
      />
      <label htmlFor="sf-type-tv">TV Show</label>
    </div>
  );
};

export default MediaTypeInput;
