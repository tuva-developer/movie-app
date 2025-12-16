import { useFetch } from "@/hooks/useFetch";
import { useWatch, type FieldValues, type Path } from "react-hook-form";
import type { RHFFieldProps } from "../FormField";
import type { MediaType } from "./MediaTypeInput";
import { useEffect } from "react";

type Genre = { id: number; name: string };
type GenresValue = number[];

type GenresInputProps<TFV extends FieldValues = FieldValues> = RHFFieldProps<
  TFV,
  GenresValue,
  MediaType
>;

const GenresInput = <TFV extends FieldValues = FieldValues>({
  control,
  value = [],
  onChange,
}: GenresInputProps<TFV>) => {
  const mediaType =
    (useWatch({
      name: "mediaType" as Path<TFV>,
      control,
    }) as MediaType | undefined) ?? "movie";

  const { data } = useFetch<{ genres: Genre[] }>({
    url: `/genre/${mediaType}/list`,
  });

  useEffect(() => {
    onChange([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);

  const genres = data?.genres ?? [];

  return (
    <div className="flex flex-wrap gap-1">
      {genres.map((genre) => {
        return (
          <button
            key={genre.id}
            className={`cursor-pointer rounded-lg border px-2 py-1 ${value.includes(genre.id) ? "bg-white text-black" : ""}`}
            onClick={() => {
              let newValue = [...value];
              if (value.includes(genre.id)) {
                newValue = newValue.filter((g) => g !== genre.id);
              } else {
                newValue = [...newValue, genre.id];
              }

              onChange(newValue);
            }}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
};

export default GenresInput;
