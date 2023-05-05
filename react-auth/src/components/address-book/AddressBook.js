import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import DataTable,{createTheme} from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen,faTrash,faNewspaper } from '@fortawesome/free-solid-svg-icons';
import {index,drop,search} from '../../end-points/Api';
import Swal from 'sweetalert2'

const AddressBook=(props)=> {

    const token='Bearer '+props.token
    const navigate = useNavigate();
    const [searchKey,setSearchKey]=useState("")
  
    const navigateToEdit=(state)=>{
        navigate(`edit/${state.id}`)
    }
    const navigateToView=(state)=>{
        navigate(`view/${state.id}`)
    }

    const deleteData=(id)=>{
        fetch(drop+"/"+id,{headers:{
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        },
            method: 'DELETE',
        }).then(data => {
            fetchAddress()
        })
    }
    const handleDelete=(state)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(state.id);
                Swal.fire(
                'Deleted!',
                'Data has been deleted.',
                'success'
                )
            }
        })
    }

    createTheme('solarized', {
        text: {
          primary: '#000',
          secondary: '#2aa198',
        },
        background: {
          default: 'transparent',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');
    
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: false,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: false,
            
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: false,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: false,
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,

        },
        {
            name: 'Website',
            selector: row => row.website,
            sortable: false,
        },
        {
            name: 'Nationality',
            selector: row => row.nationality,
            sortable: false,
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: false,
            button:true,
            cell: (row) => [
                <a to="#" key={`view`+row.id} id={row.id} onClick={()=>{navigateToView(row)}} className="text-info action_button " title="View"> <FontAwesomeIcon icon={faNewspaper} /></a>,
                <span key={"span"+row.id} className=""> &nbsp; </span>,
                <a to="#" key={row.id} id={row.id} onClick={()=>{navigateToEdit(row)}} className="text-info action_button" title="Edit"> <FontAwesomeIcon icon={faPen} /></a>,
                <span key="span" className=""> &nbsp; </span>,
                <Link key={`trash`+row.id} id={row.id} onClick={()=>{handleDelete(row)}}  className="text-danger action_button" title="Delete" ><FontAwesomeIcon icon={faTrash} /></Link>,
            ]
        },
    ];
    let [address,setAddress]=useState([]);

	const fetchAddress = () => {
	    fetch(index,{headers:{
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        }})
	      .then(response => {
		return response.json()
	      })
	      .then(data => {
		    setAddress(data)
	    })
	}


    const handleSearchKey=(value)=>{
        setSearchKey(value)
    }

    const handleRefresh=()=>{
        fetchAddress()
        setSearchKey("")
    }

    const handleSearch=()=>{
        if(searchKey!="")
        {
            fetch(search,{headers:{
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
                },
                body: JSON.stringify({'searchKey':searchKey}),
                method:"POST"
            })
              .then(response => {
                return response.json()
              })
              .then(data => {
                setAddress(data)
            })
        }
        
    }
      
	useEffect(() => {
	    fetchAddress()
	}, [])

    return (
        <>
            <div className="col-md-12">
                <h5 className="text-primary">Address Book</h5>
                <div className="row">
                    <div className="col-md-3">
                        <input type="text" className="form-control" name="searchKey" onChange={e => handleSearchKey(e.target.value)} value={searchKey} placeholder="Search by name or phone"/>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-primary btn-sm" onClick={handleSearch}>Search</button>
                        &nbsp;
                        <button className="btn btn-warning btn-sm" onClick={handleRefresh}>Refresh</button>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={address}
                    pagination
                    theme="solarized"
                />
            </div>
        </>
    );
}

export default AddressBook
