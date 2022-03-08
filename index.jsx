import React, { useState} from 'react';
import './PostCreateModal.scss';
import iconImgSix from '../../assets/images/users-images/user-rechard.svg';
import galleryIcon from '../../assets/images/icons-images/gallery-icon.svg';
import screenLive from '../../assets/images/menu-icons/live-icon.svg';
import chatCloseIcon from '../../assets/images/6-screen/chat-mini/cancel.svg';
import plusIcon from '../../assets/images/icons-images/plus-icon.svg';
import smallLockIcon from '../../assets/images/1-screen/center/lock-small.svg';
import worldIcon from '../../assets/images/6-screen/chat-mini/globe.svg';


const PostCreateModal = (props) => {

    // Switch Public / Private 
    const [privacyDnd, setPrivacyDnd] = useState("Public");

    // image helder which is Show input Field
    const [renderImages, setRenderImages] = useState([])

    // OnDrag Image in And Out Hole Work here
    const [dnd, setDnd] = useState(false);

    const handleDragEnter = event => {
        event.preventDefault()
        event.stopPropagation()
        console.log('On Drag Enter >>> ', event.target.className);
        setDnd(!dnd);

    };

    const handleDragLeave = event => {
        event.preventDefault()
        event.stopPropagation()
        console.log('On Drag Leave >>> ', event.target.className);
        setDnd(!dnd);
    };


    const handleDropStatus = event => {

        event.preventDefault()
        event.stopPropagation()
        let file = event.dataTransfer.files;
        console.log(file);
    }
    // OnDrag Image in And Out Hole Work end here

    const [imgUploadedUiStatus, setImgUploadedUiStatus] = useState(false);
    const imagePorsoneStatus = () => {
        setImgUploadedUiStatus(true);
    }
    const imagePorsoneStatusCloserButton = () => {
        setImgUploadedUiStatus(false);
    }

    const { tooglePostCreateModal } = props;
    const { token } = JSON.parse(localStorage.getItem('likebunnies_details'));

    // use Startes define
    const [formData, setFormData] = useState(
        {
            "pictures_videos": "picture",
            "file_type": "picture",
            "file_priority": "main",
            "posts_assets": [],
            "user_id": 2,
            "title": "Dummy Post",
            "description": "This is A Dummu Post Ok"
        }
    )
    // {
    //     "pictures_videos": "picture",
    //     "file_type": "picture",
    //     "file_priority": "main",
    //     "posts_assets": [],
    //     "user_id": 2,
    //     "title": "Dummy Post",
    //     "description": "This is A Dummu Post Ok"
    // }


// pictures_videos : "picture"
// file_type : "picture"
// file_priority: "main"
// posts_assets[0]: undefined
// user_id: "2"
// title: "Dummy Post"
// description: "This is A Dummu Post Ok"

    // input data greap
    const inputHandleChange = e => {
        let newFormData = { ...formData };
        let shouldAddToForm = false;

        if (e.target.name === 'posts_assets') {
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file)); //Ui purpuss
            setRenderImages(fileArray)
            const fileRealArray = Array.from(e.target.files);
            newFormData[e.target.name] = fileRealArray; // if fileReal Array  array of object
            //newFormData[e.target.name] = fileArray; // if blob data
            shouldAddToForm = true;

            // console.log(fileArray)

            // fileArray.forEach( image =>{
            //     console.log("maruf Mobin", image)
            //     const reader = new FileReader(image);
            //     console.log(reader)
            //     reader.addEventListener( 'load', e =>{
            //             console.log("Ya Ali Madad",e)
            //     } ) 

            // })
            //   let newForm =  new FormData()
            //     newForm = { ...formData}
            //     console.log(newForm)
            //     formData.posts_assets.forEach( file =>{
            //         newForm.append('post_asset',file)
            //     })

        } else {
            newFormData[e.target.name] = e.target.value;
            shouldAddToForm = true;
        }
        console.log("shfin Bhai 117", newFormData)
        if (shouldAddToForm) {
            setFormData(newFormData);
        }
    }
    // image delete porsone 
    const imageDeleterButton = e => {
        setRenderImages(renderImages.filter((item, index) => index != e))
    }

    // Form Values
    const handlePostSubmit = (e) => {
        console.log("Gar Tere jabbar Bhai ", formData)
        e.preventDefault();
        console.log("onSubmit a form data", formData)
        // let newForm =  new FormData()
        // newForm = { ...formData}
        // console.log(newForm)
        // formData.posts_assets.forEach( file =>{
        //     newForm.append('post_asset',file)
        // })
        // console.log("148 No line ",typeof formData.posts_assets )
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append('Authorization', `Bearer ${token}`);

        // console.log(finalData, "Form Submit ar Por Pawa Data Man")
        // const { ...formData } = renderImages;
        // formData["file_priority"] = privacyDnd
        // formData["posts_assets"] = renderImages // ye Comment out rahne se array of object jayega
        // console.log(formData,"final Data For Ready to Gone Server")
        // fetch(`http://localhost:5000/post`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // })
        //     .then(res => res.json())
        //     .then(data => console.log("Rafi Bhai", data))
        //     .catch(err => console.error(err))
        // const requestdata = { title: "shafin bhai" , description: "marufdksfajdsklfjakldsjfklasdjfk"}
        // const data = { requestdata: requestdata};

        fetch(`https://likebunniesapiapp.herokuapp.com/public/api/create-post`,{
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(formData)
        })
        .then( res => res.json())
        .then( data => console.log("Rafi Bhai",data))
        .catch( err => console.error(err))
    }
    const { username } = JSON.parse(localStorage.getItem('likebunnies_details'))
    return (
        <div className='theme-modal-parent'>
            <div className="row w-100">
                <div className="col-12 col-lg-4 mx-auto">
                    <div className="theme-modal-body l">
                        <div className="card card_style">
                            <div className="card-body p-0 ">
                                <div className="post-header d-flex justify-content-center p-3 align-items-center">
                                    <h3 className='flex-grow-1 creat-post-header-text'>Create post</h3>
                                    <button className='ms-auto creact-post-header-close-btn d-flex justify-content-center align-items-center' onClick={tooglePostCreateModal}>
                                        <img src={chatCloseIcon} alt="" />
                                    </button>
                                </div>
                                <form className='p-3' method="POST" encType="multipart/form-data">
                                    <div className='d-flex pb-4 align-items-center'>
                                        <img src={iconImgSix} alt="" className='me-3' />
                                        <div>
                                            <h6>{username}</h6>
                                            <div className="dropdown">
                                                <button className="select-field rounded-pill dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onChange={inputHandleChange} name="file_priority">
                                                    {privacyDnd === "Private" ? <div><img src={smallLockIcon} alt="" />  <span className='ms-2'>Private </span></div> : <div><img src={worldIcon} alt="" className='w-25' />  <span className='mx-2'>Public </span></div>}
                                                    {console.log(privacyDnd)}
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li className='dropdown-item option-text-design cursor-pointer' onClick={e => setPrivacyDnd(e.target.innerText)} >   Private </li>
                                                    <li className='dropdown-item option-text-design cursor-pointer' onClick={e => setPrivacyDnd(e.target.innerText)}>Public</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        
                                        <textarea name="description" id="text-area-design" onChange={inputHandleChange} className={imgUploadedUiStatus ? `form-control border-0 fs-4 textarea-design mb-3 textarea-resize-box` : `form-control border-0 fs-4 textarea-design mb-3 `} rows={4} placeholder="What’s on your mind, Richard@5369? " ></textarea>
                                        {/* Img Uploaded Section Here */}
                                        {
                                            renderImages.length ?

                                                //  Smallere then 2
                                                <div className='d-flex flex-wrap overflow-auto pe-3  image-background-div text-break'>
                                                    {renderImages.map((post_asset, index) =>
                                                        <div key={index} className="w-50 pe-1 ps-1">
                                                            <div className='image-parent-div' data-imgindex={index}>
                                                                {/* <span>Md Rafi Bhai</span> */}
                                                                <img src={post_asset} alt="" className="uploadImagesShow img-fluid" />
                                                                <div className='image-closer-button' onClick={() => imageDeleterButton(index)}>
                                                                    <span className='text-center d-flex p-1 justify-content-center align-items-center'><img src={chatCloseIcon} alt="" className='w-50 text-center' /></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                :
                                                // Post Image Upload Porsone start  here
                                                imgUploadedUiStatus && <div className={dnd ? `drugTime` : `video-img-upload-field image-uploader-field`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrag={handleDropStatus}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-12 p-lg-5 text-center  position-relative" >
                                                            <div className='videoInputField'>
                                                                <label htmlFor="inputVideoBtn">
                                                                    <img src={plusIcon} alt="" className='btn rounded-pill d-flex justify-content-center align-items-center chat_left-menu ' />
                                                                </label>
                                                                <h5>Add Photos/Videos</h5>
                                                                <span>or drag and drop</span>
                                                                <input type="file" id="inputVideoBtn" name="posts_assets" accept="image/png, image/gif, image/jpeg" multiple onChange={inputHandleChange} />
                                                            </div>
                                                            <div className='vidoe-closer-button' onClick={imagePorsoneStatusCloserButton}>
                                                                <span><img src={chatCloseIcon} alt="" /></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>

                                    <div className='video-img-upload-field' >
                                        <div className='d-flex align-items-center my-4 p-2' >
                                            <div className='flex-grow-1'>
                                                <p className="ms-3 m-0">Add to Post</p>
                                            </div>

                                            {/* Post Video Upladed Code Here */}
                                            <div className="d-flex justify-content-center align-items-center user_status user-status-backgorund cursor-pointer"><img src={screenLive} alt="" onClick={imagePorsoneStatus} /></div>

                                            {/* image uploader anoter button */}
                                            <div className="d-flex mx-3 justify-content-center align-items-center user_status user-status-backgorund cursor-pointer"><img src={galleryIcon} alt="" onClick={imagePorsoneStatus} /></div>
                                        </div>
                                    </div>
                                    <input type="submit" className="postBtn w-100" value='Publish' onClick={handlePostSubmit} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCreateModal;
