import { useState , useEffect } from 'react';
import axios from 'axios';
import { URL } from './contexAPi/OtherThings';
import { useGoogleLogin } from '@react-oauth/google';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useContextApi } from './contexAPi/ContextApi';

function SignIn() {
    const [needToSignIn, setNeedToSignIn] = useState(true);
    const [loaderState, setLoaderState] = useState(true);
    const navigate = useNavigate();
    const {setAccessToken,setBright,bright} = useContextApi();

    const redirectToDashBoard =async () => {
        navigate('/dashboard');
    };

    const checkLogin = async () => {
        try {
            const response = await axios.get(`${URL}/gapi/api/auth/check`,{withCredentials:true});
            if(response.data.LoginIn){
                setNeedToSignIn(false);
                setAccessToken(response.data.token);
            }
            setLoaderState(false);
        } catch (error:unknown) {
            console.error(error);
            alert(` ${error}`);
            // alert(`Network Error ${error}`);
        }
    }

    const handleSuccess = async (codeResponse: any) => {
        try {
            const response = await axios.get(`${URL}/gapi/api/oauth2callback`,{
                headers:{
                  Authorization: `Bearer ${codeResponse.code}`,
                },
                withCredentials:true
            });
            setAccessToken(response.data.token.access_token);
            redirectToDashBoard();
        } catch (error:unknown) {
            console.error(error);
            alert(` ${error}`);
            // alert(`Network Error ${error}`);            
        }
    }

    const login = useGoogleLogin({
        onSuccess:(codeResponse) => handleSuccess(codeResponse),
        onError: (error) => console.error('Error:', error),
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/calendar',
    });

    useEffect(() => {
        checkLogin();
    }, [])

    if (loaderState) {
        return <Loader />;
    }

    return (
        <div className={`h-screen bg-black flex flex-col text-white font-bold ${bright ? 'bg-white':'bg-black'}`}>
            <div className={`flex justify-end w-full px-12 py-5`}>
                <button
                    onClick={()=>{
                        setBright(!bright);
                    }}
                    className={`px-5 flex justify-between items-center py-3 rounded-lg ${bright ?'bg-green-300':'bg-gray-800'} hover:bg-gray-200 hover:text-black transition-colors duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` ${bright ? 'bi bi-lightbulb-fill' :'bi bi-lightbulb-off-fill'}`} viewBox="0 0 16 16">
                        <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </button>
            </div>
            <div className={`h-full flex justify-center items-center w-full px-12 py-5`}>
                {
                    needToSignIn ? (
                        <div>
                        <button
                            type="button"
                            className={`bg-gray-800 flex justify-center items-center p-3 rounded-lg ${bright ? 'bg-black':'bg-white'} ${bright ? 'text-white':'text-black'}`}
                            onClick={() => login()}
                        >
                            Click here to Sign In
                        </button>
                        </div>
                    ) :(
                        <button
                            type="button"
                            className={`bg-gray-800 flex justify-center items-center p-3 rounded-lg ${bright ? 'bg-black':'bg-white'} ${bright ? 'text-white':'text-black'}`}
                            onClick={redirectToDashBoard}
                        >
                            Login In
                        </button>
                    )
                }
            </div>
        </div>
    )

}

export default SignIn