import React from 'react'

interface IPROPS {
    removeFile: any;
    progressDetails: any;
    selectCurrentFile: any;
};

const UploadingComponent: React.FC<IPROPS> = (props: any) => {
    return (
        <div>
            <div onClick={() => props.progressDetails.value === 100 && props.selectCurrentFile(props.progressDetails.file)}>{props.progressDetails?.file?.name} : {props.progressDetails?.value}%</div>
            <div onClick={() => props.removeFile(props.progressDetails.file)}>❌</div>
        </div >
    )
}

export default UploadingComponent;