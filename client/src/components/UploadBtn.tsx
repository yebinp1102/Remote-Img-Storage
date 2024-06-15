import React, { useState } from 'react';
import useMutation from '../hooks/useMutation';

const fileValidation = ['image/jpg', 'image/jpeg', 'image/png'];
const URL = '/images';

const ErrorMsg = ({children}: {children: string}) => {
  return <p className='text-red-500'>{children}</p>
}

const UploadBtn = () => {
  const {
    mutate: uploadImg,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL });
  const [error, setError] = useState<string>('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      console.log(file);

      if (!fileValidation.find((type) => type === file.type)) {
        setError('파일의 타입은 jpg, jpeg, png만 허용합니다.');
        return;
      }

      const form = new FormData();
      form.append('image', file);

      await uploadImg(form);
      
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-20 gap-3">
      <input
        type="file"
        id="uploadFile"
        className="hidden"
        accept='accept="image/png, image/jpeg"'
        onChange={handleUpload}
      />
      <label
        htmlFor="uploadFile"
        className="hover:scale-105 transition-all cursor-pointer shadow-lg border border-blue-300 text-blue-300 px-5 py-2 rounded-lg tracking-wider"
      >
        {uploading ? 'Loading. . .' : 'Upload'}
      </label>
      {!!error.length && <ErrorMsg>{error}</ErrorMsg>}
      {uploadError && <ErrorMsg>{uploadError}</ErrorMsg>}
    </div>
  );
};

export default UploadBtn;
