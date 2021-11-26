import './Mentor.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import env from '../settings'

function Mentor() {

    useEffect(() => {
        fetchdata()
    }, [])

    const [mentorID, setMentorID] = useState("")
    const [mentorName, setMentorName] = useState("")
    const [mentorEmail, setMentorEmail] = useState("")
    const [mentorPhone, setMentorPhone] = useState("")
    const [mentorField, setMentorField] = useState("")
    const [dropDown, setDropDown] = useState(false)
    const [tableDetails, setTableDetails] = useState([])
    const [mentorEdit, setMentorEdit] = useState(false)


    const fetchdata = async (e) => {
        try {
            let data = await axios.get(`${env.api}/mentor`)
            setTableDetails([...data.data])
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        let mentor_details = {
            "Name": mentorName,
            "Email": mentorEmail,
            "Phone": mentorPhone,
            "Field": mentorField
        };
        try {
            let mentor_create = await axios.post(`${env.api}/create-mentor`, { mentor_details })
            setMentorName("")
            setMentorEmail("")
            setMentorPhone("")
            setMentorField("")
            fetchdata()
            setDropDown(false)
        } catch (error) {
            console.log(error)
        }

    }

    const handleDelete = async (id) => {
        try {
            let mentor_delete = await axios.delete(`${env.api}/delete-mentor/${id}`)
            fetchdata()
        } catch (error) {
            console.log(error)
        }

    }


    const edit = (obj) => {
        setMentorEdit(true)
        setDropDown(true)
        setMentorID(obj._id)
        setMentorName(obj.mentor_details.Name)
        setMentorEmail(obj.mentor_details.Email)
        setMentorPhone(obj.mentor_details.Phone)
        setMentorField(obj.mentor_details.Field)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        let mentor_details = {
            "Name": mentorName,
            "Email": mentorEmail,
            "Phone": mentorPhone,
            "Field": mentorField
        };
        try {
            let editdata = await axios.put(`${env.api}/edit-mentor/${mentorID}`, { mentor_details })
            setMentorEdit(false)
            setMentorName("")
            setMentorEmail("")
            setMentorPhone("")
            setMentorField("")
            setDropDown(false)
            fetchdata()
        } catch (error) {
            console.log(error)
        }

    }
    const add_details = () => {
        setDropDown(!dropDown)
    }

    const handleClear = () => {
        setMentorEdit(false)
        setMentorName("")
        setMentorEmail("")
        setMentorPhone("")
        setMentorField("")
        setDropDown(false)
    }

    return (
        <div className="container">
            <div className="add_mentor mt-3" id="mentor_box">
                <button className={`btn btn-${!dropDown ? "success" : "danger"}`} onClick={add_details}>
                    {
                        dropDown ? <><i className="far fa-times-circle"></i> Close</> : <><i className="fas fa-user-plus"></i> Mentor</>
                    }
                </button>
            </div>
            {
                !dropDown ? " " :
                    <form onSubmit={mentorEdit ? handleEdit : handleSubmit}>
                        <h4>Add Mentor Details:</h4>
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" value={mentorName} onChange={(e) => setMentorName(e.target.value)} id="floatingInput" placeholder="name@example.com" required />
                                        <label htmlFor="floatingInput">Mentor Name</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" value={mentorEmail} onChange={(e) => setMentorEmail(e.target.value)} id="floatingInput" placeholder="name@example.com" required />
                                        <label htmlFor="floatingInput">Email id</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-floating mb-3">
                                        <input type="tel" className="form-control" value={mentorPhone} onChange={(e) => setMentorPhone(e.target.value)} id="floatingInput" placeholder="name@example.com" required />
                                        <label htmlFor="floatingInput">Phone Number</label>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" value={mentorField} onChange={(e) => setMentorField(e.target.value)} id="floatingInput" placeholder="name@example.com" required />
                                        <label htmlFor="floatingInput">Mentor's Field</label>
                                    </div>
                                </div>
                                {
                                    mentorEdit ? <div className="mb-3 mt-3">
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

            <div className="mentor_details mt-3 mb-3">
                <h4 className="m-2">Mentor Details:</h4>
                {
                    tableDetails.length == "" ? <h4 className="text-center">No Mentor Data Found!</h4> :
                        <table className="table table-striped col text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Mentor Name</th>
                                    <th scope="col">Mail id</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Field</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableDetails.map((obj) => {
                                        return (
                                            <tr>
                                                <th scope="row">{obj.mentor_details.Name}</th>
                                                <td>{obj.mentor_details.Email}</td>
                                                <td>{obj.mentor_details.Phone}</td>
                                                <td>{obj.mentor_details.Field}</td>
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
                            </tbody>
                        </table>}
            </div>
        </div>
    )
}

export default Mentor
