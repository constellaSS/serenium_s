import "./App.css";
import './normalize.css';
import {useEffect, useState} from "react";
import idl from "./idl.json";
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import {Program, AnchorProvider, web3, utils} from "@project-serum/anchor";
import {Buffer} from "buffer";
import Home from "./pages/Home/Home.jsx";

window.Buffer = Buffer;
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
	preflightCommitment: "processed",
}
const {SystemProgram} = web3;

function App() {
	const [walletAddress, setWalletAddress] = useState(null);
	const [threads, setThreads] = useState([]);
	const getProvider = () => {
		const connection = new Connection(network, opts.preflightCommitment);
		const provider = new AnchorProvider(connection, window.solana, opts.preflightCommitment);
		return provider;
	}
	const checkIfWalletIsConnected = async () => {
		try {
			const {solana} = window;
			if (solana) {
				if (solana.isPhantom) {
					console.log("Phantom Wallet found!")
					const response = await solana.connect({
						onlyIfTrusted: true,
					});
					console.log(`Connected with public key ${response.publicKey.toString()}`);
					setWalletAddress(response.publicKey.toString());
				}
			} else {
				alert("Solana object not found! Get a Phantom wallet")
			}
		} catch (err) {
			console.error(err);
		}
	}
	const connectWallet = async () => {
		const {solana} = window;
		if (solana) {
			const response = await solana.connect();
			console.log("Connected with public key:", response.publicKey.toString())
			setWalletAddress(response.publicKey)
		}
	}
	const createThread = async (type, title, content) => {
		try {
			const provider = getProvider();
			const program = new Program(idl, programID, provider);
			const [thread] = await PublicKey.findProgramAddress(
				[
					utils.bytes.utf8.encode("THREAD_DEMO"),
					provider.wallet.publicKey.toBuffer()
				],
				program.programId
			);
			await program.methods.initThread(type, title, content).accounts({
				thread,
				owner: provider.wallet.publicKey,
				systemProgram: SystemProgram.programId
			}).rpc();
			console.log('Created a new thread with address:', thread);
		} catch (err) {
			console.error('Error creating thread account:', err);
		}
	}
	const getThreads = async() => {
		const connection = new Connection(network, opts.preflightCommitment);
		const provider = getProvider();
		const program = new Program(idl, programID, provider);
		Promise.all(await connection.getProgramAccounts(programID).map(async thread => (
			{
				...(await program.account.campaign.fetch(thread.pubkey)),
				pubkey: thread.pubkey,
			}
		))).then((threads) => setThreads(threads));
		console.log(threads)
	}
	const renderNotConnectedContainer = () => (
		<button onClick={connectWallet}>Connect to Wallet</button>
	);

	useEffect(() => {
		const onLoad = async () => {
			await checkIfWalletIsConnected()
			await getThreads()
		}
		window.addEventListener("load", onLoad);
		return () => window.removeEventListener("load", onLoad)
	}, []);

	return (
		<div className="rootContainer">
			{!walletAddress && renderNotConnectedContainer()}
			{walletAddress && <Home createThread={createThread} threads={threads}/>}
		</div>
	)
}

export default App
