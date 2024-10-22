
import PlayerForm from "../PlayerForm";
import TeamSelector from "../TeamSelector";
import pic from "../../assets/pic.avif";

function Home() {
  // Function to handle the creation of a team
  const teamCreated = () => {
    console.log("A new team has been created!");
  };

  return (
    <div className="bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="flex justify-center w-full h-[15vh] object-cover">
          <img
            src={pic}
            className="w-full h-[15vh] object-cover opacity-90"
            alt="About Us"
          />
        </div>
        <div className="flex justify-center">
          <span className="bg-green-700 -translate-y-7 text-white p-2 text-4xl md:text-5xl font-serif font-semibold rounded-lg">
            Fantasy Game
          </span>
        </div>
      </div>
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <div className="dark:bg-gray-900 bg-white p-4 rounded-lg">
            <p className="leading-relaxed text-gray-900 dark:text-white font-serif font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl">
              <span>Gather Your Team,</span>
              <br />
              <span>
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium italic text-blue-600">
                  Claim Your <span className="text-blue-600">Glory:</span>
                </span>
                <br />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  The Fantasy Awaits
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://images.pexels.com/photos/3680103/pexels-photo-3680103.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-16 rounded-lg"
            src="https://images.pexels.com/photos/7594235/pexels-photo-7594235.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="office content 2"
          />
        </div>
      </div>
      <PlayerForm onTeamCreated={teamCreated} />
      <TeamSelector onTeamCreated={teamCreated} />
    </div>
  );
}

export default Home;
