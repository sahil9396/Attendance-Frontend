import { createContext, useContext } from 'react';

interface contextype{
    futureEvents: any[],
    todaysCourses: {
        day: string,
        courses: any[]
    },
    allDisabled_count:any[],
    allcourses:any[],
    day_with_alltheir_courses:{first:any[],second:any[]},
    bright: boolean,
    userInfo: {
        email:string,
        name:string,
        picture:string,
    },
    turner:{weekend: boolean,holiday: boolean},
    accessToken:string,
    setFutureEvents: (value: any) => void,
    setDay_with_alltheir_courses: (value: any) => void,
    setAllDisabled_count: (value: any) => void,
    setTodaysClasses: (value: any) => void,
    setAllcourses: (value: any) => void,
    setBright: (value: any) => void,
    setUserInfo: (value: any) => void,
    setTurner: (value: any) => void,
    setAccessToken: (value: any) => void,
}

const contextinput:contextype = {
    futureEvents: [],
    todaysCourses: {
        day: "",
        courses: []
    },
    allDisabled_count:[],
    allcourses:[],
    day_with_alltheir_courses:{first:[],second:[]},
    bright: true,
    userInfo: {
        email:'',
        name:'',
        picture:'',
    },
    turner:{weekend: false,holiday: false},
    accessToken:'',
    setFutureEvents: (value: any) => console.log(value),
    setDay_with_alltheir_courses: (value: any) => console.log(value),
    setAllDisabled_count: (value: any) => console.log(value),
    setTodaysClasses: (value: any) => console.log(value),
    setAllcourses: (value: any) => console.log(value),
    setBright: (value: any) => console.log(value),
    setUserInfo: (value: any) => console.log(value),
    setTurner: (value: any) => console.log(value),
    setAccessToken: (value: any) => console.log(value),
}


export const contextdata = createContext(contextinput);

export const Context_Pro = contextdata.Provider;

export const useContextApi = () => useContext(contextdata);
