import React, { ChangeEvent, FC } from 'react';

type Props = {
  value: string;
  handleChange: (message: string, e: ChangeEvent<HTMLInputElement>) => void;
};

export const SampleComponent: FC<Props> = ({ value, handleChange }) => {
  return (
    <div>
      <h2>子コンポーネント</h2>
      <input
        type="text"
        value={value}
        placeholder="子コンポーネントで入力"
        onChange={(e) => handleChange('hogehoge', e)}
      />
    </div>
  );
};
