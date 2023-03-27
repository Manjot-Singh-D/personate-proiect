import React from 'react'
import "../App.css"
import CancelIcon from '@mui/icons-material/Cancel';

interface IPROPS {
  currentSelectedFile: any;
  removeShowingSelectedFile: any;
};

const VideoViewer: React.FC<IPROPS> = (props) => {
  return (
    <div className='videoWrapper' style={{ position: "relative" }}>
      {
        props.currentSelectedFile && props.currentSelectedFile.url !== "" &&
        <video style={{ width: "450px", height: "auto", margin: "1rem" }} controls key={props.currentSelectedFile.file.name} >
          <source src={props.currentSelectedFile.url} type="video/mp4" />
        </video>
      }
      {props.currentSelectedFile && props.currentSelectedFile.url !== "" &&
        <CancelIcon
          className='cancelIcon'
          style={{ color: "#ffffff" }}
          onClick={() => props.removeShowingSelectedFile(props.currentSelectedFile)} />}
    </div>
  )
}

export default VideoViewer