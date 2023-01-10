import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function Categorypopup() {
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [open, setOpen] = React.useState(false);
    const [Category, setCategory] = React.useState('Active');
    const [NameCategory, setNameCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleName = (event) => {
        setNameCategory(event.target.value.toUpperCase());
    };


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handlechanges = () => {

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "name": NameCategory,
            "Status": Category
        }
        Axios.post(
            'http://34.201.114.126:8000/AdminPanel/Add-Category/',
            data,
            config
        ).then(() => {
            setOpen(false);
            setNameCategory("");
            setCategory("");
        })
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Category
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
                }}>
                <DialogContent dividers>
                    <div className='container-fluid '>
                        <div className='row'>
                            <div className='col-12  ' >
                                <div className='col-12 Add_Category center'>
                                    <div className="col "> <h2> Add Category
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                        <label className='label'>
                                            Name*:
                                        </label>
                                    </div>
                                    <div className='col'>
                                        <TextField placeholder='Add Category' id="outlined-basic" variant="outlined" value={NameCategory || ""}
                                            onChange={handleName} style={{ minWidth: 190, fontSize: 15, }} />
                                    </div>
                                </div>
                                <div className='col-12 top label  con'>
                                    <div className='col'>
                                        <label className='label'>
                                            Status:
                                        </label>
                                    </div>
                                    <div className='col ' >
                                        <Select value={Category} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label', }} style={{ minWidth: 190, fontSize: 15 }} >
                                            <MenuItem value={Category}>

                                            </MenuItem>
                                            <MenuItem value={"Active"} style={{ fontSize: 15 }}>Active</MenuItem>
                                            <MenuItem value={"Hide"} style={{ fontSize: 15 }}>  Hide</MenuItem>

                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 center top'>
                                    <button className='btn Sub_button' onClick={handlechanges} style={{ fontSize: 15 }}>
                                        Save Changes
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