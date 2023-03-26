import React from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
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
};

const UploadingComponent: React.FC<IPROPS> = (props: any) => {
    return (
        <div className="uploadingContainer" onClick={() => props.selectCurrentFile(props.progressDetails.file)}>
            <ListItemAvatar className="playIcon">
                {
                    props.progressDetails.value < 100 ?
                        <CircularProgress /> :
                        (
                            props.selectFile && props.selectFile.file === props.progressDetails.file ?
                                <PauseIcon fontSize="large" style={{ height: "2rem", width: "2rem" }} /> :
                                <PlayArrowIcon fontSize="large" style={{ height: "2rem", width: "2rem" }} />
                        )
                }
            </ListItemAvatar>
            <ListItemText
                style={{ width: "inherit", marginLeft: "0.8rem", borderLeft: "0.5px solid #00000020", paddingLeft: "1rem" }}
                // primary={props.progressDetails?.file?.name}
                secondary={
                    <React.Fragment>
                        <div style={{ fontWeight: "700", fontSize: "1rem", position: "relative" }}>
                            <span style={{ transform: "translateY(-5px)", position: "absolute" }}>
                                {props.progressDetails.file.name}
                                <span style={{ fontSize: "0.8rem", marginLeft: "0.5rem" }}>
                                    {props.progressDetails.value < 100 ? " is uploading..." : ""}
                                </span>
                            </span>

                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            <LinearProgress style={{ width: "100%", height: "10px", borderRadius: "3px" }} variant="determinate" value={props?.progressDetails?.value} />
                            <p style={{ width: "15%", marginLeft: "10px", fontSize: "16px", fontWeight: "700" }}>{`${props?.progressDetails?.value} %`}</p>
                        </div>
                    </React.Fragment>
                }
            />
            <CancelIcon className='cancelIcon' style={{ top: "-10%" }} onClick={() => props.removeFile(props.progressDetails.file)} />
        </div>
    )
}

export default UploadingComponent;