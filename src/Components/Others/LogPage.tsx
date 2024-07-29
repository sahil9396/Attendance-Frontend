import { useState,useEffect } from "react"
import axios from "axios"
import { useContextApi } from "../contexAPi/ContextApi";
import { NoCoursesTHings, URL } from "../contexAPi/OtherThings";

const LogPage = ()=> {
    const {allcourses ,bright,userInfo,setAllcourses} = useContextApi();
    const ResetFn =()=>{
      axios.put(`${URL}/timetable/updater/resetAttendance`,{assignedBy:userInfo.email}).then(()=>{
        // console.log(respn.data);
        alert("Changes Done!!!");
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
            <div className="w-full  px-5 flex justify-between">
                <p className='text-2xl font-bold text-gray-400'> List</p>
                <button 
                onClick={ResetFn}
                className={`${bright ?'bg-red-400':'bg-red-800'} px-3 rounded-lg font-semibold text-white hover:bg-red-500 transition-colors duration-300`}>Reset Status</button>
            </div>
            <div className="flex flex-wrap lg:justify-evenly justify-evenly gap-10 py-3">
                {
                  allcourses.length ===0 ?<div className="flex justify-center items-center w-full"> < NoCoursesTHings/></div> : (allcourses.map((course:any,id:number) => (
                  <CourseCard key={id} course={course}  />
                  )))
                }
            </div>
        </div>
    );
};

const CourseCard = ({ course }: any) => {
    const { IndivCourse, Totaldays, absent, cancelled, criteria, present, timeofcourse } = course;
    const [daystogo, setDaystogo] = useState(0);
    const { bright } = useContextApi();
    
    const more_days_calculater = async () => {
      if (present === 0 && absent === 0) {
        return;
      }
      const buffer_day = 0;
      let further_days = 0;
      let stat = Math.round((present + further_days) * 100 / (absent + (present + further_days)));
      if (stat <= criteria) {
        while (stat <= (criteria + buffer_day)) {
          further_days += 1;
          stat = Math.round((present + further_days) * 100 / (absent + (present + further_days)));
        }
      } else if (stat > (criteria + buffer_day)) {
        while (stat > criteria) {
          further_days += 1;
          stat = Math.round((present) * 100 / (absent + (present + further_days)));
        }
      }
      setDaystogo(further_days);
      if (Totaldays - further_days <= 0) {
        // console.log("No days left");
      }
    };
  
    useEffect(() => {
      more_days_calculater();
    }, [present,absent,cancelled]);
  
    const attendancePercentage = Math.round(present * 100 / (absent + present)) || 0;
    const progressColor = attendancePercentage <= criteria ? 'red' : 'green';
  
    return (
      <div className={`min-w-60 max-w-60 border shadow-md rounded-3xl overflow-hidden ${bright ? 'bg-white border-black' : 'bg-gray-800 border-white border-2'}`}>
        <div className="flex justify-between items-center border-b px-6 py-5">
          <div className="w-2/3 flex flex-col">
            <p className="text-2xl font-semibold">{IndivCourse}</p>
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
    );
};

export default LogPage
