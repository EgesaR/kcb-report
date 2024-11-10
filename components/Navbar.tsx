interface UserData {
  email: string;
  username: string;
  id: number;
}

const Navbar = (data: UserData | any) => {
    const { username } = data.data
  return (
    <div className="w-full py-2 px-3 border-b-1 border-slate-400">
      <div>
        <h1 className="text-sm font-bold text-slate-400">Welcome,</h1>
              <h1 className="text-sm font-bold">{username}</h1>
      </div>
      <div className="flex ml-auto"></div>
    </div>
  );
};

export default Navbar;
