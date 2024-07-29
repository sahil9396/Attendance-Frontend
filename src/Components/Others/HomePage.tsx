// import { useContextApi} from '../contextapi/contex_api';
import { useEffect } from 'react'
import { HomePageComp } from '../smallComponents/HomePageComp';
import { useContextApi} from "../contexAPi/ContextApi";
import { NoCoursesTHings } from '../contexAPi/OtherThings';

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
            <div className="text-gray-500 flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-center ">
              <p className={`text-xl font-bold ${bright ? '':'text-white'} `}> { todaysCourses.day} </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-normal lg:flex-row items-center gap-10 ">
              {todaysCourses.courses.map((course:theday,id:number) => (
                <HomePageComp key={id} vals={course} />
              ))}
            </div>
            
          </div> 
      </div>
    )
}


export default HomePage