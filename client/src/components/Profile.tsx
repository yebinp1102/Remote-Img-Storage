import ProfileImg from '../../public/profile.jpg';

const Profile = () => {
  return (
    <div className="bg-slate-500 hover:scale-105 transition-all p-8 flex gap-10 items-center rounded-lg shadow-lg mt-20">
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={ProfileImg} alt="profile_img" className="w-full object-fit" />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold">Yebin's Photo books</p>
        <p>제 사진첩에 오신 것을 환영합니다.</p>
      </div>
    </div>
  );
};

export default Profile;
