import { useState, useEffect } from "react"
import {DeleteCourse , DeleteAll} from "../smallComponents/DeleteButtons";
import { useContextApi } from "../contexAPi/ContextApi";
import { CreateCourse } from "./CreateCourse";

export const ProperTimeTableLog = () => {
    const {allcourses , day_with_alltheir_courses , bright}  = useContextApi();
    const [viewstate, setViewstate] = useState({
      createCourseVeiw: true,
      DayVeiw: false,
      CourseVeiw: false,
    });
    
    useEffect(() => {
      // console.log("From land",day_with_alltheir_courses);
      allcourses.length === 0 ? true : setViewstate({createCourseVeiw:false,DayVeiw:false,CourseVeiw:true});
    }, [])

    return (
      <div className="w-full font-sans p-6 border-b border-black flex flex-col justify-center items-center gap-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-5">
          <p className="w-full text-3xl text-gray-500 text-center lg:text-left">{viewstate.createCourseVeiw ? 'Create a New Course':'Time Table'}</p>
          {
            viewstate.CourseVeiw || viewstate.DayVeiw ? < DeleteAll /> : null
          }
          <div  className="flex px-5 justify-center gap-8 py-2">
            <OptionButton clickFunction={()=>setViewstate({createCourseVeiw:false,DayVeiw:false,CourseVeiw:true})} viewstateOption={viewstate.CourseVeiw} optionName={'CourseWise'} />
            <OptionButton clickFunction={()=>setViewstate({createCourseVeiw:false,DayVeiw:true,CourseVeiw:false})} viewstateOption={viewstate.DayVeiw} optionName={'DayWise'} />
            <button 
            onClick={()=>setViewstate({createCourseVeiw:true,DayVeiw:false,CourseVeiw:false})}
            className={`bg-green-600 text-white hover:bg-blue-700' px-3 lg:px-6 py-2 lg:text-xl rounded-xl  transition-colors duration-300 shadow-md ${bright?'shadow-gray-200':'shadow-none'} `}>Create</button>
          </div>
          
        </div>
        {
          viewstate.createCourseVeiw ? <CreateCourse /> : (
              viewstate.CourseVeiw ? <CourseCard courseList={day_with_alltheir_courses.second}/> : (viewstate.DayVeiw ? <DaysList days={day_with_alltheir_courses.first}/> : <CreateCourse />)
          )
        }
      </div>
    )
}

const OptionButton = ({clickFunction , viewstateOption , optionName}:any) =>{
  const { bright}  = useContextApi();
  // console.log(viewstateOption);
  return(
    <button 
      onClick={clickFunction}
      className={`${viewstateOption ? 'bg-gray-800 text-white': 'bg-gray-300 text-black hover:text-white hover:bg-gray-800'}   px-3 lg:px-6 py-2 lg:text-xl rounded-xl  transition-colors duration-300 shadow-md ${bright?'shadow-gray-200':'shadow-none'} `}>{optionName}</button>
  )
}

const DaysList: React.FC<any> = ({ days }) => {
  const {bright}  = useContextApi();
  return (
    // bg-red-300 , lg:rotate-0
    <div className="w-2/3 min-w-96 overflow-x-auto lg:p-5 flex justify-center items-center">
      <table className={`min-w-full table-auto ${bright ?'bg-white' :'bg-gray-800 text-white border-2 border-white'} shadow-md rounded-lg overflow-hidden`}>
        <thead className={`${bright ?'bg-gray-300' :'bg-black text-white'}`}>
          <tr>
            <th className="px-4 py-2 text-red-600">Actions</th>
            <th className="px-4 py-2 text-white">Day</th>
            <th className="px-4 py-2 text-white">Courses</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {days.map((day:any,id:number) => (
            <tr key={id} className="border-b border-gray-300 w-full ">
              <td className="py-5 min-h-full text-center border-r">
                <div className="flex justify-center items-center">
                  <DeleteCourse daydelete={true} dayname={day.day} />
                </div>
              </td>
              <td className="px-4 py-5 text-center font-semibold border-r">{day.day}</td>
              <td className="px-5 py-5 text-center flex flex-wrap lg:flex-nowrap lg:flex-row justify-center items-center gap-5">
                {day.courses.map((thedays:any,id1:number) => (
                  <span key={id1} className="block">{thedays}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  
const CourseCard: React.FC<any> = ({ courseList }) => {
  const {bright}  = useContextApi();

  return (
    <div className="w-2/3 min-w-96 p-5 flex justify-center items-center">
      <table className={`min-w-full table-auto ${bright ?'bg-white' :'bg-gray-800 text-white border-2 border-white'} shadow-md rounded-lg overflow-hidden`}>
        <thead className={`${bright ?'bg-gray-300' :'bg-black text-white'}`}>
          <tr>
            <th className="px-4 py-2 w-1/5 text-red-600 ">Actions</th>
            <th className="px-4 py-2 text-white">Day</th>
            <th className="px-4 py-2 text-white">Courses</th>
          </tr>
        </thead>
        <tbody>
          {courseList.map((theobject:any,id:number) => (
            <tr key={id} className="border-b border-gray-300 ">
              <td className="px-4 py-3 text-center border-r">
                <div className="flex justify-center items-center">
                  <DeleteCourse daydelete={false} dayname={theobject.course} />
                </div>
              </td>
              <td className="px-4 py-3 text-center font-semibold border-r">{theobject.course}</td>
              <td className="px-4 py-3 text-center flex flex-wrap lg:flex-nowrap lg:flex-row justify-center items-center gap-5">
                {theobject.day.map((thedays:any,id1:number) => (
                  <span key={id1} className="block ">{thedays}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};