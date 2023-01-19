import React, { useCallback, useState } from 'react';

type ReturnTypes<T> = [T, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void];

export default function useInputs<T extends Record<string, unknown>>(initialState: T): ReturnTypes<T> {
  const [inputs, setInputs] = useState(initialState);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setInputs({ ...inputs, [name]: value });
    },
    [inputs]
  );

  const resetInputs = () => {
    // 얕은 복사 주의
    const newInputs = Object.assign(inputs);
    for (const key of Object.keys(inputs)) {
      newInputs[key] = '';
    }
    setInputs(newInputs);
  };

  return [inputs, onChange, resetInputs];
}
