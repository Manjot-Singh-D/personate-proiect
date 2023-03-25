import React, { useState } from 'react';
// import './UploadComponent.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

const UploadComponent: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [progress, setProgress] = useState(0);
    const [showVideo, setShowVideo] = useState<string>();
    const handleFileInput = (e: any): void => {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0]);
        setProgress(0);
    }
    const uploadFile = (): void => {
        if (selectedFile) {
            console.log(process.env)
            const target = { Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`, Key: selectedFile["name"], Body: selectedFile };
            const region = `${process.env.REACT_APP_REGION}`;
            const creds = { accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`, secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}` };
            try {
                const parallelUploads3 = new Upload({
                    client: new S3Client({ region: region, credentials: creds }),
                    leavePartsOnError: false,
                    params: target,
                })
                console.log(parallelUploads3);
                parallelUploads3.on("httpUploadProgress", (prog) => {
                    console.log(prog);
                    console.log(selectedFile)
                    if (prog && prog?.total && prog?.loaded) {
                        const perc = Math.round((prog.loaded / prog.total) * 100);
                        if (perc === 100) {

                            const url = `${process.env.REACT_APP_OBJECT_URL}${selectedFile["name"]}`
                            setShowVideo(url);
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
            {showVideo &&
                <video width="450" height="300" controls key={showVideo} >
                    <source src={showVideo} type="video/mp4" />
                </video>}
            <div>File Upload Progress is {progress}%</div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={uploadFile}> Upload to S3</button>
        </div>
    );
}

export default UploadComponent;