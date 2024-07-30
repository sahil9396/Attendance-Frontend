import { useState } from "react";
import { useContextApi } from "../contexAPi/ContextApi";
import LogOut from "../smallComponents/LogOut";

function Appbar() {
  const [id_num, set_id_num] = useState(true);
  const { bright,userInfo } = useContextApi();

  return (
    <div className={`flex flex-row items-center justify-between px-4 py-4 ${bright ? 'bg-white' : 'bg-gray-900'} border-b ${bright ? 'border-gray-200' : 'border-gray-700'} shadow-md`}>
      <div className="lg:px-5 py-5 flex flex-row justify-between gap-3 lg:gap-5 items-center">
        <div className="text-2xl font-bold ">
          <img className="rounded-full w-10" src={userInfo.picture} alt={ userInfo.given_name || userInfo.name} />
        </div>
        <p className={`lg:text-4xl text-lg ${bright ? 'text-black':'text-white'} font-semibold`}>{ userInfo.given_name || userInfo.name}</p>
      </div>
      <div className="hidden md:block">
        <Icons flow="row" />
      </div>
      <div className='relative block md:hidden '>
          <div className={`h-full w-1/2 border-2 shadow-lg p-3 overflow-hidden fixed top-0 ${id_num ? '-left-1/2':'left-0'} ${bright ? 'bg-white' : 'bg-gray-900'} z-10 duration-100`}>
            <Icons flow="col" />
          </div>
          <div className='flex justify-end w-full'>
            <button onClick={()=>set_id_num(!id_num)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className={`bi bi-gear ${id_num?'block':'hidden'} `} viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className={`bi bi-gear-fill  ${!id_num?'block':'hidden'}`} viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
              </svg>
            </button>
          </div>
      </div>
    </div>
  );
}

const Icons = ({flow}:{flow:string})=>{
  const { bright ,setBright } = useContextApi();
  return(
    <div className={`lg:px-5 text-sm md:text-md py-5 flex flex-${flow} justify-between gap-3 lg:gap-5 items-center`}>
      <button
        onClick={()=>{
          setBright(!bright);
        }}
        className={`px-5 flex justify-between items-center py-3 rounded-lg ${bright ?'bg-green-300':'bg-gray-800'} hover:bg-gray-200 hover:text-black transition-colors duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` ${bright ? 'bi bi-lightbulb-fill' :'bi bi-lightbulb-off-fill'}`} viewBox="0 0 16 16">
          <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>
      <LogOut />
      <div >
        <a
        className={`px-5 flex justify-between items-center py-3 rounded-lg ${bright ?'bg-green-300':'bg-gray-800'} hover:bg-gray-200 hover:text-black transition-colors duration-300`}
        href="https://calendar.google.com/calendar" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Appbar;
