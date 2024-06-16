import { useState } from 'react';
import Posts from './components/Posts';
import Profile from './components/Profile';
import UploadBtn from './components/UploadBtn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [refetch, setRefetch] = useState<number>(0);

  return (
    <div className="bg-slate-800 text-white flex flex-col items-center min-h-screen h-full">
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={2000} // 자동 off 시간
        closeOnClick // 클릭으로 알람 닫기
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        limit={1} // 알람 개수 제한
      />
      <Profile />
      <UploadBtn setRefetch={setRefetch} />
      <Posts refetch={refetch} />
    </div>
  );
};

export default App;
