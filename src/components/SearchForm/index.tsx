import { useForm } from "react-hook-form";
import FormField from "@/components/SearchForm/FormField";
import MediaTypeInput from "@/components/SearchForm/FormInputs/MediaTypeInput";
import GenresInput from "@/components/SearchForm/FormInputs/GenresInput";
import RatingInput from "@/components/SearchForm/FormInputs/RatingInput";
import { useEffect, useMemo, type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

const ALLOWED_MEDIA_TYPES = ["movie", "tv"] as const;
type MediaType = (typeof ALLOWED_MEDIA_TYPES)[number];

const isMediaType = (v: unknown): v is MediaType =>
  typeof v === "string" &&
  (ALLOWED_MEDIA_TYPES as readonly string[]).includes(v);

type SearchFormProps = {
  setSearchFormValues: Dispatch<SetStateAction<SearchFormValues>>;
};
const SearchForm = ({ setSearchFormValues }: SearchFormProps) => {
  const [searchParams] = useSearchParams();
  const qp = searchParams.get("mediaType");
  const mediaType: MediaType = isMediaType(qp) ? qp : "movie";

  const { handleSubmit, control, watch } = useForm<SearchFormValues>({
    defaultValues: {
      mediaType: mediaType,
      genres: [],
      rating: "all",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  const formValues = watch();

  useEffect(() => {
    setSearchFormValues(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues)]);

  return (
    <div className="rounded-lg border p-4 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="mediaType"
          label="MediaType"
          control={control}
          Component={MediaTypeInput}
        />

        <FormField
          name="genres"
          label="Genres"
          control={control}
          Component={GenresInput}
        />

        <FormField
          name="rating"
          label="Rating"
          control={control}
          Component={RatingInput}
        />
      </form>
    </div>
  );
};
export default SearchForm;
