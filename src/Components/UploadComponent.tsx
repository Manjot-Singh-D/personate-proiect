import React, { useState } from 'react';
// import './UploadComponent.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";


interface IPROPS {
    updateProgress: any;
    removeFile: any;
    addNewFile: any;
    progress: any;
    abortProgress: any;
};


const UploadComponent: React.FC<IPROPS> = (props: any) => {
    const [selectedFile, setSelectedFile] = useState();

    const target = { Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`, Key: selectedFile ? selectedFile["name"] : "", Body: selectedFile };
    const region = `${process.env.REACT_APP_REGION}`;
    const creds = { accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`, secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}` };

    const handleFileInput = (e: any): void => {
        const name = e?.target?.files[0]?.name?.slice(-4);
        if (name === ".mp4") {
            setSelectedFile(e.target.files[0]);
        }
        else {
            alert("Only .mp4 files Allowed!!!");
        }

    }

    const uploadFile = () => {
        if (selectedFile) {
            const parallelUploads3 = new Upload({
                client: new S3Client({ region: region, credentials: creds }),
                leavePartsOnError: false,
                params: target,
            })
            props.addNewFile(selectedFile, parallelUploads3).then(() => {
                try {
                    parallelUploads3.on("httpUploadProgress", (prog) => {
                        if (prog && prog?.total && prog?.loaded) {
                            const perc = Math.round((prog.loaded / prog.total) * 100);

                            props.updateProgress(prog.Key, perc);
                        }
                    });
                    parallelUploads3.done();
                }
                catch (e) {
                    console.log(e);
                }
            });
        }
    }
    return (
        <div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={uploadFile}> Upload to S3</button>
        </div>
    );
}

export default UploadComponent;