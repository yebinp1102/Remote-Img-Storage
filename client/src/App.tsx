import Posts from './components/Posts';
import Profile from './components/Profile';
import UploadBtn from './components/UploadBtn';

const App = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center min-h-screen h-full">
      <Profile />
      <UploadBtn />
      <Posts />
    </div>
  );
};

export default App;
