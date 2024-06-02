import './Home.css';
import React from 'react';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const eventHandler = (_e, data) => {
        if (data.lastX + data.deltaX < -(window.innerWidth / 50)) {
            navigate("/sign-in");
        } else if (data.lastX + data.deltaX > window.innerWidth / 50) {
            navigate("/sign-up");
        } else {
            console.log(data.lastX + data.deltaX);
            window.location.reload();
        }
    }

    return (
        <div className="HomePage">
            <style>@import url("https://fonts.googleapis.com/css2?family=Exo:wght@500&display=swap");</style>
            <div className="SignInTab">
                Sign In
            </div>
            <Draggable axis="x" bounds={{ left: -(window.innerWidth / 7), right: (window.innerWidth / 7) }} onStop={eventHandler}>
                <div className="PageNameTab">
                    <div>{"<<"}</div>
                    <div style={{ width: "50vw", textAlign: "center" }}>
                        <p>BOOK</p>
                        <p>DIRECTORY</p>
                    </div>
                    <div>{">>"}</div>
                </div>
            </Draggable>
            <div className="SignUpTab">
                Sign Up
            </div>
        </div >

    );
};

export default Home;