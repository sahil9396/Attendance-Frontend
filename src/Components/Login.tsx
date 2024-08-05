import { useState , useEffect } from 'react';
import axios from 'axios';
import { URL } from './contexAPi/OtherThings';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useContextApi } from './contexAPi/ContextApi';

function SignIn() {
    const {setBright} = useContextApi();

    useEffect(() => {
      if (new Date().getHours() <= 8 || new Date().getHours() >= 18) {
          setBright(false);
      }
    }, [])

    return(
      <div className={`h-screen gap-5 bg-black flex flex-col justify-center items-center text-white font-bold shadow-2xl `}>
        <AuthForm />
      </div>
    )
}

const AuthForm = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [inputThings, setInputThings] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setAccessToken,setUserInfo,bright,setBright } = useContextApi();
    const [showLoader, setShowLoader] = useState(false);

    const navigate = useNavigate();

    const redirectToDashBoard =async () => {
        navigate('/dashboard');
        // console.log('Redirecting to dashboard');
    };
  
    const openTab = (tabName:string) => {
      setActiveTab(tabName);
      setErrorMessage(''); // Clear error message when switching tabs
    };
  
    const LoginButton = (e:any) => {
      e.preventDefault();
      setShowLoader(true);
      axios.get(`${URL}/gapi/api/auth/Login?assignedBy=${inputThings}`, { withCredentials: true })
        .then((response) => {
          if (response.data.LoginIn) {
            setAccessToken(response.data.token);
            setUserInfo({email : response.data.userData.email , name : response.data.userData.name , picture : response.data.userData.picture});
            redirectToDashBoard();
            return;
          }
          setShowLoader(false);
          setErrorMessage("User doesn't exist");
        })
        .catch((error) => {
          setShowLoader(false);
          console.error(error);
          setErrorMessage('An error occurred while logging in.');
        });
    };
  
    const handleSuccess = async (codeResponse:any) => {
      setShowLoader(true);
      try {
        const response = await axios.get(`${URL}/gapi/api/signIn`, {
          headers: {
            Authorization: `Bearer ${codeResponse.code}`,
          },
          withCredentials: true,
        });
        setAccessToken(response.data.token);
        setUserInfo({email:response.data.userData.email , name:(response.data.userData.given_name || response.data.userData.family_name || response.data.userData.name) , picture:response.data.userData.picture});
        redirectToDashBoard();
      } catch (error) {
        setShowLoader(false);
        console.error(error);
        alert(` ${error}`);
      }
    };
  
    const SignInButton = useGoogleLogin({
      onSuccess: (codeResponse) => handleSuccess(codeResponse),
      onError: (error) => console.error('Error:', error),
      flow: 'auth-code',
      scope: 'https://www.googleapis.com/auth/calendar',
    });
  
  return (
    <div className={`h-screen  w-full flex flex-col ${bright ? 'bg-white ':'bg-black'}`}>
      <div className={`flex justify-end w-full px-12 py-5 border-b ${bright ? 'border-gray-200' : 'border-gray-700'} shadow-md `}>
        <button
          onClick={() => setBright(!bright)}
          className={`px-5 flex justify-between items-center py-3 rounded-lg ${bright ? 'bg-green-300' : 'bg-gray-800'} hover:bg-gray-200 hover:text-black transition-colors duration-300`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${bright ? 'bi bi-lightbulb-fill' : 'bi bi-lightbulb-off-fill'}`} viewBox="0 0 16 16">
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center flex-grow ">
        <div className={`bg-opacity-75 p-8 rounded-lg w-80 shadow-sm ${bright ? 'shadow-black ':'shadow-white'}`}>
          <div className="flex justify-around mb-4">
            <button
              className={`px-4 py-2 ${activeTab === 'login' ? `border-b-2 ${bright ? 'border-black':'border-white'}` : ''} ${bright ? 'text-black ' : 'text-white'}`}
              onClick={() => openTab('login')}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'register' ? `border-b-2 ${bright ? 'border-black':'border-white'}` : ''} ${bright ? 'text-black ' : 'text-white'}`}
              onClick={() => openTab('register')}
            >
              Sign-Up
            </button>
          </div>
          <div className={`tab-content ${activeTab === 'login' ? 'block' : 'hidden'}`}>
            <form className="flex flex-col">
              <div className='mb-6 pb-2 border-b flex justify-between'>
                <h2 className={`text-2xl  ${bright ? 'text-black border-black' : 'text-white border-white'}`}>Login</h2>
                <button 
                onClick={()=>setInputThings('')}
                className={`px-5 py-2 rounded ${!bright ? 'bg-white ':'bg-black text-white'} text-black font-bold hover:bg-gray-700 hover:text-white transition`}>Clear</button>
              </div>
              <div className="mb-4">
                <input
                  onChange={(e) => setInputThings(e.target.value)}
                  type="email"
                  id="login-email"
                  name="email"
                  required
                  value={inputThings}
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded bg-gray-200 text-black focus:outline-none focus:ring focus:ring-gray-500"
                />
              </div>
              <div>
                <button
                  onClick={LoginButton}
                  type="submit"
                  className={`w-full px-4 py-2 rounded ${!bright ? 'bg-white ':'bg-black text-white'} text-black font-bold hover:bg-gray-700 hover:text-white transition ${showLoader ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {
                    showLoader ? <>
                      <div className="ripple mx-auto"></div>
                    </> : <>Login</>
                  }
                </button>
              </div>
              {errorMessage && (
                <div className="mt-4 text-red-500">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
          <div className={`tab-content ${activeTab === 'register' ? 'block' : 'hidden'}`}>
            <form className="flex flex-col">
              <h2 className={`text-2xl mb-6 border-b ${bright ? 'text-black border-black' : 'text-white border-white'}`}>Sign-Up</h2>
              <div className="mb-4 p-4 bg-yellow-300 text-black rounded-lg shadow">
                <strong>Note:</strong> By signing up, we can read, edit, and modify your calendar events.
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    SignInButton();
                  }}
                  type="submit"
                  className={`w-full px-4 py-2 rounded ${!bright ? 'bg-white ':'bg-black text-white'} text-black font-bold hover:bg-gray-700 hover:text-white transition ${showLoader ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Sign-Up With Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

  

export default SignIn   