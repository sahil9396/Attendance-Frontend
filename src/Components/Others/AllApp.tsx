// import { useEffect } from 'react'
import Appbar from './AppBar';
import LandingPage from './LandingPage';
import LogPage from './LogPage';
import { ProperTimeTableLog } from './ProperTimeTableLog';
import { useContextApi } from '../contexAPi/ContextApi';

function AllApp() {

  const {bright} = useContextApi();
  const topper = ()=>{
    console.log("topper")
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    })
  }

  return (
    <div className='h-full'>
      <div className='h-full'>
        <div id='bar' className='flex '>
          <div id="rightone" className={`w-full ${bright ?"text-black bg-white border-white":"text-white bg-black"}`}>
            <Appbar />
            <div className='flex flex-col items-center px-5 gap-5 w-full '>
              <div id="landing" className='w-full'>
                <LandingPage  />
              </div>
              <div id="logpage" className='w-full'>
                <LogPage />
              </div>
              <div id="propertimining" className='w-full mb-16 lg:m-0'>
                <ProperTimeTableLog />
              </div>
            </div>
          </div>
        </div>
        <button onClick={topper} className='fixed right-5 lg:right-10 bottom-7 p-5 bg-red-400 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" width={`16`} height={`16`} fill="currentColor" className="bi bi-arrow-up w-full h-full" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default AllApp
