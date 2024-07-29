// import { useContextApi} from '../contextapi/contex_api';
import { useEffect,useState } from 'react'
import { HomePageComp } from '../smallComponents/HomePageComp';
import { useContextApi} from "../contexAPi/ContextApi";
import { NoCoursesTHings } from '../contexAPi/OtherThings';
import { OptionButton } from './ProperTimeTableLog';
import { ExtraClass } from '../smallComponents/ExtraClass';
export interface theday{
  id:number,
  IndivCourse:string,
  timeofcourse:string,
  Totaldays:number,
  present:number,
  absent:number,
  cancelled:number,
  theday:number,
}

interface todaysCoursesType{
  courses:string[],
  day:string
}

function HomePage() {
    const {todaysCourses,setTodaysClasses,day_with_alltheir_courses,bright ,  allcourses} = useContextApi();
    const weekdaylist =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [show, setShow] = useState(true);

    
    const CourseSetter = async () => {
      if (day_with_alltheir_courses.first.length && allcourses.length ) {
        // const today = weekdaylist[4];
        const today = weekdaylist[new Date().getDay()];
        if (today === "Saturday" || today === "Sunday") {
          return;          
        }
        const todayExtractedCourses:todaysCoursesType = day_with_alltheir_courses.first.filter((val:todaysCoursesType) => val.day === today)[0];

        if (todayExtractedCourses === undefined) {
          setTodaysClasses({
            day: '',
            courses: []
          });
          return;
        }
        const courseDetails = todayExtractedCourses.courses.map((course:string) => {
          const courseDetails = allcourses.filter((val:theday) => val.IndivCourse === course);
          return courseDetails[0];
        });
        setTodaysClasses({
          day: today,
          courses: courseDetails
        });
      }
    }

    useEffect(() => {
      CourseSetter()
    }, [day_with_alltheir_courses]);

    if (todaysCourses.courses.length === 0) {
      return(
        <div className='min-w-96 py-10 px-5 '>
          <NoCoursesTHings />
        </div>
      )      
    }

    return (
      <div className='w-full py-10 px-5 '>
          <div className='w-full flex flex-col justify-center gap-10  '>
            <div className="flex flex-col md:flex-row gap-5 lg:gap-0 justify-between items-center ">
              <p className={`text-xl font-bold ${bright ? 'text-gray-500':`${show ? 'text-white':'text-gray-500'}`} `}> { todaysCourses.day} </p>
              <OptionButton clickFunction={()=>setShow(!show)} viewstateOption={!show}  optionName='Extra Class'/>
            </div>
            <div className="flex flex-wrap justify-center lg:flex-row items-center gap-10 ">
              {
                show ? todaysCourses.courses.map((course:theday,id:number) => (
                  <HomePageComp key={id} vals={course} />
                )) : <ExtraClass />
              }
            </div>
          </div> 
      </div>
    )
}


export default HomePage