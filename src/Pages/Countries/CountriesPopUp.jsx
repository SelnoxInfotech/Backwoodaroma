import  React ,{useContext} from 'react';
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
import Createcontext from "../../Hooks/Context/Context"
import { useSnackbar } from 'notistack';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderWidth: "1px",
          borderColor: 'black',
        },
  },
}));

function BootstrapDialogTitle() {

}
export default function CountriesPopUp() {
    const { enqueueSnackbar } = useSnackbar();
    const { dispatch} = useContext(Createcontext)
    const [open, setOpen] = React.useState(false);
    const [Status, setStatus] = React.useState('Active');
    const [Namecountries, setNamecountries] = React.useState('');
    const [error , seterror] = React.useState('') 
    const handleStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleName = (event) => {
        setNamecountries(event.target.value.toUpperCase());
       
    };
   
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        seterror("")
    };


    const Submit = () => {
        const cookies = new Cookies();
        const token_data = cookies.get('Token_access')

        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        const data = {
            "CountryName": Namecountries,
           "Status":Status
           }
        Axios.post( 
          'http://34.201.114.126:8000/AdminPanel/Add-Country/',
          data,
          config
        ).then(()=>{
            setOpen(false);
            dispatch({type:'api',api: true})
            setStatus("")
            setNamecountries("")
        }).catch(
            function (error) {
                
                const d = error.response.data.error
                 const name = d.CountryName[0]
                seterror("red")
                enqueueSnackbar( name, { variant: 'error' });
            

                return Promise.reject(error)
            }
        )
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add countries
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

                                <div className='col-12 Add_countries Add_Category center'>
                                    <div className="col "> <h2> Add Countries
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top label  con  '>
                                    <div className='col'>
                                    <label className='label'>
                                    <span className='required'>*</span>
                                    Country Name:
                                    </label>
                                    </div>
                                  <div className='col'>
                                  <TextField placeholder='Add Country Name' inputProps={{style: {fontSize: 15}}} id="outlined-basic" variant="outlined"   value={Namecountries } style={{minWidth: 190 , fontSize:15}}
                                        onChange={handleName}
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                  borderColor:error
                                                },}
                                        }}
                                         />
                                  </div>
                                </div>
                                <div className='col-12 top label  con'>
                                   <div className='col'>
                                   <label className='label'>
                                   Status:
                                    </label>
                                   </div>
                                 <div className='col'>
                                 <Select
                                        
                                        value={Status}
                                        onChange={handleStatus}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }} style={{minWidth: 190 , fontSize:15}}>
                                        <MenuItem value={"Active"} style={{ fontSize:15}}>Active</MenuItem>
                                        <MenuItem value={"Hide"} style={{ fontSize:15}}>  Hide</MenuItem>
                                    </Select>
                                  </div>
                                </div>
                               
                                <div className='col-12 center top' >
                                    <button className='btn Sub_button' autoFocus onClick={Submit} style={{ fontSize:15}}>
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