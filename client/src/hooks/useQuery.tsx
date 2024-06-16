import { useEffect, useState } from 'react';
import axiosInstance from '../config/axios';

type Props = {
  url: string;
  refetch: number;
};

type stateType = {
  data: any;
  isLoading: boolean;
  error?: string;
};

const useQuery = ({ url, refetch }: Props) => {
  const [state, setState] = useState<stateType>({
    data: null,
    isLoading: false,
  });

  const fetch = async () => {
    axiosInstance.get(url)
        .then(({data}) => setState({data, isLoading: false}))
        .catch(error => setState({data: null, isLoading: false, error: error?.message}))
  };

  useEffect(() => {
    fetch();
  }, [url, refetch])

  return state;
};

export default useQuery;
