import React from 'react';

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
import axios from "axios"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
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
export default function NewsEdit(props) {
    const [open, setOpen] = React.useState(false);
    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = React.useState(null);
    const [Category, SetCategory] = React.useState([])
    const [SubCategory, SetSubCategory] = React.useState([])
    const [Image, SetImage] = React.useState('')
    const [News, setNews] = React.useState({
        Title: props.data.Title,
        Category_id: props.data.Category_id,
        Link: props.data.Link,
        Meta_Description: props.data.Meta_Description,
        Meta_title: props.data.Meta_title,
        StrainType: props.data.StrainType,
        SubCategory_id: props.data.SubCategory_id,
        Url_slug: props.data.Url_slug,
        Alt_Text: props.data.Alt_Text,
        Image:props.data.Image

    });
    React.useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    const handleimage = (event) => {

        SetImage(event.target.files[0])
    };
    const handleChange = (event) => {
        const value = event.target.value
        setNews({
            ...News,
            [event.target.name]: value
        });
    }

    const handleClickOpen = () => {
        setOpen(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/Get-NewsCategory/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetCategory(response.data)

        })


        axios("http://34.201.114.126:8000/AdminPanel/Get-NewsSubCategory/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {

            SetSubCategory(response.data.data)

        })



    }, [token_data])


    const formdata = new FormData();
    formdata.append('Title', News.Title);
    formdata.append('Category_id', News.Category_id);
    formdata.append('Link', News.Link);
    formdata.append('Meta_Description', News.Meta_Description);
    formdata.append('Meta_title', News.Meta_title);
    formdata.append('StrainType', News.StrainType);
    formdata.append('SubCategory_id', News.SubCategory_id);
    formdata.append('Url_slug', News.Url_slug);
    formdata.append('Alt_Text', News.Alt_Text);
    formdata.append('Image', Image);
    formdata.append('Description', convertedContent);
    formdata.append('Url_slug', News.Url_slug)
    const Submit = () => {
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        Axios.post(
            `http://34.201.114.126:8000/AdminPanel/update-News/${props.data.id}`,
            formdata,
            config
        ).then(() => {
            setOpen(false);
        })
    };

    const file = document.querySelector('#file');
    if (file) {
        file.addEventListener('change', (e) => {
            // Get the selected file
            const [file] = e.target.files;
            // Get the file name and size
            const { name: fileName, size } = file;
            // Convert size in bytes to kilo bytes
            const fileSize = (size / 1000).toFixed(2);
            // Set the text content
            const fileNameAndSize = `${fileName} - ${fileSize}KB`;
            document.querySelector('.file-name').textContent = fileNameAndSize;
        });
    }
    return (
        <div>

            <Button color='success' onClick={handleClickOpen}>
                Edit
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
                                    <div className="col "> <h2> Edit News
                                    </h2>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  con  '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Title:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="Text" placeholder=' Title' id="outlined-basic" name='Title' variant="outlined" value={News.Title} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  con  '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Meta Title:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="Text" placeholder='Meta Title' id="outlined-basic" name='Meta_title' variant="outlined" value={News.Meta_title} style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top   Add_Category_pop'>
                                    <div className='col-2'>
                                        <label className=''>
                                            Category:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <Select
                                            name='Category_id'
                                            value={News.Category_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}
                                        >
                                            <MenuItem value="" style={{ fontSize: 15 }}>
                                                <em>Select option</em>
                                            </MenuItem>
                                            {
                                                Category.map((Category) => {
                                                    return (

                                                        <MenuItem value={Category.id} style={{ fontSize: 15 }}>{Category.name}</MenuItem>

                                                    )

                                                })
                                            }

                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Sub Category:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <Select
                                            name='SubCategory_id'
                                            value={News.SubCategory_id}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}
                                        >
                                            <MenuItem value="" style={{ fontSize: 15 }}>
                                                <em>Select option</em>
                                            </MenuItem>
                                            {
                                                SubCategory.map((SubCategory) => {
                                                    return (

                                                        <MenuItem value={SubCategory.id} style={{ fontSize: 15 }}>{SubCategory.name}</MenuItem>

                                                    )

                                                })
                                            }

                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Strain Type:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <Select
                                            name='StrainType'
                                            value={News.StrainType}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }} style={{ minWidth: 190, fontSize: 15, background: "#AAAAAA" }}
                                        >
                                            <MenuItem value="" style={{ fontSize: 15 }}>
                                                <em>Select option</em>
                                            </MenuItem>
                                            <MenuItem value={"N"} style={{ fontSize: 15 }}>None</MenuItem>
                                            <MenuItem value={"i"} style={{ fontSize: 15 }}>Indica</MenuItem>
                                            <MenuItem value={"s"} style={{ fontSize: 15 }}>Sativa</MenuItem>
                                            <MenuItem value={"h"} style={{ fontSize: 15 }}>Hybrid</MenuItem>
                                            <MenuItem value={"c"} style={{ fontSize: 15 }}>CBD</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label >
                                            Featured Image:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <div className=' col-2 image_uploade center'>

                                            <div className='top MdFileUpload'>
                                               

                                                {
                                                    Image ? <img src={URL.createObjectURL(Image)} alt="" style={{ width: "90px", height: "81px", borderRadius: "10px" }} /> :

                                                    (
                                                      News.Image?  <img src={"http://34.201.114.126:8000/" + (News.Image)} alt="" style={{ width: "90px", height: "81px", borderRadius: "10px" }} /> :
                                                      <MdFileUpload style={{backgroundColor:"#31B665" , borderradius: "66px"}} ></MdFileUpload > 
                                                    )
                                                    
                                                }
                                            </div>
                                            <div className='col-12 center  top Sku'>
                                                <div className="file-input">
                                                    <input type="file" id="file" className="file" onChange={handleimage} />
                                                    <label htmlFor="file"  >
                                                        UPLOAD
                                                        <p className="file-name"></p>
                                                    </label>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Alt Text:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="text" placeholder='Add Alt Text' name='Alt_Text' value={News.Alt_Text} id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Link:
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="Text" placeholder='Add Link' name='Link' value={News.Link} id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Url slug :
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="Text" placeholder=' Url slug' name='Url_slug' value={News.Url_slug} id="outlined-basic" variant="outlined" style={{ minWidth: 190, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  con  '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Meta Description :
                                        </label>
                                    </div>
                                    <div className='col-10 '>
                                        <TextField type="Text" placeholder='Meta Description' id="outlined-basic" name='Meta_Description' variant="outlined" value={News.Meta_Description} style={{ minWidth: 400, fontSize: 15 }}
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='col-12 top  Add_Category_pop  '>
                                    <div className='col-2'>
                                        <label className=''>
                                            Description:
                                        </label>
                                    </div>
                                    <div className='col-10 editer'>

                                        <Editor
                                            editorState={editorState}
                                            onEditorStateChange={setEditorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                        />
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