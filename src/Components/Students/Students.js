import './Students.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import env from '../settings'

function Students() {


    useEffect(() => {
        fetchdata()
    }, [])

    // student input details
    const [studentID, setStudentID] = useState("")
    const [studentName, setStudentName] = useState("")
    const [studentEmail, setStudentEmail] = useState("")
    const [studentPhone, setStudentPhone] = useState("")
    const [studentMentor, setStudentMentor] = useState("")

    // add students dropdown
    const [dropDown, setDropDown] = useState(false)

    // filter students by mentor dropdown
    const [filterDrop, setFilterDrop] = useState(false)

    // display the incoming data from db intable
    const [tableDetails, setTableDetails] = useState([])

    // to get the editted input of the students
    const [studentEdit, setStudentEdit] = useState(false)

    // to assign the mentors to the students dropdown
    const [mentorName, setMentorName] = useState("")

    // to filter the students data based on the mentor name
    const [filterData, setFilterData] = useState("")

    // to store the received filter data
    const [receivedFilter, setReceivedFilter] = useState([])

    // to show display the filter data state 
    const [filterTable, setFilterTable] = useState(false)


    // to fetch the students data
    const fetchdata = async (e) => {
        try {
            let data = await axios.get(`${env.api}/student`)
            setTableDetails([...data.data])
            let mentor_data = await axios.get(`${env.api}/mentor`)
            setMentorName([...mentor_data.data])
        } catch (error) {
            console.log(error)
        }
    }


    // to add the students data
    const handleSubmit = async (e) => {
        e.preventDefault()
        let student_details = {
            "Name": studentName,
            "Email": studentEmail,
            "Phone": studentPhone,
            "Mentor": studentMentor
        };
        try {
            let student_create = await axios.post(`http://localhost:5000/create-student`, { student_details })
            setStudentName("")
            setStudentEmail("")
            setStudentPhone("")
            setStudentMentor("")
            fetchdata()
            setDropDown(false)
        } catch (error) {
            console.log(error)
        }

    }

    // to delete the students data
    const handleDelete = async (id) => {
        try {
            let student_delete = await axios.delete(`${env.api}/delete-student/${id}`)
            fetchdata()
            {
                filterTable ? filter() : fetchdata()
            }
        } catch (error) {
            console.log(error)
        }

    }


    // to receive and store the edited students data
    const edit = (obj) => {
        setStudentEdit(true)
        setDropDown(true)
        setStudentID(obj._id)
        setStudentName(obj.student_details.Name)
        setStudentEmail(obj.student_details.Email)
        setStudentPhone(obj.student_details.Phone)
        setStudentMentor(obj.student_details.Mentor)
    }

    // to store the edited data in the db
    const handleEdit = async (e) => {
        e.preventDefault()
        let student_details = {
            "Name": studentName,
            "Email": studentEmail,
            "Phone": studentPhone,
            "Mentor": studentMentor
        };
        try {
            let editdata = await axios.put(`${env.api}/edit-student/${studentID}`, { student_details })
            setStudentEdit(false)
            setStudentName("")
            setStudentEmail("")
            setStudentPhone("")
            setStudentMentor("")
            setDropDown(false)
            fetchdata()
            {
                filterTable ? filter() : fetchdata()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // to display the fillter data received from the db
    const filter = async () => {
        try {
            // setReceivedFilter([])
            let filter_retreive = await axios.get(`${env.api}/filter-student/${filterData}`)
            setReceivedFilter([...filter_retreive.data])
            setFilterDrop(false)
            setFilterTable(true)
            fetchdata()
        } catch (error) {
            console.log(error)
            alert("Sorry cannot filter an empty value")
        }
    }

    // add students dropdown state
    const add_details = () => {
        setDropDown(!dropDown)
        setFilterDrop(false)
        setFilterTable(false)
        setReceivedFilter([])
    }

    // filter students based on mentor state
    const filter_details = () => {
        setFilterDrop(!filterDrop)
        setDropDown(false)
        // setFilterTable(!filterTable)
    }

    // to clear the filter search
    const filter_clear = () => {
        setFilterDrop(false)
        setReceivedFilter([])
        setDropDown(false)
        setFilterTable(false)
        setFilterData("")
    }


    // to clear the students edit info
    const handleClear = () => {
        setStudentEdit(false)
        setStudentName("")
        setStudentEmail("")
        setStudentPhone("")
        setStudentMentor("")
        setDropDown(false)
    }

    return (
        <div className="container">
            <div className="add_student mt-3" id="students_box">
                <button className={`btn btn-${!filterDrop ? "secondary" : "danger"}`} onClick={filter_details}>
                    {
                        filterDrop ? <i className="fas fa-times-circle"></i> : <i className="fas fa-filter"></i>
                    }
                </button>
                <button className={`btn btn-${!dropDown ? "success" : "danger"}`} onClick={add_details}>
                    {
                        dropDown ? <><i className="far fa-times-circle"></i> Close</> : <><i className="fas fa-user-plus"></i> Student</>
                    }
                </button>
            </div>

            {
                !filterDrop ? "" :
                    <div className="container mt-2">
                        <h4>Filter students data by Mentor:</h4>
                        <label>Choose Mentor:</label>
                        <div class="input-group mb-3">
                            <select class="form-select" value={filterData} onChange={(e) => setFilterData(e.target.value)} id="inputGroupSelect02">
                                <option defaultValue></option>
                                {
                                    mentorName.map((obj) => {
                                        return (
                                            <option value={obj.mentor_details.Name}>{obj.mentor_details.Name}</option>
                                        )
                                    })
                                }
                            </select>
                            <button class="btn btn-success" onClick={filter}><i class="fa fa-search" aria-hidden="true"></i></button>
                            <button className="btn btn-danger text-center" onClick={filter_clear}><i class="far fa-times-circle" aria-hidden="true"></i></button>
                        </div>
                    </div>
            }
            {
                !dropDown ? " " :
                    <form onSubmit={studentEdit ? handleEdit : handleSubmit}>
                        <h4 className="m-2">Add Student Details:</h4>
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" value={studentName} onChange={(e) => setStudentName(e.target.value)} id="floatingInput" placeholder="name@example.com" required />
                                        <label htmlFor="floatingInput">Student Name</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} id="floatingInput" placeholder="name@example.com" required />
                                        <label htmlFor="floatingInput">Email id</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-floating mb-3">
                                        <input type="tel" className="form-control" value={studentPhone} onChange={(e) => setStudentPhone(e.target.value)} id="floatingInput" placeholder="name@example.com" required />
                                        <label htmlFor="floatingInput">Phone Number</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-floating">
                                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" value={studentMentor} onChange={(e) => setStudentMentor(e.target.value)} required>
                                            <option defaultValue></option>
                                            {
                                                mentorName === [] ? <h4>Add Mentor First</h4> :
                                                    <>
                                                        {
                                                            mentorName.map((obj) => {
                                                                return (
                                                                    <option value={obj.mentor_details.Name}>{obj.mentor_details.Name}</option>
                                                                )
                                                            })
                                                        }
                                                    </>
                                            }
                                        </select>
                                        <label htmlFor="floatingSelect">Choose Mentor</label>
                                    </div>
                                </div>
                                {
                                    studentEdit ? <div className="mb-3 mt-3">
                                        <button className="btn btn-success mx-3" type="submit">Save</button>
                                        <button className="btn btn-danger mx-3" onClick={handleClear} type="submit">Cancel</button>
                                    </div> :
                                        <div className="mb-3 mt-3">
                                            <button className="btn btn-success" type="submit">Submit</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </form>
            }

            <div className="student_details mt-3 mb-3">
                {
                    tableDetails == "" ? <h4 className="text-center mt-5">No Student Data Available, Add Mentor Data first and then Student Data</h4> :
                        <table className="table table-striped col text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Mail id</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Mentor Assigned</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterTable ?
                                        <>{
                                            receivedFilter == "" ? <h4>No Data</h4> :
                                                <>{
                                                    receivedFilter.map((obj) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{obj.student_details.Name}</th>
                                                                <td>{obj.student_details.Email}</td>
                                                                <td>{obj.student_details.Phone}</td>
                                                                <td>{obj.student_details.Mentor}</td>
                                                                <td>
                                                                    <div className="row">
                                                                        <div className="col g-1">
                                                                            <button className="btn btn-secondary" onClick={() => edit(obj)}><i className="fas fa-edit"></i></button>
                                                                        </div>
                                                                        <div className="col g-1">
                                                                            <button className="btn btn-danger" onClick={() => handleDelete(obj._id)}><i className="fas fa-user-minus"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }</>
                                        }</> : <>
                                            {
                                                tableDetails.map((obj) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{obj.student_details.Name}</th>
                                                            <td>{obj.student_details.Email}</td>
                                                            <td>{obj.student_details.Phone}</td>
                                                            <td>{obj.student_details.Mentor}</td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col g-1">
                                                                        <button className="btn btn-secondary" onClick={() => edit(obj)}><i className="fas fa-edit"></i></button>
                                                                    </div>
                                                                    <div className="col g-1">
                                                                        <button className="btn btn-danger" onClick={() => handleDelete(obj._id)}><i className="fas fa-user-minus"></i></button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </>
                                }

                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default Students
