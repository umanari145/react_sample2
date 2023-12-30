import { ChangeEvent, useState } from 'react';

export const useStateWithStorage = (
  init: string,
  key: string
): [string, (e: ChangeEvent<HTMLTextAreaElement>) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.currentTarget.value;
    localStorage.setItem(key, textValue);
    setValue(textValue);
  };

  return [value, handleChange];
};
