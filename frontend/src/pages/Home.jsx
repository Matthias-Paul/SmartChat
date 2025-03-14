import SideBar from "../component/SideBar";
import MessageComponent from "../component/MessageComponent";

function Home() {
  return (
    <>
      <div className="  max-w-[1400px] m-auto flex  rounded-lg   ">
        <SideBar />
        <MessageComponent />
      </div>
    </>
  );
}

export default Home;
