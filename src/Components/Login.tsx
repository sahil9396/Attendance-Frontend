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
    const {setAccessToken} = useContextApi();

    const redirectToDashBoard =async () => {
        navigate('/dashboard');
        // console.log('Redirecting to dashboard');
    };

    const checkLogin = async () => {
        try {
            const response = await axios.get(`${URL}/gapi/api/auth/check`,{withCredentials:true});
            console.log(response.data);
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
        const response = await axios.get(`${URL}/gapi/api/oauth2callback`,{
            headers:{
              Authorization: `Bearer ${codeResponse.code}`,
            },
            withCredentials:true
        });
        setAccessToken(response.data.token.access_token);
        redirectToDashBoard();
    }

    const login = useGoogleLogin({
        onSuccess:(codeResponse) => handleSuccess(codeResponse),
        onError: (error) => console.error('Error:', error),
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/calendar',
    });

    useEffect(() => {
        console.log(URL);
        checkLogin();
    }, [])

    if (loaderState) {
        return <Loader />;
    }

    return (
        <div className='h-screen bg-black flex justify-center items-center text-white font-bold'>
            {
                needToSignIn ? (
                    <div>
                    <button
                        type="button"
                        className="bg-gray-800 flex justify-center items-center p-3 rounded-lg"
                        onClick={() => login()}
                    >
                        Click here to Sign In
                    </button>
                    </div>
                ) :(
                    <button
                        type="button"
                        className="bg-gray-800 flex justify-center items-center p-3 rounded-lg"
                        onClick={redirectToDashBoard}
                    >
                        Login In
                    </button>
                )
            }
        </div>
    )

}

export default SignIn