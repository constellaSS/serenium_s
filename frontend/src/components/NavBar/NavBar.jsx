import {useState} from "react"
import './navBar.css'
import CustomAlert from "../CustomAlert/CustomAlert.jsx";

const submitContract = async function (content) {
    // TODO
}
function createPost() {
    // TODO
}

const NavBar = () => {
    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleConfirm = (input1, input2) => {

    };
    return (
        <div className="navBar">
            < button type='button' id="navBtn1" className="navBarButton"/>
            < button type='button' id="navBtn2" className="navBarButton"/>
            < button type='button' onClick={handleShowAlert} id="navBtn3" className="navBarButton"/>
            <CustomAlert isOpen={showAlert} onClose={() => setShowAlert(false)} onConfirm={handleConfirm} />
            < button type='button' id="navBtn4" className="navBarButton"/>
            < button type='button' id="navBtn5" className="navBarButton"/>
        </div>)
}

export default NavBar;
