import React, { useState, useEffect } from 'react';

import { useContextApi } from './ContextApi';

export const URL:string = import.meta.env.VITE_API_URL;
export const clientId:string = import.meta.env.VITE_API_CLIENT_ID;


export const TimePicker = ({ timeSet }: { timeSet: (val: string) => void }) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const { bright } = useContextApi();

  useEffect(() => {
    const formattedHours = hours.length === 1 ? `0${hours}` : hours;
    const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes;
    const time = `${formattedHours}:${formattedMinutes}`;
    timeSet(time);
  }, [hours, minutes]);

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length <= 2 && /^[0-9]*$/.test(value)) {
      if (parseInt(value, 10) > 23) {
        value = '23';
      }
      setHours(value);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length <= 2 && /^[0-9]*$/.test(value)) {
      if (parseInt(value, 10) > 59) {
        value = '59';
      }
      setMinutes(value);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-5">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={hours}
          onChange={handleHoursChange}
          className={`w-16 ${bright ? 'bg-white' : 'bg-black'} p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="HH"
        />
        <span>:</span>
        <input
          type="text"
          value={minutes}
          onChange={handleMinutesChange}
          className={`w-16 ${bright ? 'bg-white' : 'bg-black'} p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="MM"
        />
      </div>
    </div>
  );
};
  
export const getDate = (): string => {
    const today = new Date();
    let date = (today.getDate()).toString().padStart(2, '0');
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let year = today.getFullYear().toString();
    return `${year}-${month}-${date}`;
}

export function NoCoursesTHings() {
    const {bright} = useContextApi();
    return(
    <div className={`text-xl text-center rounded-lg ${bright ? 'shadow-md' :'shadow-lg'} shadow-red-500 p-5`}>
        No Courses Present ....
    </div>
    )
}
  