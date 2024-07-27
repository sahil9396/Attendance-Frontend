import { useEffect , useState} from 'react';
import { useContextApi } from './contexAPi/ContextApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import AllApp from './Others/AllApp';
import { URL } from './contexAPi/OtherThings';

function FrontEndWaiting() {
    // setFutureEvents,turner ,setTurner
    const {userInfo, setUserInfo ,allcourses ,setAllcourses,day_with_alltheir_courses , setDay_with_alltheir_courses,futureEvents,setFutureEvents,turner ,setTurner ,accessToken} = useContextApi();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(true);

    const takeUserInfo = async(token:string)=>{
        try {
            const user = await axios.get(`${URL}/gapi/api/userinfo`,{
                headers:{
                    Authorization: `Bearer ${token}`
                },
                withCredentials:true
            });
            setUserInfo({...userInfo,...user.data.dataParses});
            return user.data.dataParses;
        } catch (error) {
            navigate("/login"); // Redirect to the login page
        }
    }

    const other_things = async (showlist:any) => {
        const first_event_time = new Date(showlist[0].start.date);
        const today = new Date();
        const weekndbool:Boolean = (today.getDay() === 0 || today.getDay() === 6);
        const holidaybool:Boolean = (first_event_time.getDate() - today.getDate() === 0);
        if (weekndbool && holidaybool) {
          setTurner({weekend:true , holiday:true});
        }
        else if(holidaybool){
          setTurner({...turner,holiday:true});
        }
        else if(weekndbool){
          setTurner({...turner,weekend:true});
        }
    }

    async function fetchFutureEvents() {
        try {
          const response = await axios.get(`${URL}/gapi/api/FutureEvents`,{
            headers:{
                Authorization:`Bears ${accessToken}`,
                username : userInfo.email
            },
            withCredentials:true
          });
          if (response.data.future_events.length != 0) {
            other_things(response.data.future_events);
            setFutureEvents(response.data.future_events);
          }
        } catch (error:any) {
            const today = new Date();
            const weekndbool:Boolean = (today.getDay() === 0 || today.getDay() === 6);
            if(weekndbool){
                setTurner({...turner,weekend:true});
            }
            if(error.message === "Network Error"){
                alert('Network Error: Please check your internet connection and try again.');
            }
            else{
                // alert('Error fetching data from events');
                navigate('/');
            }
        }
    }

    const fetchAllcourses = async () => {
        if (allcourses.length !== 0) {
            return ;
        }
        const dat = await axios.get(`${URL}/timetable/getallcourses?assignedBy=${userInfo.email}`);
        setAllcourses(dat.data.message);
        return dat.data.message;
    };

    async function fetchTimeTableData(sending_data: any) {
        if (sending_data.length === 0) {
          return;
        }
        try {
            const response = await axios.post(`${URL}/timetable/AlldataforTimeTable?assignedBy=${userInfo.email}` , {courseNames:sending_data},{withCredentials:true});
            setDay_with_alltheir_courses({first:response.data.daysWithTheirCourses,second:response.data.coursesWithTheirDays});
        } catch (error) {
        }
    }

    async function DoAllwork(){
        try {
            if (futureEvents.length === 0) {
                await fetchFutureEvents();
            }
            if (allcourses.length === 0) {
                const dat = await fetchAllcourses();
                dat.length !== 0 && await fetchTimeTableData(dat);
            }
            else{
                if (day_with_alltheir_courses.first.length === 0) {
                    await fetchTimeTableData(allcourses);
                }
            }
            setLoaded(false);
        } catch (error) {
            navigate("/login");
        }
    }
    
    async function fetchData(token:string) {
        userInfo.email ? await DoAllwork() : await takeUserInfo(token);
    }
    
    useEffect(() => {
        accessToken === ''? navigate('/login') : fetchData(accessToken) 
    }, [userInfo]);
    
    return (
        <div className='bg-black h-screen text-white font-mono'>
            {
                loaded ? <Loader/> : < AllApp />
            }
        </div>
    )
}

export default FrontEndWaiting