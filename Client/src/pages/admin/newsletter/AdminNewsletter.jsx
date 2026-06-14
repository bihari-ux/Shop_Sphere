import React, { useEffect, useState } from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'

import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';                                         // Import jQuery
import 'datatables.net-dt/css/dataTables.dataTables.min.css';   // Import DataTables styles
import 'datatables.net';

import { deleteNewsletter, getNewsletter, updateNewsletter } from "../../../Redux/ActionCreartors/NewsletterActionCreators"
export default function AdminNewsletter() {
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let [flag, setFlag] = useState(false)
    let dispatch = useDispatch()

    function deleteRecord(_id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteNewsletter({ _id: _id }))
            getAPIData()
        }
    }

    function updateRecord(_id) {
        if (window.confirm("Are You Sure to Update the Status : ")) {
            let item = NewsletterStateData.find(x => x._id === _id)
            let index = NewsletterStateData.findIndex(x => x._id === _id)
            dispatch(updateNewsletter({ ...item, active: !item.active }))
            NewsletterStateData[index].active = !item.active
            setFlag(!flag)
        }
    }

    function getAPIData() {
        dispatch(getNewsletter())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [NewsletterStateData.length])
    return (
        <>
            <HeroSection title="Admin - Newsletter" />
            <div className="container-fluid py-5 mb-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Newsletter </h5>
                        <div className="table-responsive">
                            <table id='DataTable' className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th>Active</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        NewsletterStateData.map((item) => {
                                            return <tr key={item._id}>
                                                {/* return <tr key={item._id}> */}
                                                {/* <td>{item.id}</td> */}
                                                <td>{item._id}</td>
                                                <td>{item.email}</td>
                                                {/* <td className={`${item.active ? 'text-success' : 'text-danger'}`} onClick={() => updateRecord(item.id)} style={{ cursor: "pointer" }}>{item.active ? "Yes" : "No"}</td> */}
                                                <td className={`${item.active ? 'text-success' : 'text-danger'}`} onClick={() => updateRecord(item._id)} style={{ cursor: "pointer" }}>{item.active ? "Yes" : "No"}</td>
                                                {/* <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash fs-4'></i></button> : null}</td> */}
                                                <td><button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='fa fa-trash fs-4'></i></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
