import React, { useState } from 'react';
// import './UploadComponent.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

const UploadComponent: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [progress, setProgress] = useState(0);
    const handleFileInput = (e: any): void => {
        setSelectedFile(e.target.files[0]);
    }
    const uploadFile = (): void => {
        if (selectedFile) {
            const target = { Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`, Key: selectedFile["name"], Body: selectedFile };
            const region = `${process.env.REACT_APP_REGION}`;
            const creds = { accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`, secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}` };
            try {
                const parallelUploads3 = new Upload({
                    client: new S3Client({ region: region, credentials: creds }),
                    leavePartsOnError: false,
                    params: target,
                })

                parallelUploads3.on("httpUploadProgress", (prog) => {
                    if (prog && prog?.total && prog?.loaded) {
                        const perc = Math.round((prog.loaded / prog.total) * 100);
                        if (perc === 100) {
                            console.log("COMPLETED !!!");
                        }
                        setProgress(perc);
                    }
                });
                parallelUploads3.done();
            } catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <div>
            <div>File Upload Progress is {progress}%</div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={uploadFile}> Upload to S3</button>
        </div>
    );
}

export default UploadComponent;