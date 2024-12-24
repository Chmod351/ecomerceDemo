import React from "react";

function InputField({
  label,
  name,
  register,
  errors,
  placeholder,
  type = "text",
  disabled,
  required,
  defaultValue,
}) {
  let error;
  if (errors.isArray) {
    error = errors?.[0]?.[name.split(".").join("?.")];
    console.log("errrrrrrrrrrrr", error);
  } else {
    error = errors?.[name.split(".").join("?.")];
  }

  return (
    <div className="flex flex-col w-full ">
      <label className="font-helvetica text-sm font-bold">{label}</label>
      <input
        className={`rounded p-4 mt-1 placeholder:text-gray-400  outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name, { required })}
        placeholder={placeholder}
        type={type ? type : "text"}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
      {errors?.stock?.length > 0 && name.startsWith("stock") && (
        <span className="text-red-500 text-sm mt-1">
          la informacion del stock debe estar completa
        </span>
      )}
    </div>
  );
}

export default InputField;
