import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useBalance } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

import Web3 from "web3";
import Select from "react-select";

// styling
import "./styles/Home.css";
import abi from "./ABI/token.json";
import busdABI from "./ABI/busd.json";

import busd from "./images/BUSD.png";
import usdc from "./images/USD_Coin_icon.png";
import usdt from "./images/busdt_32.png";
import bnb from "./images/512.png";

import { useEffect, useState } from "react";

export default function Home() {
  const contractAddress = "0x1fe32255588792b9a6ca73c36e97fe9deefa283b";
  const contractAddressBUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
  const contractAddressUSDC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
  const contractAddressBSC = "0x55d398326f99059fF775485246999027B3197955";

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);
  const contractTransfer = new web3.eth.Contract(abi, contractAddress);
  const contractBUSD = new web3.eth.Contract(busdABI, contractAddressBUSD);
  const contractUSDC = new web3.eth.Contract(busdABI, contractAddressUSDC);
  const contractBSC = new web3.eth.Contract(busdABI, contractAddressBSC);
  // here comes the usestate hell
  const [selectedOption, setSelectedOption] = useState(
    ""
  );
  const [amountUSD, setAmountUSD] = useState("");
  const [rounds, setRounds] = useState("");
  const [totalUSDInvested, setTotalUSDInvested] = useState("");
  const [totalSold, setTotalSold] = useState("");
  const [canClaim, setCanClaim] = useState("");
  const [availableAmount, setAvailableAmount] = useState("");

  const address = useAddress();
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  async function depositTokens() {
    const isapprovedBUSD = await contractBUSD.methods
      .allowance(address, contractAddress)
      .call();
    console.log(isapprovedBUSD, "BUSD");

    const isapprovedUSDC = await contractUSDC.methods
      .allowance(address, contractAddress)
      .call();
    console.log(isapprovedUSDC, "usdc");

    const isapprovedBSC = await contractBSC.methods
      .allowance(address, contractAddress)
      .call();
    console.log(isapprovedUSDC, "bsc");

    console.log(selectedOption["value"]);

    if (
      isapprovedBUSD?.toString() > 0 &&
      selectedOption["value"] == "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    ) {
      try {
        const transferBUSD = await contractTransfer.methods
          .buyTokens(Web3.utils.toWei(amountUSD, 'ether'), contractAddressBUSD)
          .send({ from: address });
        alert("deposit success:", transferBUSD);
      } catch (error) {
        alert("deposit failed:", error);
      }
    } else if (
      selectedOption["value"] == "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
    ) {
      try {
        console.log(selectedOption["value"]);
        console.log('hjkladfhkl;dfa')
        const approvalBusd = await contractBUSD.methods
          .approve(contractAddress, Web3.utils.toWei(amountUSD))
          .send({ from: address });
        alert("deposit success:", approvalBusd);
      } catch (error) {
        alert("deposit failed:", error);
      }
    }

    if (selectedOption["value"] == "bnb") {
      try {
        const transferBNB = await contractTransfer.methods
          .buyTokens(0, "0x0000000000000000000000000000000000000000")
          .send({ from: address, value: Web3.utils.toWei(amountUSD) });
        alert("deposit success:", transferBNB);
      } catch (error) {
        alert("deposit failed:", error);
      }
    }

    if (
      isapprovedUSDC?.toString() > 0 &&
      selectedOption["value"] == "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    ) {
      console.log("USDC first 1");

      try {
        console.log(selectedOption["value"]);

        const transferUSDC = await contractTransfer.methods
          .buyTokens(Web3.utils.toWei(amountUSD), contractAddressUSDC)
          .send({ from: address });
        alert("deposit success:", transferUSDC);
      } catch (error) {
        alert("deposit failed:", error);
      }
    } else if (
      selectedOption["value"] == "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
    ) {
      try {
        console.log(selectedOption["value"]);

        const approvalUSDC = await contractUSDC.methods
          .approve(contractAddress, Web3.utils.toWei(amountUSD))
          .send({ from: address });
        alert("deposit success:", approvalUSDC);
      } catch (error) {
        alert("deposit failed:", error);
      }
    }

    if (
      isapprovedBSC?.toString() > 0 &&
      selectedOption["value"] == "0x55d398326f99059fF775485246999027B3197955"
    ) {
      console.log("BSC first 1");

      try {
        console.log(selectedOption["value"]);

        const transferBSC = await contractTransfer.methods
          .buyTokens(Web3.utils.toWei(amountUSD), contractAddressBSC)
          .send({ from: address });
        alert("deposit success:", transferBSC);
      } catch (error) {
        alert("deposit failed:", error);
      }
    } else if (
      selectedOption["value"] == "0x55d398326f99059fF775485246999027B3197955"
    ) {
      try {
        console.log(selectedOption["value"]);

        const approvalBSC = await contractBSC.methods
          .approve(contractAddress, Web3.utils.toWei(amountUSD))
          .send({ from: address });
        alert("deposit success:", approvalBSC);

      } catch (error) {
        alert("deposit failed:", error);
      }
    }
  }

  async function withdrawTokens() {
    await contract.methods.claimTokens().send({ from: address });
  }

  async function fetchInfo() {
    const rounds = await contract.methods.curRound().call();
    const totalUSDInvested = await contract.methods.totalUSDCollected().call();

    const totalSold = await contract.methods.totalTokensSold().call();

    const canClaim = await contract.methods.canClaim().call();

    setCanClaim(canClaim);
    setRounds(rounds);
    setTotalSold(totalSold);
    setTotalUSDInvested(totalUSDInvested);


  }


  const handleSelectChange = async (selectedOption) => {
    setSelectedOption(selectedOption);

    const BUSDAmount = await contractBUSD.methods.balanceOf(address).call();
    const USDCAmount = await contractUSDC.methods.balanceOf(address).call();
    const USDTAmount = await contractBSC.methods.balanceOf(address).call();
    const BNBAmount = data.displayValue;


    if (selectedOption.value === "0x55d398326f99059fF775485246999027B3197955") {
      let inputValue = USDTAmount;
      setAvailableAmount(Web3.utils.fromWei(inputValue, "ether"));
    } else if (selectedOption.value === "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d") {
      let inputValue = USDCAmount;
      setAvailableAmount(Web3.utils.fromWei(inputValue, "ether"));
    } else if (selectedOption.value === "bnb") {
      let inputValue = BNBAmount;
      setAvailableAmount(inputValue);
    } else if (selectedOption.value === "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56") {
      let inputValue = BUSDAmount;
      setAvailableAmount(Web3.utils.fromWei(inputValue, "ether"));
    }
  };



  const options = [
    {
      value: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      coin: "BUSD",
      label: (
        <div>
          <img src={busd} height="40px" width="40px" />{" "}
        </div>
      ),
    },
    {
      value: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      coin: "USDC",
      label: (
        <div>
          <img src={usdc} height="40px" width="40px" />{" "}
        </div>
      ),
    },
    {
      value: "bnb",
      coin: "BNB",
      label: (
        <div>
          <img src={bnb} height="40px" width="40px" />{" "}
        </div>
      ),
    },
    {
      value: "0x55d398326f99059fF775485246999027B3197955",
      coin: "USDT",
      label: (
        <div>
          <img src={usdt} height="40px" width="40px" />{" "}
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchInfo();
    const interval = setInterval(fetchInfo, 1000); // Fetch every 2 seconds

    return () => clearInterval(interval);
  }, [address, data]);
  return (
    <div className="container px-4 sm:px-0 mx-auto mt-12">
      <div className="flex flex-col md:flex-row justify-center text-black items-center w-11/12 mx-auto">
        <div className="">
          <ConnectWallet theme="white" />
        </div>
      </div>
		<div className="successAlert" id="alertBox">
			{/* {{ alertMessage }} */}
		</div>
      <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8 mt-12 mx-auto">
        <div
          id="card"
          className="border-4 rounded-xl border-blue w-full md:w-12/12 bg-gray-100 mx-auto pb-6"
        >
          <div className="px-6 mt-6">
            <div className="text-black  w-full border-2 rounded-xl border-gray-400 bg-white p-4">
              <p className="text-center text-2xl font-bold">Presale</p>
              <div className="mt-2">
                <div className="flex">
                  <input
                    className="px-4 py-2 border w-full border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
                    type="number"
                    placeholder="amount"
                    value={amountUSD}
                    onChange={(e) => setAmountUSD(e.target.value)}
                  />
                  <div className="">
                    <Select
                      className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-white focus:outline-none focus:ring focus:border-blue-300"
                      defaultValue={selectedOption}
                      onChange={handleSelectChange}
                      options={options}
                    />
                  </div>
                  {/* <select className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-white focus:outline-none focus:ring focus:border-blue-300">
                    <option value="USDC">
                      <img src={usdc} alt="USDC" className="w-6 h-6 mr-2" />
                      USDC
                    </option>
                    <option value="BUSD">
                      <img src={busd} alt="BUSD" className="w-6 h-6 mr-2" />
                      BUSD
                    </option>
                    <option value="USDT">
                      <img src={usdt} alt="USDT" className="w-6 h-6 mr-2" />
                      USDT
                    </option>
                  </select> */}
                </div>
                <div>
                  <span> {selectedOption["coin"]} {availableAmount} </span>
                </div>
                <div className="flex mt-4 text-white font-bold text-2xl flex-col sm:flex-row items-center justify-between space-x-0 space-y-4 sm:space-y-0 sm:space-x-4">
                  {canClaim ? (
                    <button
                      onClick={withdrawTokens}
                      className="bg-[#48CF3C] w-full p-2 px-4 rounded-xl"
                    >
                      Claim
                    </button>
                  ) : (
                    <button
                      onClick={depositTokens}
                      className="bg-[#04121d] w-full p-2 px-4 rounded-xl"
                    >
                      Contribute
                    </button>
                  )}
                </div>
                <div className="mt-8">
                  <p className="font-semibold">Presale Info:</p>
                  <div className="flex flex-col w-full justify-between">
                    <div className="flex flex-row justify-between">
                      <p>Round: </p> <p>{rounds}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      {" "}
                      <p>Tokens sold: </p>{" "}
                      <p>{web3.utils.fromWei(totalSold)} $TCK</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      {" "}
                      <p>Total $ in presale: </p>{" "}
                      <p>{web3.utils.fromWei(totalUSDInvested)}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Sale live: </p>
                      {canClaim ? <p>True</p> : <p>False</p>}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-center items-center">
                    <div>
                      Powered by <a href="https://metalabz.gg">MetaLabz</a>
                    </div>
                    <div>
                      <img
                        className="w-8 h-8"
                        src="https://metalabz.gg/favicon.ico"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
