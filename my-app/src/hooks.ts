import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import { GITHUB_API } from "./api";

interface Props{
  initialValuese: Record<string, string>,
  validate: (value: Record<string, string>)=> Record<string, string>,
  refs: Record<string,React.MutableRefObject<HTMLInputElement>>,
  onSuccess: (result:string)=> void, 
  onErrors : ()=> void, 
  // 함수 return 타입도 타입을 지정가능 
  onSubmit:() => Promise<string>,
}

export function useForm({
  initialValuese,
  validate,
  refs,
  onSuccess, //성공했을때
  onErrors, //에러났을때
  onSubmit, //값이 전달될때 어떤 함수/네트워크 호출
}:Props) {
  const [inputValues, setInputValues] = useState(initialValuese);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onChange(e: React.ChangeEvent<{name: string, value: string}>) {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);
    const validateResult = validate(inputValues);
    setErrors(validateResult);

    const errorKeys = Object.keys(validateResult); //[]

    if (errorKeys.length !== 0) {
      const key = errorKeys[0];
      alert(validateResult[key]);
      // onErrors();
      refs[key].current.focus();
      //ref control
      setIsSubmitting(false);

      return;
    }
    if (errorKeys.length === 0) {
      try {
        const result = await onSubmit();
        onSuccess(result);
      } catch  {
        // console.log({ e });
        onErrors();
      }
      return;
    }
  }
  return {
    inputValues,
    onChange,
    isSubmitting,
    errors,
    handleSubmit,
  };
}

async function getUserInfo() {
  const data = await axios.get(`${GITHUB_API}/user`, {
    headers: {
      Authorization: process.env.REACT_APP_GITHUB_TOKEN!,
      "Content-Type": "applications/json",
    },
  });
  return data.data;
}

export function useUser() {
  return useQuery(["userInfo"], () => getUserInfo());
}
