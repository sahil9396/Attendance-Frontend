import axios from 'axios'
import { URL } from '../contexAPi/OtherThings';
import { useContextApi } from '../contexAPi/ContextApi';
import { useNavigate } from 'react-router-dom';
function LogOut() {
    const {accessToken,userInfo,bright,setAllDisabled_count,setAllcourses,setFutureEvents} = useContextApi();
    const navigate = useNavigate();
    return (
    <div>
        <button
        className={`max-w-40 ${ bright ?'bg-red-500' :'bg-red-800' } text-white px-6 py-2 text-xl rounded-xl hover:bg-red-700 transition-colors duration-300 font-semibold`}
        onClick={()=>{
            axios.get(`${URL}/gapi/api/logout`,{
                headers:{
                    Authorization:`Beear ${accessToken}`,
                    username:userInfo.email
                },
                withCredentials:true
            }).then(()=>{
                setAllDisabled_count({first:[],second:[]});
                setAllcourses([]);
                setFutureEvents([]);
                navigate('/login');
            }).catch((error)=>{
                console.error(error);
                alert("Network Error!!!")
            })
        }}
        >
            <span >LogOut</span>
            {/* <span className={`lg:block hidden`} >LogOut</span>
            <span className={`lg:hidden block`} >Out</span> */}
        </button>
    </div>
    )
}

export default LogOut