import HomePage from "./HomePage";
import { useContextApi} from "../contexAPi/ContextApi";
import {Holiday} from "../smallComponents/Holiday";

function LandingPage() {
  // turner
  const { bright,turner } = useContextApi();
  return (
    <div className={`flex flex-col gap-10 justify-center items-center w-full border-b ${ bright ? 'border-black' : 'border-white'} py-5`}>
        {
          ( turner.holiday || (turner.weekend ) ) ? <Holiday eventstat={turner.holiday} weekendstat={turner.weekend} /> : <HomePage />
        }
    </div>
  )
}

export default LandingPage