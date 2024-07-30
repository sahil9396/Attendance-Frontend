import { useState,useEffect } from "react";
import axios from "axios";
import { URL } from "../contexAPi/OtherThings";
import { useContextApi } from "../contexAPi/ContextApi";
import {InputTaker,DaySelector} from "../Others/CreateCourse";

export function ChangeThings() {
    const inputFields  = [
        { attri: 'Criteria ', key: 'criteria' },
        { attri: 'Total Days', key: 'Totaldays' },
    ]
    const [daycheck, setDayCheck] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false
    });
    const {todaysCourses,allcourses, bright,userInfo,accessToken} = useContextApi();
    const [selectedOption, setSelectedOption] = useState({
        courseName: "",
        criteria: "",
        Totaldays: "",
    });

    const sendData = async () => {
        if (selectedOption.courseName === "" ) {
            alert("Please select an option!");
            return;
        }
        const val = todaysCourses.courses.filter((val:any) => val.IndivCourse === selectedOption.courseName)[0];
        const permission = confirm("Are you sure you want to update the course?");

        if (!permission) {
            return;
        }
        const selectedDays = Object.entries(daycheck).filter(val => val[1] === true).map(val => val[0]);
        axios.put(
            `${URL}/timetable/updater/updateCourseThings`,
            {...val ,criteria : (selectedOption.criteria || val.criteria),Totaldays:(selectedOption.Totaldays || val.Totaldays),daysChange:selectedDays , assignedBy: (userInfo.email),},{
              headers:{
                Authorization: `Bearer ${accessToken}`
              },
              withCredentials:true,
            }
        ).then(() => {
            alert("Your Changes are done!!!");
        }).catch((error) => {
            alert("Something went wrong");
            console.error(error);
        });
        // try {
        // } catch (error) {
        //     alert("Something went wrong");
        //     console.error(error);
        // }
    }

    useEffect(() => {
    }, [selectedOption]);

    return (
      <div className={`min-h-${60} max-w-96 lg:w-4/5 mx-auto  shadow-md border ${bright ? '':'shadow-gray-600 border-gray-800'} rounded-2xl overflow-hidden flex flex-col items-center gap-5 py-5 `}>
        <div className={`w-full flex justify-between gap-3 px-3 `}>
            <select
              className={`text-center lg:text-md text-sm w-full shadow-md rounded-xl p-2 px-5 text-black ${bright ? 'bg-white':'bg-gray-800 text-white'}`}
              value={selectedOption.courseName || ""}
              onChange={(e)=>setSelectedOption({...selectedOption, courseName: e.target.value})}
              >
              <option value="">Select Course...</option>
                {
                    allcourses.map((course:any,id:number) => (
                        <option key={id} value={course.IndivCourse}>{course.IndivCourse}</option>
                    ))
                }
            </select>
        </div> 

        <div className={`w-full flex flex-col flex-wrap justify-between gap-3 px-3 `}>
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
        <div className={`w-full flex flex-wrap justify-center gap-3 px-3 `}>
            {Object.keys(daycheck).map((day:string, id:number) => (
                <DaySelector
                key={id}
                day={day}
                isSelected={Object.values(daycheck)[id]}
                toggleDay={() => setDayCheck({ ...daycheck, [day]: !Object.values(daycheck)[id] })}
                />
            ))}
        </div>
        <div className={`flex flex-col items-center justify-between gap-3 `}>
            {inputFields.map((inputField, index) => (
            <InputTaker
                key={index}
                attri={inputField.attri}
                handler={(e:React.ChangeEvent<HTMLInputElement>) => setSelectedOption({...selectedOption, [inputField.key]: e.target.value})}
            />
            ))}
        </div>
            <button
            onClick={sendData}
            className={`text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ${bright ? 'bg-blue-500':'bg-gray-600 text-white'}`}
            >Submit</button>
        </div> 
      </div>
    );
}
