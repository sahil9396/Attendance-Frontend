import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import FrontEndWaiting from './Components/FrontEndWaiting.tsx';
import { Context_Pro } from './Components/contexAPi/ContextApi';

const App = () => {
  // const clientId = process.env.REACT_APP_CLIENT_ID;

  const [futureEvents, setFutureEvents] = useState([]);
  const [allDisabled_count, setAllDisabled_count] = useState([]);
  const [todaysCourses, setTodaysClasses] = useState({
    day: '',
    courses: []
  });
  const [allcourses, setAllcourses] = useState([]);
  const [day_with_alltheir_courses, setDay_with_alltheir_courses] = useState({first:[],second:[]});
  const [bright, setBright] = useState(true);
  const [userInfo, setUserInfo] = useState({
      email:'',
      family_name:'',
      given_name:'',
      name:'',
      picture:'',
  });
  const [turner, setTurner] = useState({weekend: false, holiday: false});
  const [accessToken, setAccessToken] = useState('');

  const value = {
    futureEvents,
    setFutureEvents,
    todaysCourses,
    setTodaysClasses,
    allDisabled_count,
    setAllDisabled_count,
    allcourses,
    setAllcourses,
    setDay_with_alltheir_courses,
    day_with_alltheir_courses,
    bright,
    setBright,
    userInfo,
    setUserInfo,
    turner,
    setTurner,
    accessToken,
    setAccessToken
  };

  return (
    <Context_Pro value={value} >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={ <FrontEndWaiting/>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Context_Pro>
  );
};

export default App;
