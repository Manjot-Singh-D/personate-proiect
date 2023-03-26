import React from 'react'

interface IPROPS {
    removeFile: any;
    progressDetails: any;
};

const UploadingComponent: React.FC<IPROPS> = (props: any) => {
    return (
        <div>{props.progressDetails?.file?.name} : {props.progressDetails?.value}%</div>
    )
}

export default UploadingComponent