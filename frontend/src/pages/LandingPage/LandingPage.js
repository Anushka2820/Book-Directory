import './LandingPage.css';
import React from 'react';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const eventHandler = (_e, data) => {
        if (data.lastX + data.deltaX < -(window.innerWidth / 50)) {
            navigate("/sign-in");
        } else if (data.lastX + data.deltaX > window.innerWidth / 50) {
            navigate("/sign-up");
        } else {
            window.location.reload();
        }
    }

    return (
        <div className="LandingPage">
            <style>@import url("https://fonts.googleapis.com/css2?family=Exo:wght@500&display=swap");</style>
            <style>@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");</style>
            <div className="SignInTab">
                Sign In
            </div>
            <Draggable axis="x" bounds={{ left: -(window.innerWidth / 7), right: (window.innerWidth / 7) }} onStop={eventHandler}>
                <div className="PageNameTab">
                    <div><i className="fa fa-angle-left thirdArraow"></i></div>
                    <div><i className="fa fa-angle-left secondArrow"></i></div>
                    <div><i className="fa fa-angle-left firstArrow"></i></div>
                    <div style={{ width: "50vw", textAlign: "center" }}>
                        BOOK<br />
                        DIRECTORY
                    </div>
                    <div><i className="fa fa-angle-right firstArrow"></i></div>
                    <div><i className="fa fa-angle-right secondArrow"></i></div>
                    <div><i className="fa fa-angle-right thirdArraow"></i></div>
                </div>
            </Draggable>
            <div className="SignUpTab">
                Sign Up
            </div>
        </div >

    );
};

export default LandingPage;