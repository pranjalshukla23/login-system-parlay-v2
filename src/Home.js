import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setToken }) => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const navigate = useNavigate();

  // Actions
  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet found!");
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log("Connected with Public Key:", response.publicKey.toString());

      /*
       * Set the user's publicKey in state to be used later!
       */
      setWalletAddress(response.publicKey.toString());
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };

  //fetch data from api
  const fetchUser = async () => {
    const data = await fetch(
      "https://parlay-backend-v2.vercel.app/parlay/userlogin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicKey: walletAddress,
        }),
      }
    );
    const response = await data.json();
    setToken(response);
    setUserToken(response);
  };

  const enterGame = () => {
    navigate("/play");
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      await fetchUser();
      //navigate("/play");
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="bg-red-500 text-3xl text-white border-4 border-yellow-500 rounded-md p-10 transition duration-100 hover:-translate-y-6 hover:bg-blue-400 hover:scale-110"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return (
    <div className="container flex flex-col justify-center shadow-xl shadow-cyan-500/50 mx-auto mt-40 items-center bg-gray-200 p-20 max-w-4xl rounded-2xl">
      <h1 className="text-3xl mb-11">Login System Test</h1>
      {!userToken && renderNotConnectedContainer()}
      {userToken && (
        <>
          <button
            className="bg-red-500 text-3xl text-white border-4 border-yellow-500 rounded-md p-4 transition duration-100 hover:-translate-y-6 hover:bg-blue-400 hover:scale-110"
            onClick={enterGame}
          >
            Enter Game
          </button>
          <div class="flex flex-col justify-center items-center mt-10">
            <button
              class="bg-yellow-300 text-3xl text-white border-4 border-yellow-500 rounded-md p-4 transition duration-100 hover:-translate-y-6 hover:bg-blue-400 hover:scale-110"
              onClick={fetchUser}
            >
              Generate Token Again
            </button>
            <p className="text-2xl mt-10">{userToken}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
