import React, { useEffect, useState } from 'react';
import './Multiple.css';
import axios from 'axios';
import env from '../settings';
import { useNavigate } from 'react-router';

function Multiple() {

    var navigate = useNavigate();

    useEffect(() => {
        fetchdata()
    }, []);

    // to get the all the mentors in dropdown
    const [mentorName, setMentorName] = useState([])
    const fetchdata = async (e) => {
        try {
            let data = await axios.get(`${env.api}/mentor`);
            setMentorName([...data.data])
        } catch (error) {
            console.log(error)
        }
    }

    // getting the mentor as input and fetching the students data 
    const [showMentor, setShowMentor] = useState("")
    const getstudent = async () => {
        if (showMentor == "") {
            alert("No Mentor Selected to fetch student details")
        } else {
            try {
                let filterData = await axios.get(`${env.api}/filter-student/${showMentor}`)
                if (filterData.data == "") {
                    setStudData([])
                    alert("No record found!")
                } else {
                    setStudData([...filterData.data])
                }

            } catch (error) {
                console.log(error)
            }
        }
    }
    const [studData, setStudData] = useState([])

    const clearshowmentor = () => {
        setShowMentor("")
        setStudData([])
    }

    // to assign all the filtered student data to different mentor
    const [assignMentor, setAssignMentor] = useState("")
    const assignMultiple = async () => {
        if (assignMentor == "") {
            alert("no Mentor selected to assign")
        } else {
            try {
                let multiUpdate = await axios.put(`${env.api}/update-multiple`, { assignMentor, showMentor })
                setStudData([])
                setAssignMentor("")
                setShowMentor("")
                alert("Assigned")
                if (alert) {
                    navigate('/students')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const clearassignmentor = () => {
        setAssignMentor("")
    }

    return (
        <div className="Container col m-3">
            <h4>Multiple Assign</h4>
            <div className="row">
                <div className="col col-lg-6">
                    <label>Filter Student's by Mentor Name</label>
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupSelect02" value={showMentor} onChange={(e) => setShowMentor(e.target.value)} required>
                            <option defaultValue></option>
                            {
                                mentorName.map(obj => {
                                    return (
                                        <option value={obj.mentor_details.Name}>{obj.mentor_details.Name}</option>
                                    )
                                })
                            }
                        </select>
                        <button className="btn btn-success" onClick={getstudent}><i className="fas fa-search"></i></button>
                        <button className="btn btn-danger" onClick={clearshowmentor}><i className="far fa-times-circle"></i></button>
                    </div>
                </div>
                <div className="col col-lg-6">
                    <label>Assign all the Filtered students to different Mentor</label>
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupSelect02" value={assignMentor} onChange={(e) => setAssignMentor(e.target.value)} required>
                            <option defaultValue></option>
                            {
                                mentorName.map(obj => {
                                    return (
                                        <option value={obj.mentor_details.Name}>{obj.mentor_details.Name}</option>
                                    )
                                })
                            }
                        </select>
                        <button className="btn btn-success" onClick={assignMultiple}><i className="fas fa-plus"></i></button>
                        <button className="btn btn-danger" onClick={clearassignmentor}><i className="far fa-times-circle"></i></button>
                    </div>
                </div>
            </div>

            <div className="row">
                {
                    studData.map(obj => {
                        return (
                            <div className="col col-lg-3">
                                <div className="input mb-3" id="filtercheckbox">
                                    <div className="text-center m-1">
                                        <h6>Student Name: {obj.student_details.Name}</h6>
                                        <h6>Mentor Name: {obj.student_details.Mentor}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Multiple
