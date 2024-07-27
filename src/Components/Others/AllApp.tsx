// import { useEffect } from 'react'
import Appbar from './AppBar';
import LandingPage from './LandingPage';
import LogPage from './LogPage';
import { ProperTimeTableLog } from './ProperTimeTableLog';
import { useContextApi } from '../contexAPi/ContextApi';

function AllApp() {

  const {bright} = useContextApi();

  return (
    <div>
      <div >
        <div className='flex'>
          <div id="rightone" className={`w-full  h-screen overflow-y-scroll ${bright ?"text-black bg-white border-white":"text-white bg-black"}`}>
            <Appbar />
            <div className='flex flex-col items-center px-5 gap-5 w-full '>
              <div id="landing" className='w-full'>
                <LandingPage  />
              </div>
              <div id="logpage" className='w-full'>
                <LogPage />
              </div>
              <div id="propertimining" className='w-full'>
                <ProperTimeTableLog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllApp
