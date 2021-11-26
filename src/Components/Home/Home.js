import React from 'react'
import './Home.css'

function Home() {
    return (
        <>
        <div className="container" id="home_container">
            <h4>Introduction:</h4>
            <ul>
                <li>This is an Web App used to view the Mentor's and Student's details.</li>
                <li>You can assign Student's to different Mentor's.</li>
                <li>You can replace Multiple Student's Mentor by filtering them and assigning them to the required Mentor.</li>
                <li>To get started Add Mentor first to proceed.</li>
            </ul>       
        </div>
        </>
    )
}

export default Home
