import './NoPage.css';
import { useNavigate } from 'react-router-dom';
const image = require("../../images/NoPage.jpg");

const NoPage = () => {
    const navigate = useNavigate();
    function routeToLandingPage() {
        navigate("/");
    }
    return (
        <div className="NoPage">
            <div>
                <img src={image} style={{ height: "70vh" }} alt="404 - Not Found" />
            </div>
            <div>
                <button onClick={routeToLandingPage} style={{
                    height: "5vh",
                    width: "15vw",
                    borderRadius: "5vh",
                    background: "#1B1340",
                    borderBlockColor: "#1B1340",
                    color: "#FFFFFF",
                    fontSize: "110%",
                    cursor: "pointer"
                }}>Go To Home</button>
            </div>
        </div>
    );
};

export default NoPage;