import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../redux/orderRedux";
import styled from 'styled-components';
const Column=styled.div`
  display: flex;
flex-direction: column;
`

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  width: 90%;
`;

function InputField({
  label,
  name,
  errors,
  placeholder,
  type = "text",
}) {
  let error;
{/*   if (errors.isArray) { */}
  {/*   error = errors?.[0]?.[name.split(".").join("?.")]; */}
  {/*   console.log("errrrrrrrrrrrr", error); */}
  {/* } else { */}
  {/*   error = errors?.[name.split(".").join("?.")]; */}
  {/* } */}
{/*  */}
  const dispatch = useDispatch();
 const handleChange = (field,event) => {
    dispatch(setUserData({ [field]: event.target.value }));
  };


  
const userData = useSelector((state) => state.orders);
console.log(userData)
  return (
    <Column className="flex flex-col w-full ">
      <label className="font-helvetica text-sm font-bold">{label}</label>
      <Input
        className={`rounded p-4 mt-1 placeholder:text-gray-400  outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onChange={(event) =>handleChange(name,event)}
        placeholder={placeholder}
        type={type ? type : "text"}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
      {errors?.stock?.length > 0 && name.startsWith("stock") && (
        <span className="text-red-500 text-sm mt-1">
          la informacion del stock debe estar completa
        </span>
      )}
    </Column>
  );
}

export default InputField;
