import React from 'react'

interface IPROPS {
  currentSelectedFile: any;
  removeShowingSelectedFile: any;
};

const VideoViewer: React.FC<IPROPS> = (props) => {
  return (
    <div>
      {
        props.currentSelectedFile.url !== "" &&
        <video width="450" height="300" controls key={props.currentSelectedFile.file.name} >
          <source src={props.currentSelectedFile.url} type="video/mp4" />
        </video>
      }
      {
        props.currentSelectedFile.url !== "" &&
        <p onClick={() => props.removeShowingSelectedFile(props.currentSelectedFile)}>❌</p>}
    </div>
  )
}

export default VideoViewer