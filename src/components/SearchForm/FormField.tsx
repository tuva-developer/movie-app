import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldPathValue,
} from "react-hook-form";
import { useWatch } from "react-hook-form";

export type RHFFieldProps<
  TFV extends FieldValues,
  TValue,
  TMediaType = unknown
> = {
  name: string;
  value: TValue;
  onChange: (...event: unknown[]) => void;
  mediaType?: TMediaType;
  control: Control<TFV>;
};

// ✅ type cho component generic (đây là chìa khóa)
type GenericFieldComponent<TValue, TMediaType> = <
  TFV extends FieldValues = FieldValues
>(
  props: RHFFieldProps<TFV, TValue, TMediaType>
) => React.ReactElement | null;

type FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TMediaType = unknown
> = {
  control: Control<TFieldValues>;
  label: string;
  name: TName;
  Component: GenericFieldComponent<
    FieldPathValue<TFieldValues, TName>,
    TMediaType
  >;
  mediaTypeName?: Path<TFieldValues>;
};

const FormField = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TMediaType = unknown
>({
  control,
  label,
  name,
  Component,
  mediaTypeName,
}: FormFieldProps<TFieldValues, TName, TMediaType>) => {
  const mtName = (mediaTypeName ?? ("mediaType" as Path<TFieldValues>));
  const mediaType = useWatch({ control, name: mtName }) as TMediaType;

  return (
    <div>
      <label className="mb-1 font-bold">{label}</label> <br />

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Component
            name={field.name}
            value={field.value as FieldPathValue<TFieldValues, TName>}
            onChange={field.onChange}
            mediaType={mediaType}
            control={control}
          />
        )}
      />
    </div>
  );
};

export default FormField;