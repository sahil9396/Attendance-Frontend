import axios from "axios"
import { useContextApi } from "../contexAPi/ContextApi";
import { URL } from "../contexAPi/OtherThings";
import { theday } from "../Others/HomePage";

interface dayWiththeirCourses{
  courses:string[],
  day:string
}
interface CoursesWithdays{
  course:string,
  day:string[]
}

export function DeleteCourse({dayname,daydelete}:{dayname:string,daydelete:boolean}) {
    const {day_with_alltheir_courses ,setDay_with_alltheir_courses , setAllcourses,allcourses,bright,userInfo} = useContextApi();
    
    const detecourse = ()=>{
      if (daydelete) {
        axios.get(`${URL}/timetable/deleter/deleteDay?day=${dayname}`,{
          headers:{
            AssignedBy:userInfo.email
          }
        }).then(()=>{
          const courselists:dayWiththeirCourses = day_with_alltheir_courses.first.filter((val:dayWiththeirCourses) => val.day === dayname)[0];

          let secondUpdate = day_with_alltheir_courses.second.map((valup:CoursesWithdays) =>{
            if((courselists.courses).includes(valup.course)){
              return {
                course:valup.course,
                day:valup.day.filter((data:string)=>data !== dayname)
              }
            }
            return valup
          })
          secondUpdate = secondUpdate.filter((val:CoursesWithdays)=>val.day.length !== 0);
          const newCourselists = secondUpdate.map((val:CoursesWithdays)=>val.course);
          const allCoursesUpdate = allcourses.filter((val:theday)=>newCourselists.includes(val.IndivCourse))
          setAllcourses(allCoursesUpdate);

          const firstUpdate = day_with_alltheir_courses.first.filter((val:dayWiththeirCourses) => val.day !== dayname);
          // console.log(day_with_alltheir_courses);
          // console.log(firstUpdate , allCoursesUpdate , secondUpdate);
          setDay_with_alltheir_courses({first:firstUpdate , second:secondUpdate})
        }).catch(()=>alert("Error in Deleting!!!"))

      }
      else{
        // const response = await 
        axios.get(`${URL}/timetable/deleter/deleteCourse?IndivCourse=${dayname}`,{
          headers:{
            AssignedBy:userInfo.email
          }
        }).then(()=>{
          const newCourses= allcourses.filter((val:any) => val.IndivCourse !== dayname)
          setAllcourses(newCourses);

          const secondUpdate = day_with_alltheir_courses.second.filter((val:any) => val.course !== dayname);

          const courseDetail:CoursesWithdays = day_with_alltheir_courses.second.filter((val:CoursesWithdays) => val.course === dayname)[0];
          let firstUpdate = day_with_alltheir_courses.first.map((valup:dayWiththeirCourses) =>{
            if((courseDetail.day).includes(valup.day)){
              return {
                day:valup.day,
                courses:valup.courses.filter((data:string)=>data !== dayname)
              }
            }
            return valup
          })

          firstUpdate = firstUpdate.filter((val:any)=>val.courses.length !== 0);
          setDay_with_alltheir_courses({first:firstUpdate,second:secondUpdate});
        }).catch(()=>alert("Error in Deleting!!!"))
      }
      // try {
      // } catch (error) {
      //   console.log(error);
      //   alert("Error in Deleting!!!")
      // }
    }

  return (
    <button onClick={detecourse} className={`shadow-sm ${bright?'bg-red-300 shadow-gray-200':'bg-red-500'} hover:bg-red-400 py-1 px-2 rounded-lg transition-colors duration-300 cursor-pointer flex justify-center items-center`}>
        X
    </button>
  )
}

export function DeleteAll() {
  const {setTodaysClasses,setAllcourses,setDay_with_alltheir_courses,bright,userInfo} = useContextApi();
  const detecourse =()=>{
    axios.get(`${URL}/timetable/deleter/deleteallCourse`,{
      headers:{
        AssignedBy:userInfo.email
      }
    }).then(()=>{
      setAllcourses([]);
      setDay_with_alltheir_courses({first:[],second:[]});
      setTodaysClasses({
        day: '',
        courses: []
      });
      alert("Your All Courses are Deleted!!!")
    }).catch (() =>{
      alert("Error in Deleting!!!")
    })
  //   try {
  //   } 
  //   catch (error) {
  //   alert("Error in Deleting!!!")
  // }
    }

  return (
      <div onClick={detecourse} className={`rounded-xl px-5 py-3 text-white ${bright ?'bg-red-400':'bg-red-800'} transition-all cursor-pointer transform hover:bg-red-400`}>
        
      DeleteAll
      </div>
  )
}
