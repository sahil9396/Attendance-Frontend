import { theday as TheDay } from "../Others/HomePage";
import { useState,useEffect } from 'react'
import { useContextApi } from "../contexAPi/ContextApi";
import axios from 'axios';
import { URL } from "../contexAPi/OtherThings";

interface HomePageCompProps {
  vals: TheDay;
}

// export function HomePageComp1({ vals }: HomePageCompProps) {
//     const heightchange = 28;
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedOption(e.target.value);
//     };
//     const {todaysCourses, allDisabled_count,setAllDisabled_count , bright , userInfo,accessToken} = useContextApi();
//     const weekdaylist =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const [fromLocalStorage, setFromLocalStorage] = useState({day:"anything",check:false});

//     const sendData = async () => {
//       if ((fromLocalStorage.day === weekdaylist[new Date().getDay()] && fromLocalStorage.check ) || (allDisabled_count.includes(vals.IndivCourse))) {
//         return;
//       }
  
//       if (selectedOption === null || selectedOption === "") {
//         alert("Please select an option!");
//         return;
//       }
  
//       let presentDay = selectedOption;
  
//       if (presentDay === "1") {
//         vals.present += 1;
//       } else if (presentDay === "0") {
//         vals.absent += 1;
//       } else if (presentDay === "C") {
//         vals.cancelled += 1;
//       } else {
//         alert("Enter from the given options!!!");
//         return;
//       }
  
//       const formatOfChange = {
//         timeofcourse:vals.timeofcourse,
//         id: vals.id,
//         present: vals.present,
//         absent: vals.absent,
//         cancelled: vals.cancelled,
//         IndivCourse: vals.IndivCourse,
//       };
  
//       try {
//         const dat = await axios.put(
//           `${URL}/timetable/updater/updateAttendance`,
//           {...formatOfChange  , assignedBy: (userInfo.email),status: presentDay === "1" ? 'p':presentDay==="0" ? 'a' : 'c' },{
//             headers:{
//               Authorization: `Bearer ${accessToken}`
//             },
//             withCredentials:true,
//           }
//         );
//         setAllDisabled_count([...allDisabled_count, vals.IndivCourse]);
//         if (allDisabled_count.length === (todaysCourses.courses.length-1)) {
//           const date = new Date();
//           localStorage.setItem("DayCheck", JSON.stringify({ day: weekdaylist[date.getDay()] , check: true }));
//         }
//         // alert("Click here to See update on your calendar!!!")
//         alert(`Click here to See update on your calendar!!! : ${dat.data.createdData.htmlLink}`);
//       } catch (error) {
//         console.error(error);
//         alert("Something went wrong");
//       }
//     };

//     useEffect(() => {
//       const val = localStorage.getItem('DayCheck');
//       if(val){
//         const ParsedVal = JSON.parse(val || '')
//         setFromLocalStorage(ParsedVal);
//       }
//     }, [])
    

//     return (
//       <div className={`min-h-${60} lg:min-w-96 shadow-md border rounded-2xl overflow-hidden flex flex-col items-center gap-5 py-5  ${Math.round(( vals.present / (vals.present + vals.absent)) * 100) && ( (Math.round((vals.present / (vals.present + vals.absent)) * 100)) <= 75 ? `${ bright ? 'bg-gradient-to-b from-red-300 to-transparent':'shadow-md shadow-red-500 border-red-200' }`:`${ bright ? 'bg-gradient-to-b from-green-300 to-transparent':'shadow-md shadow-green-500 border-green-200' }`)} `}>
//         <div className={`min-h-${60 - heightchange} w-full flex justify-evenly items-center `}>{vals.IndivCourse} </div>
        
//         <div className={`w-full flex justify-between gap-3 px-3 `}>
//             <select
//               className={`text-center lg:text-md text-sm w-full shadow-md rounded-xl p-2 px-5 text-black ${bright ? 'bg-white':'bg-gray-800 text-white'}`}
//               value={selectedOption || ""}
//               onChange={handleChange}
//               >
//               <option value="">Select option...</option>
//               <option value="1">Present (1)</option>
//               <option value="0">Absent (0)</option>
//               <option value="C">Cancelled (C)</option>
//             </select>
//             <button
//             onClick={sendData}
//             className={`${
//               ( (fromLocalStorage.day === weekdaylist[new Date().getDay()] && fromLocalStorage.check ) || (allDisabled_count.includes(vals.IndivCourse)) )
//                 ? `${bright ? 'bg-gray-500':'bg-gray-200 text-white'} cursor-not-allowed`
//                 : `${bright ? 'bg-blue-500':'bg-gray-600 text-white'}`
//             } text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300`}
//             >Submit</button>
//         </div> 
//       </div>
//     );
// }

