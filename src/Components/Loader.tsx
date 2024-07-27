import { useContextApi } from "./contexAPi/ContextApi";

const Loader = () => {
  const {bright} = useContextApi();
  return (
    <div className={`flex items-center justify-center min-h-screen ${bright ? 'bg-white':'bg-black'}`}>
      <div className="loader-26"></div>
    </div>
  );
};

export default Loader;
