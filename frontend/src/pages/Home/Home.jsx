import PostContainer from "../../components/PostContainer/PostContainer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import './Home.css'
import Header from "../../components/Header/Header.jsx";

const Home = ({createThread, threads}) => {
	return(
		<>
			<div className='homeScreen'>
				<Header/>
				<PostContainer threads={threads}/>
				<NavBar createThread={createThread} />
			</div>
		</>
	)
}

export default Home;