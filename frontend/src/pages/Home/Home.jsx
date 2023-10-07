import PostContainer from "../../components/PostContainer/PostContainer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import './Home.css'
import Header from "../../components/header/Header.jsx";

const Home = () => {
	return(
		<>
			<Header/>
			<div className='homeScreen'>
				<PostContainer/>
				<NavBar />
			</div>
		</>
	)
}

export default Home;