export function HomePageComp({ vals }: HomePageCompProps) {
  const heightchange = 28;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const { todaysCourses, allDisabled_count, setAllDisabled_count, bright, userInfo, accessToken } = useContextApi();
  const weekdaylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [fromLocalStorage, setFromLocalStorage] = useState<{
    day: string;
    submittedCourses: string[];
  }>({ day: "anything", submittedCourses: []});

  const sendData = async () => {
    const today = weekdaylist[new Date().getDay()];
    if ((fromLocalStorage.day === today && fromLocalStorage.submittedCourses.includes(vals.IndivCourse)) || (allDisabled_count.includes(vals.IndivCourse))) {
      return;
    }

    if (selectedOption === null || selectedOption === "") {
      alert("Please select an option!");
      return;
    }

    let presentDay = selectedOption;

    if (presentDay === "1") {
      vals.present += 1;
    } else if (presentDay === "0") {
      vals.absent += 1;
    } else if (presentDay === "C") {
      vals.cancelled += 1;
    } else {
      alert("Enter from the given options!!!");
      return;
    }

    const formatOfChange = {
      timeofcourse: vals.timeofcourse,
      id: vals.id,
      present: vals.present,
      absent: vals.absent,
      cancelled: vals.cancelled,
      IndivCourse: vals.IndivCourse,
    };

    try {
      // const dat = await axios.put(
      //   `${URL}/timetable/updater/updateAttendance`,
      //   { ...formatOfChange, assignedBy: userInfo.email, status: presentDay === "1" ? 'p' : presentDay === "0" ? 'a' : 'c' },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`
      //     },
      //     withCredentials: true,
      //   }
      // );
      const updatedSubmittedCourses = [...allDisabled_count, vals.IndivCourse];
      const updatedLocalStorage = {
        day: today,
        submittedCourses: updatedSubmittedCourses
      };

      localStorage.setItem("DayCheck", JSON.stringify(updatedLocalStorage));
      setFromLocalStorage(updatedLocalStorage);

      setAllDisabled_count([...allDisabled_count, vals.IndivCourse]);
      if (allDisabled_count.length === (todaysCourses.courses.length - 1)) {
        localStorage.setItem("DayCheck", JSON.stringify({ day: today, check: true, submittedCourses: updatedSubmittedCourses }));
      }

      // alert(`Click here to See update on your calendar!!! : ${dat.data.createdData.htmlLink}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const val:any = localStorage.getItem('DayCheck');
    if (val) {
      const ParsedVal = JSON.parse(val || '');
      if (ParsedVal.day === weekdaylist[new Date().getDay()]) {
        setFromLocalStorage(ParsedVal);
        setAllDisabled_count(ParsedVal.submittedCourses);
      }
    }
  }, []);

  return (
    <div className={`min-h-${60} lg:min-w-96 shadow-md border rounded-2xl overflow-hidden flex flex-col items-center gap-5 py-5 ${Math.round((vals.present / (vals.present + vals.absent)) * 100) && ((Math.round((vals.present / (vals.present + vals.absent)) * 100)) <= 75 ? `${bright ? 'bg-gradient-to-b from-red-300 to-transparent' : 'shadow-md shadow-red-500 border-red-200'}` : `${bright ? 'bg-gradient-to-b from-green-300 to-transparent' : 'shadow-md shadow-green-500 border-green-200'}`)} `}>
      <div className={`min-h-${60 - heightchange} w-full flex justify-evenly items-center `}>{vals.IndivCourse} </div>

      <div className={`w-full flex justify-between gap-3 px-3 `}>
        <select
          className={`text-center lg:text-md text-sm w-full shadow-md rounded-xl p-2 px-5 text-black ${bright ? 'bg-white' : 'bg-gray-800 text-white'}`}
          value={selectedOption || ""}
          onChange={handleChange}
        >
          <option value="">Select option...</option>
          <option value="1">Present (1)</option>
          <option value="0">Absent (0)</option>
          <option value="C">Cancelled (C)</option>
        </select>
        <button
          onClick={sendData}
          className={`${
            ((fromLocalStorage.day === weekdaylist[new Date().getDay()] && fromLocalStorage.submittedCourses.includes(vals.IndivCourse)) && (allDisabled_count.includes(vals.IndivCourse)))
              ? `${bright ? 'bg-gray-500' : 'bg-gray-200 text-white'} cursor-not-allowed`
              : `${bright ? 'bg-blue-500' : 'bg-gray-600 text-white'}`
          } text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300`}
        >Submit</button>
      </div>
    </div>
  );
}