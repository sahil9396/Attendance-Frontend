import { useState,useEffect } from "react"
import axios from "axios"
import { useContextApi } from "../contexAPi/ContextApi";
import { NoCoursesTHings, URL } from "../contexAPi/OtherThings";
import { ChangeThings } from "../smallComponents/ChangeThings";
import { OptionButton } from './ProperTimeTableLog';

const LogPage = ()=> {
    const {allcourses ,bright,userInfo,setAllcourses,accessToken} = useContextApi();
    const [Viewer, setViewer] = useState(false);
    const ResetFn =()=>{
      axios.put(`${URL}/timetable/updater/resetAttendance`,{assignedBy:userInfo.email},{withCredentials:true , headers:{
        Authorization:`Beeaer ${accessToken}`
      }}).then(()=>{
        alert("Changes Done And refresh to see it!!!");
        setAllcourses(allcourses.map((val:any)=>({...val , present: 0,absent: 0,cancelled: 0})))
        localStorage.clear()
      }).catch( (error)=>alert(error))
      // try {
      // } catch (error) {
      //     // console.log(error);
      //     alert("Error resetting status");
      // }
    }
    return (
        <div className={`w-full flex flex-col gap-3 border-b ${ bright ? 'border-black' : 'border-white'} py-5`}>
            <div className="w-full  px-5 flex flex-col sm:flex-row justify-between gap-5">
              {/* ${bright ? 'text-gray-500':`${ Viewer? 'text-white':'text-gray-500'} */}
                <p className={`text-2xl font-bold text-gray-400 text-center ${bright ?'text-gray-500':`${ !Viewer? 'text-white':'text-gray-500'}`} `}> List</p>
                <div className="flex justify-center gap-5 px-3" >
                  {
                    !Viewer && <button 
                      onClick={ResetFn}
                      className={`${bright ?'bg-red-400':'bg-red-800'} px-3 py-2 rounded-lg font-semibold text-white hover:bg-red-500 transition-colors duration-300`}>Reset Status</button>
                  }
                  {
                    allcourses.length !==0 && <OptionButton clickFunction={()=>setViewer(!Viewer)} viewstateOption={Viewer}  optionName='Change Things'/>
                  }
                </div>
            </div>
            {
              allcourses.length ===0 ?<div className="flex justify-center items-center w-full"> < NoCoursesTHings/></div> : <div className="flex overflow-x-auto lg:justify-evenly justify-evenly gap-10 py-3">
                {
                  Viewer ? <ChangeThings/> : allcourses.map((course:any,id:number)=>(
                    <CourseCard key={id} course={course}/>
                  ))
                }
              </div>
            }
        </div>
    );
};

const CourseCard = ({ course }: any) => {
  const { IndivCourse, Totaldays, absent, cancelled, criteria, present, timeofcourse } = course;
  const [daystogo, setDaystogo] = useState(0);
  const { bright } = useContextApi();

  const more_days_calculater = async () => {
    // If there are no records, no further days are needed.
    if (present === 0 && absent === 0) {
      setDaystogo(0);
      return;
    }
  
    // Calculate current attendance percentage
    const currentPercentage = Math.round((present * 100) / (absent + present));
    
    // If the current attendance meets or exceeds the criteria, no further days are needed
    if (currentPercentage >= criteria) {
      setDaystogo(0);
      return;
    }
  
    // Calculate the minimum number of additional days required to meet the criteria
    // Solve for further_days in the equation: (present + further_days) / (absent + present + further_days) * 100 >= criteria
    const further_days = Math.ceil((criteria * (absent + present) - 100 * present) / (100 - criteria));
    
    // If the further_days is more than the remaining days, set it to remaining days
    const remainingDays = Totaldays - (present + absent);
    if (further_days > remainingDays) {
      setDaystogo(remainingDays);
    } else {
      setDaystogo(further_days);
    }
  };

  useEffect(() => {
    more_days_calculater();
  }, [present, absent, cancelled]);

  const attendancePercentage = Math.round(present * 100 / (absent + present)) || 0;
  const progressColor = attendancePercentage <= criteria ? 'red' : 'green';
  const remainingDays = Totaldays - (present + absent + cancelled);

  return (
    <div className={`min-w-60 max-w-60 border shadow-md rounded-3xl overflow-hidden ${bright ? 'bg-white border-black' : 'shadow-gray-600 border-gray-800'} `}>
      <div>
      <p className={`text-2xl pt-5 font-semibold w-full text-center ${attendancePercentage > criteria ? 'text-green-500' : 'text-red-500'}`}>{IndivCourse}</p>
      <div className={`flex justify-between items-center border-b ${bright ? 'border-black':'shadow-gray-600 border-gray-600'}  px-6 py-3`}>
        <div className="w-2/3 flex flex-col">
          {/* <p className="text-2xl font-semibold bg-red-400 w-full">{IndivCourse}</p> */}
          <div className="text-sm mt-2">
            <p><strong>Time:</strong> {timeofcourse}</p>
            <p><strong>Total Days:</strong> {Totaldays}</p>
            <p><strong>Present:</strong> {present}</p>
            <p><strong>Absent:</strong> {absent}</p>
            <p><strong>Cancelled:</strong> {cancelled}</p>
            <p><strong>Minimum Attendance:</strong> {criteria}%</p>
          </div>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full">
              <circle className="text-gray-300" strokeWidth="4" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32" />
              <circle
                className={`text-${progressColor}-500`}
                strokeWidth="4"
                strokeDasharray={`${attendancePercentage}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="28"
                cx="32"
                cy="32"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
              {attendancePercentage}%
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 text-center">
        {daystogo === 0 ? (
          <strong className="text-green-500">You are on track</strong>
        ) : remainingDays <= daystogo ? (
          <strong className="text-red-500">Not enough days left to meet criteria <span className={`${bright?'text-black':'text-white'}`}>{remainingDays}</span></strong>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg font-semibold">{daystogo}</span>
            <strong className={`text-lg font-semibold ${attendancePercentage > criteria ? 'text-green-500' : 'text-red-500'}`}>
              {attendancePercentage > criteria ? "Your Wish" : "Days"} To Go
            </strong>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default LogPage
