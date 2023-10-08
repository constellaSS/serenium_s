import PostContainer from "../../components/PostContainer/PostContainer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import './Home.css'
import Header from "../../components/Header/Header.jsx";

const Home = () => {
	return(
		<>
			<div className='homeScreen'>
				<Header/>
				<PostContainer/>
				<NavBar />
			</div>
		</>
	)
}

export default Home;