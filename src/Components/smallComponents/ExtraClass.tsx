import { useState,useEffect } from "react";
import axios from "axios";
import { URL } from "../contexAPi/OtherThings";
import { useContextApi } from "../contexAPi/ContextApi";

export function ExtraClass() {
    // const heightchange = 28;
    const {todaysCourses,allcourses, bright,userInfo,accessToken} = useContextApi();
    const [selectedOption, setSelectedOption] = useState({
        courseName: "",
        status: "",
    });
    const sendData = async () => {
        if (selectedOption.courseName === "" || selectedOption.status === "") {
            alert("Please select an option!");
            return;
        }
        const val = todaysCourses.courses.filter((val:any) => val.IndivCourse === selectedOption.courseName)[0];
        if(selectedOption.status === "1"){
            val.present += 1;
        } else if(selectedOption.status === "0"){
            val.absent += 1;
        }
        const permission = confirm("Are you sure you want to add it in calendar?");

        try {
            const dat = await axios.put(
                `${URL}/timetable/updater/extraClass?permission=${permission}`,
                {...val  , assignedBy: (userInfo.email),status:selectedOption.status},{
                  headers:{
                    Authorization: `Bearer ${accessToken}`
                  },
                  withCredentials:true,
                }
            );
            
            if (permission) {
                alert(`Click here to See update on your calendar!!! : ${dat.data.htmlLink}`);
            }
            else{
                alert("Your Extra Class has been saved!!!");
            }
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    }

    useEffect(() => {
    }, [selectedOption]);

    return (
      <div className={`min-h-${60} max-w-96 lg:w-4/5 mx-auto shadow-md border-2 rounded-2xl overflow-hidden flex flex-col items-center gap-5 py-5 `}>
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

        <div className={`w-full flex justify-between gap-3 px-3 `}>
            <select
              className={`text-center lg:text-md text-sm w-full shadow-md rounded-xl p-2 px-5 text-black ${bright ? 'bg-white':'bg-gray-800 text-white'}`}
              value={selectedOption.status || ""}
              onChange={(e)=>setSelectedOption({...selectedOption, status: e.target.value})}
              >
              <option value="">Select option...</option>
              <option value="1">Present (1)</option>
              <option value="0">Absent (0)</option>
            </select>
            <button
            onClick={sendData}
            className={`text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ${bright ? 'bg-blue-500':'bg-gray-600 text-white'}`}
            >Submit</button>
        </div> 
      </div>
    );
}
