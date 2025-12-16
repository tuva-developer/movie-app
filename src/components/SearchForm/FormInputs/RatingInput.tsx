import type { FieldValues } from "react-hook-form";
import type { RHFFieldProps } from "../FormField";

export type RatingValue = "all" | "0-49" | "50-69" | "70-100";

type RatingInputProps<TFV extends FieldValues = FieldValues> = RHFFieldProps<
  TFV,
  RatingValue
>;

const RatingInput = <TFV extends FieldValues = FieldValues>({
  onChange,
  name,
  value,
}: RatingInputProps<TFV>) => {
  return (
    <select
      className="rounded border bg-black text-white"
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value as RatingValue)}
    >
      <option value="all">All</option>
      <option value="0-49">0 - 49</option>
      <option value="50-69">50 - 69</option>
      <option value="70-100">70 - 100</option>
    </select>
  );
};

export default RatingInput;