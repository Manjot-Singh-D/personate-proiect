import React from 'react'
import "../App.css"
import CancelIcon from '@mui/icons-material/Cancel';

interface IPROPS {
  currentSelectedFile: any;
  removeShowingSelectedFile: any;
};

const VideoViewer: React.FC<IPROPS> = (props) => {
  // console.log(props.currentSelectedFile);
  return (
    <div style={{ position: "relative" }}>
      {
        props.currentSelectedFile && props.currentSelectedFile.url !== "" &&
        <video width="450" height="300" style={{ margin: "1rem" }} controls key={props.currentSelectedFile.file.name} >
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