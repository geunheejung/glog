import { useState } from 'react';

type ReturnType = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: React.ChangeEvent<HTMLInputElement>) => void
];

const useInput = (): ReturnType => {
  const [value, setValue] = useState('');

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, setValue, handleValue];
};

export default useInput;
