import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import Axios from "axios"
import EditerText from "../../Components/TextEditer/TextEditer"
import { MdFileUpload } from 'react-icons/md';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {

}
export default function Couponpopup() {

    const [open, setOpen] = React.useState(false);
    const [Status, setStatus] = React.useState('');
    const [tax, settaxs] = React.useState([]);
    const [type, settype] = React.useState([]);
    const handleStatus = (event) => {
        setStatus(event.target.value);
    };
    // const handleChange = (event) => {
    //     setState(event.target.value.toUpperCase());

    // };


    const handleName = (event) => {
        settaxs(event.target.value);

    };
    const handleTex = (event) => {
        settype(event.target.value.toUpperCase());
    };

    const handleClickOpen = () => {
        setOpen(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    };
    const handleClose = () => {
        setOpen(false);
    };



    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')


        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "tax_value": tax,
            "tax_type": type,
            "Status": Status
        }
        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-Tax/',
            data,
            config
        ).then(() => {
            setOpen(false);
        })
    };


    return (
        <div>

            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Coupon
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "60%",
                            height: "60%",
                            maxWidth: "none",  // Set your width here
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className='container-fluid '>
                        <div className='row '>

                            <div className='col-12    ' >

                                <div className='col-12    center'>
                                    <div className="col "> <h2> Add Coupon
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  con  '>
                                    <div className='col-2'>
                                        <label className=''>
                                            code:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="number" placeholder='Add code' id="outlined-basic" variant="outlined" value={tax} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleName} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  '>
                                    <div className='col-2'>
                                        <label >
                                            code L:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="number" placeholder='Add  code L' id="outlined-basic" variant="outlined" value={tax} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleName} />
                                    </div>
                                </div>
                                <div className='col-12 top   Add_Category_pop'>
                                    <div className='col-2'>
                                        <label className=''>
                                            Type:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <Select
                                            value={Status}
                                            onChange={handleStatus}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}
                                        >
                                            <MenuItem value="" style={{ fontSize: 15 }}>
                                                <em>Percentage</em>
                                            </MenuItem>
                                            <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                            <MenuItem value={"Hide"} style={{ fontSize: 15 }}>Hide</MenuItem>

                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Expires:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <Select
                                            value={Status}
                                            onChange={handleStatus}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}
                                        >
                                            <MenuItem value="" style={{ fontSize: 15 }}>
                                                <em>Select option</em>
                                            </MenuItem>
                                            <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                            <MenuItem value={"Hide"} style={{ fontSize: 15 }}>Hide</MenuItem>

                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Percentage:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="number" placeholder='Add Percentage' id="outlined-basic" variant="outlined" value={tax} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleName} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label >
                                            Repeat:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="number" placeholder='Add Alt Text' id="outlined-basic" variant="outlined" value={tax} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleName} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2 center'>
                                       <input type="checkbox" />
                                    </div>
                                    <div className='col-10 '>
                                        <label >
                                            Bound
                                        </label>
                                    </div>
                                </div>
                                <div className='col-12 center top' >
                                    <button className='btn Sub_button' autoFocus onClick={Submit} >
                                        Save changes
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}