import { useContextApi } from "../contexAPi/ContextApi";
import { OptionButton } from "../Others/ProperTimeTableLog";
import { useState } from "react";
import { ExtraClass } from "./ExtraClass";
interface HolidayProps {
    eventstat: boolean;
    weekendstat: boolean;
}

export const Holiday: React.FC<HolidayProps> = ({ eventstat,weekendstat }) => {
  const {futureEvents,bright,allcourses} = useContextApi();
  const [show, setShow] = useState(false);
  return(
    <div className="w-full flex flex-col items-center justify-center gap-5">
      {
        allcourses.length ===0? null : <div className="w-full flex justify-center sm:justify-end md:px-2">
          <OptionButton clickFunction={()=>setShow(!show)} viewstateOption={!show}  optionName='Extra Class'/>
        </div>
      }
      {
        show? <ExtraClass/> : <div className={`max-w-sm rounded-lg overflow-hidden shadow-lg ${bright ? '' :'shadow-lg shadow-red-500'} m-4 bg-gradient-to-r ${bright? 'from-green-100 to-green-20':''}0 animate-fadeIn flex flex-col`}>
        {
          weekendstat? <h1 className={`text-2xl font-bold ${ bright? 'text-gray-800' :'text-white'} mb-2 p-6 font-mono`}>It's weekend</h1> : <></>
        }
        <div className="w-full border-b-2 border-white"></div>
        {
          !eventstat? <></>:(
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{futureEvents[0].name}</h2>
              <p className="text-lg text-green-700 mb-4">{futureEvents[0].date}</p>
              <p className="text-gray-700 text-base">{futureEvents[0].description}</p>
            </div>
          )
        }
      </div>
      }
    </div>
  )
};