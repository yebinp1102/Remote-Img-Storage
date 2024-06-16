import useQuery from '../hooks/useQuery';
import ErrorMsg from './ErrorMsg';
import Spinner from './Spinner';

type Props = {
  refetch: number;
}

const Posts = ({refetch}: Props) => {
  const URL = '/images';
  const {
    data: imageUrls = [],
    isLoading: fetchingPosts,
    error: fetchError,
  } = useQuery({ url: URL, refetch });

  return (
    <div className='px-20 mb-20'>
      <p className='text-xl'>Posts</p>
      <hr className='my-3' />

      {!fetchError && imageUrls?.length === 0 && (
        <p>아직 이미지가 없습니다. 첫 이미지를 추가해보세요.</p>
      )}

      <div className=" grid grid-cols-3 grid-rows-3 gap-4">
        {imageUrls?.length > 0 && imageUrls.map((url:string, idx: number) => (
          <img src={url} alt={idx.toString()} className='object-cover w-full h-full' />
        ))}
      </div>
      {fetchingPosts && <Spinner />}
      {fetchError && <ErrorMsg>{fetchError}</ErrorMsg>}
    </div>
  );
};

export default Posts;
