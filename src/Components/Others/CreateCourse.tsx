// import { useState} from "react"
// import axios from "axios";
// import { useContextApi } from "../contexAPi/ContextApi";
// import {TimePicker} from "../contexAPi/OtherThings";
// import {URL} from "../contexAPi/OtherThings";

// interface InputDataType {
//   IndivCourse: string;
//   startTime: string;
//   endTime: string;
//   Totaldays: number;
//   present: number;
//   absent: number;
//   cancelled: number;
//   criteria:number;
//   // day: string[];
// }

// export const CreateCourse = () => {
//   const { allcourses, setAllcourses,day_with_alltheir_courses,setDay_with_alltheir_courses ,bright,userInfo} = useContextApi();
//   const [inputData, setInputData] = useState<InputDataType>({
//     IndivCourse: "",
//     startTime: "",
//     endTime: "",
//     Totaldays: 35,
//     present: 0,
//     absent: 0,
//     cancelled: 0,
//     criteria: 75,
//   });
//   const [daycheck, setDayCheck] = useState({
//     Monday: false,
//     Tuesday: false,
//     Wednesday: false,
//     Thursday: false,
//     Friday: false
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof InputDataType) => {
//     const value = field === 'Totaldays' || field === 'present' || field === 'absent' || field === 'cancelled'
//       ? Number(e.target.value.trim()) || 0
//       : e.target.value.trim();
//     setInputData({ ...inputData, [field]: value });
//   };

//   const createCourse = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputData.IndivCourse || !inputData.startTime || !inputData.endTime) {
//       alert("Please fill in all the required fields.");
//       return;
//     }
//     try {
//       const selectedDays = Object.entries(daycheck).filter(val => val[1] === true).map(val => val[0]);
//       if (selectedDays.length === 0) {
//         alert("Please select at least one day.");
//         return;
//       }

//       const response = await axios.post(`${URL}/timetable/create`, { inputData, day: selectedDays ,assignedBy:( userInfo.email)});
//       if (response.data.exists) {
//         alert(response.data.message);
//         return;
//       }
//       const newEntry = {
//         course: inputData.IndivCourse,
//         day: selectedDays
//       }
//       const UpdateFirst = day_with_alltheir_courses.first.map((val:any) => {
//         if(selectedDays.includes(val.day)){
//           return {...val,courses:[...val.courses,inputData.IndivCourse]}
//         }
//         return val;
//       });

//       setDay_with_alltheir_courses({first:UpdateFirst,second:[...day_with_alltheir_courses.second,newEntry]});
      
//       setAllcourses([...allcourses, response.data.message]);  
//       console.log(response.data.message);
      
//       alert("Course added successfully. Please refresh the page to see the changes.");

//     } catch (error) {
//       console.error('Error creating course:', error);
//     }
//   };

//   return (
//     <div className="w-full px-5 py-5">
//       <form onSubmit={createCourse} className="flex flex-col lg:flex-row justify-center gap-6 items-center">
//         <div className="lg:w-3/4 flex flex-wrap justify-evenly gap-10 lg:px-10 py-5">
//           <InputTaker
//             changeValue={(e) => handleInputChange(e, 'IndivCourse')}
//             attri="Course Name"
//             required
//           />
//           <InputTaker
//             changeValue={(e) => handleInputChange(e, 'criteria')}
//             attri="Criteria : 75%"
//           />
//           <InputTaker
//             changeValue={(e) => handleInputChange(e, 'Totaldays')}
//             attri="Total Days : 35"
//           />
//           <InputTaker
//             changeValue={(e) => handleInputChange(e, 'present')}
//             attri="P : 0"
//           />
//           <InputTaker
//             changeValue={(e) => handleInputChange(e, 'absent')}
//             attri="A : 0"
//           />
//           <InputTaker
//             changeValue={(e) => handleInputChange(e, 'cancelled')}
//             attri="Cancelled : 0"
//           />
//           <div className="flex justify-center items-center flex-wrap md:flex-nowrap">
//             <TimePicker timeSet={(val: string) => {
//               setInputData({ ...inputData, startTime: val });
//             }} />
//             <p className="mx-2">to</p>
//             <TimePicker timeSet={(val: string) => {
//               setInputData({ ...inputData, endTime: val });
//             }} />
//           </div>
//         </div>
//         <div className="lg:w-1/4">
//           <div className="w-full h-full flex flex-col items-center justify-evenly gap-10">
//             <div className="flex justify-center gap-6">
//               <button type="button" onClick={() => setDayCheck({ Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true })} className={`${ bright ?'bg-green-300' :'bg-green-800' } rounded-lg py-1 px-5 hover:bg-blue-300`}>
//                 Select All
//               </button>
//               <button type="button" onClick={() => setDayCheck({ Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false })} className={`${ bright ?'bg-red-300' :'bg-red-800' } rounded-lg py-1 px-5 hover:bg-red-300`}>
//                 Remove All
//               </button>
//             </div>
//             <div className="flex w-full flex-wrap justify-center gap-6">
//               {Object.keys(daycheck).map((day, id) => (
//                 <DaySelector
//                   key={id}
//                   day={day}
//                   isSelected={daycheck[day]}
//                   toggleDay={() => setDayCheck({ ...daycheck, [day]: !daycheck[day] })}
//                 />
//               ))}
//             </div>
//             <button type="submit" className={`max-w-40 ${ bright ?'bg-green-500' :'bg-green-800' } text-white px-6 py-2 text-xl rounded-xl hover:bg-blue-700 transition-colors duration-300`}>
//               Create
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// const InputTaker = ({ attri, changeValue, required = false }: { attri: string; changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean }) => {
//   const { bright } = useContextApi();
//   return (
//     <div>
//       <input
//         onChange={changeValue}
//         type="text"
//         className={`text-lg border-b ${bright ? 'border-black bg-white' : 'bg-black border-white'} text-center py-2`}
//         placeholder={attri}
//         required={required}
//       />
//     </div>
//   );
// };

// const DaySelector = ({ day, isSelected, toggleDay }: { day: string; isSelected: boolean; toggleDay: () => void }) => {
//   const { bright } = useContextApi();
//   return(
//     <div
//       onClick={toggleDay}
//       className={`py-2 px-4 rounded-lg hover:scale-125 ${isSelected ? `bg-blue-500 hover:text-black ${bright ? ' text-white ' : ''}` : `${bright ? 'bg-gray-100 text-black ' : 'bg-gray-500 text-black hover:text-white'}`} shadow-md cursor-pointer transition-colors`}
//     >
//       {day}
//     </div>
//   )
// };
import React, { useState } from "react";
import axios from "axios";
import { useContextApi } from "../contexAPi/ContextApi";
import { TimePicker } from "../contexAPi/OtherThings";
import { URL } from "../contexAPi/OtherThings";

interface InputDataType {
  IndivCourse: string;
  startTime: string;
  endTime: string;
  Totaldays: number;
  present: number;
  absent: number;
  cancelled: number;
  criteria: number;
}

// const InputTaker = ({attri,changeValue,required = false}: {attri: string;changeValue: (e: React.ChangeEvent<HTMLInputElement>)=> void;required?: boolean;}) => {
//   const { bright } = useContextApi();
//   return (
//     <div>
//       <input
//         onChange={changeValue}
//         type="text"
//         className={`text-lg border-b ${bright ? 'border-black bg-white' : 'bg-black border-white'} text-center py-2`}
//         placeholder={attri}
//         required={required}
//       />
//     </div>
//   );
// };

const InputTaker = ({ attri, handler }:{attri:string, handler:any}) => {
  const { bright } = useContextApi();
  return (
    <div>
      <input className={`text-lg border-b ${bright ? 'border-black bg-white' : 'bg-black border-white'} text-center py-2`} type="text" placeholder={attri} onChange={handler} />
    </div>
  );
};

const DaySelector = ({
  day,
  isSelected,
  toggleDay
}: {
  day: string;
  isSelected: boolean;
  toggleDay: () => void;
}) => {
  const { bright } = useContextApi();
  // console.log(isSelected)
  return (
    <div
      onClick={toggleDay}
      className={`py-2 px-4 rounded-lg hover:scale-125 ${isSelected ? `bg-blue-500 hover:text-black ${bright ? ' text-white ' : ''}` : `${bright ? 'bg-gray-100 text-black ' : 'bg-gray-500 text-black hover:text-white'}`} shadow-md cursor-pointer transition-colors`}
    >
      {day}
    </div>
  );
};

export const CreateCourse = () => {
  const { allcourses, setAllcourses, day_with_alltheir_courses, setDay_with_alltheir_courses, bright, userInfo } = useContextApi();
  const [inputData, setInputData] = useState<InputDataType>({
    IndivCourse: "",
    startTime: "",
    endTime: "",
    Totaldays: 35,
    present: 0,
    absent: 0,
    cancelled: 0,
    criteria: 75,
  });
  const [daycheck, setDayCheck] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false
  });
  const inputFields  = [
    { attri: 'Course Name', key: 'IndivCourse' },
    { attri: 'Criteria : 75%', key: 'criteria' },
    { attri: 'Total Days : 35', key: 'Totaldays' },
    { attri: 'P : 0', key: 'present' },
    { attri: 'A : 0', key: 'absent' },
    { attri: 'Cancelled : 0', key: 'cancelled' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = field === 'Totaldays' || field === 'present' || field === 'absent' || field === 'cancelled'
      ? Number(e.target.value.trim()) || 0
      : e.target.value.trim();
    setInputData({ ...inputData, [field]: value });
  };

  const validateTime = (start: string, end: string): boolean => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
      return false;
    }
    return true;
  };

  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputData.IndivCourse || !inputData.startTime || !inputData.endTime) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!validateTime(inputData.startTime, inputData.endTime)) {
      alert("Start time cannot be greater than or equal to the end time.");
      return;
    }

    try {
      const selectedDays = Object.entries(daycheck)
        .filter(val => val[1] === true)
        .map(val => val[0]);
      
      if (selectedDays.length === 0) {
        alert("Please select at least one day.");
        return;
      }

      const response = await axios.post(`${URL}/timetable/create`, { inputData, day: selectedDays, assignedBy: userInfo.email });
      if (response.data.exists) {
        alert(response.data.message);
        return;
      }
      console.log(response.data , inputData);
      // return;

      const newEntry = {
        course: inputData.IndivCourse,
        day: selectedDays
      };
      const UpdateFirst = day_with_alltheir_courses.first.map((val: any) => {
        if (selectedDays.includes(val.day)) {
          return { ...val, courses: [...val.courses, inputData.IndivCourse] };
        }
        return val;
      });

      setDay_with_alltheir_courses({ first: UpdateFirst, second: [...day_with_alltheir_courses.second, newEntry] });
      setAllcourses([...allcourses, response.data.message]);
      
      alert("Course added successfully. Please refresh the page to see the changes.");

    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="w-full px-5 py-5">
      <form onSubmit={createCourse} className="flex flex-col lg:flex-row justify-center gap-6 items-center">
        <div className="lg:w-3/4 flex flex-wrap justify-evenly gap-10 lg:px-10 py-5">
            {inputFields.map((inputField, index) => (
              <InputTaker
                key={index}
                attri={inputField.attri}
                handler={(e:React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, inputField.key)}
              />
            ))}
          <div className="flex justify-center items-center flex-wrap md:flex-nowrap">
            <TimePicker timeSet={(val: string) => setInputData({ ...inputData, startTime: val })} />
            <p className="mx-2">to</p>
            <TimePicker timeSet={(val: string) => setInputData({ ...inputData, endTime: val })} />
          </div>
        </div>
        <div className="lg:w-1/4">
          <div className="w-full h-full flex flex-col items-center justify-evenly gap-10">
            <div className="flex justify-center gap-6">
              <button
                type="button"
                onClick={() => setDayCheck({ Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true })}
                className={`${bright ? 'bg-green-300' : 'bg-green-800'} rounded-lg py-1 px-5 hover:bg-blue-300`}
              >
                Select All
              </button>
              <button
                type="button"
                onClick={() => setDayCheck({ Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false })}
                className={`${bright ? 'bg-red-300' : 'bg-red-800'} rounded-lg py-1 px-5 hover:bg-red-300`}
              >
                Remove All
              </button>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-6">
              {Object.keys(daycheck).map((day:string, id:number) => (
                <DaySelector
                  key={id}
                  day={day}
                  isSelected={Object.values(daycheck)[id]}
                  // isSelected={daycheck[day]}
                  toggleDay={() => setDayCheck({ ...daycheck, [day]: !Object.values(daycheck)[id] })}
                />
              ))}
            </div>
            <button type="submit" className={`max-w-40 ${bright ? 'bg-green-500' : 'bg-green-800'} text-white px-6 py-2 text-xl rounded-xl hover:bg-blue-700 transition-colors duration-300`}>
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};