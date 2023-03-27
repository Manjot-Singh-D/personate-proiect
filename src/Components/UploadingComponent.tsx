import React from 'react'

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CancelIcon from '@mui/icons-material/Cancel';
import "../App.css"

interface IPROPS {
    removeFile: any;
    progressDetails: any;
    selectCurrentFile: any;
    selectFile: any;
    removeShowingSelectedFile: any;
};

const UploadingComponent: React.FC<IPROPS> = (props: any) => {
    return (
        <div className="uploadingContainer">
            <ListItemAvatar className="playIcon" onClick={() => {
                if (props.selectFile.file === props.progressDetails.file) {
                    props.removeShowingSelectedFile()
                }
                else {
                    props.selectCurrentFile(props.progressDetails.file)
                }
            }} >
                {
                    props.progressDetails.value < 100 ?
                        <CircularProgress /> :
                        (
                            props.selectFile && props.selectFile.file === props.progressDetails.file ?
                                <PauseIcon
                                    fontSize="large" style={{ height: "2rem", width: "2rem" }} /> :
                                <PlayArrowIcon fontSize="large" style={{ height: "2rem", width: "2rem" }} />
                        )
                }
            </ListItemAvatar>
            <ListItemText className='uploadingContainerTextArea' onClick={() => props.selectCurrentFile(props.progressDetails.file)}
                style={{ width: "inherit", marginLeft: "0.8rem", borderLeft: "0.5px solid #00000020", paddingLeft: "1rem" }}
                secondary={
                    <React.Fragment>
                        <div className='uploadingContainerText' style={{ fontWeight: "700", fontSize: "1rem", position: "relative" }}>
                            <span style={{ transform: "translateY(-5px)" }}>
                                {props.progressDetails.file.name}
                            </span>

                        </div>
                        <div className='progressContainer' style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            <LinearProgress style={{ width: "80%", height: "10px", borderRadius: "3px" }} variant="determinate" value={props?.progressDetails?.value} />
                            <p className='uploadingContainerPerc' style={{ width: "fit-content", marginLeft: "10px", fontSize: "16px", fontWeight: "700" }}>{`${props?.progressDetails?.value} %`}</p>
                        </div>
                    </React.Fragment>
                }
            />
            <CancelIcon className='cancelIcon' style={{ top: "-10%" }} onClick={() => props.removeFile(props.progressDetails.file)} />
        </div>
    )
}

export default UploadingComponent;