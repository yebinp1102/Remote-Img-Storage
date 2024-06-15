import { useState } from 'react';
import axiosInstance from '../config/axios';

type Props = {
  url: string;
  method?: string;
};

type stateType = {
  isLoading: boolean;
  error?: string;
};

const useMutation = ({ url, method = 'POST' }: Props) => {
  const [state, setState] = useState<stateType>({
    isLoading: false,
    error: '',
  });

  const fn = async (data : any) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    axiosInstance({url, method, data})
    .then(() => {
      setState({isLoading: false})
    })
    .catch(error => {
      setState({isLoading: false, error: error?.message})
    })
  };
  // 9: 48 ~
  return {mutate: fn, ...state};
};

export default useMutation;
