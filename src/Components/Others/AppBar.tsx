import { useState } from "react";
import { useContextApi } from "../contexAPi/ContextApi";
import LogOut from "../smallComponents/LogOut";

function Appbar() {
  const [toggle, setToggle] = useState(true);
  const { bright ,setBright,userInfo } = useContextApi();

  return (
    <div className={`flex items-center justify-between px-4 py-4 ${bright ? 'bg-white' : 'bg-gray-900'} border-b ${bright ? 'border-gray-200' : 'border-gray-700'} shadow-md`}>
    {/* <div className={`flex px-5 lg:px-10 items-center justify-between border-b ${ bright ? 'border-black' : 'border-white'} `}> */}
      <div className="lg:px-5 py-5 flex flex-row justify-between gap-3 lg:gap-5 items-center">
        <div className="text-2xl font-bold ">
          <img className="rounded-full w-10" src={userInfo.picture} alt={ userInfo.given_name || userInfo.name} />
        </div>
        <p className={`lg:text-4xl text-md ${bright ? 'text-black':'text-white'} font-semibold`}>{ userInfo.given_name || userInfo.name}</p>
      </div>
      <div className="lg:px-5 text-sm md:text-md py-5 flex flex-col lg:flex-row justify-between gap-3 lg:gap-5 items-center">
        <button
          onClick={()=>{
            setBright(!bright);
            setToggle(!toggle);
          }}
          className={`px-5 flex justify-between items-center py-3 rounded-lg ${bright ?'bg-green-300':'bg-gray-800'} hover:bg-gray-200 hover:text-black transition-colors duration-300`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` ${toggle ? 'bi bi-lightbulb-fill' :'bi bi-lightbulb-off-fill'}`} viewBox="0 0 16 16">
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>
        <LogOut />
        <div>
          <a
          className={`px-5 flex justify-between items-center py-3 rounded-lg ${bright ?'bg-green-300':'bg-gray-800'} hover:bg-gray-200 hover:text-black transition-colors duration-300`}
           href="https://calendar.google.com/calendar/u/0/r/month" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
            </svg>
          </a>
        </div>
        
      </div>
    </div>
  );
}

export default Appbar;
