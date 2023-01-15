import { useEffect, useState } from 'react';

import { useAppSelector } from '../redux/hooks';

export default function useGetInputs() {
  const isLoading = useAppSelector((state) => state.user.loading);
  const userData = useAppSelector((state) => state.user.entities);
  const [inputs, setInputs] = useState(userData);

  // 사용자 정보를 가져오면 input에 저장
  useEffect(() => {
    setInputs(userData);
  }, [isLoading]);

  const resetInputs = () => {
    setInputs(userData);
  };

  return { inputs, setInputs, resetInputs };
}
