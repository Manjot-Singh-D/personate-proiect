import React, { useState, useCallback } from 'react';
// import './UploadComponent.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import Dropzone from 'react-dropzone'

interface IPROPS {
    updateProgress: any;
    removeFile: any;
    addNewFile: any;
    progress: any;
    abortProgress: any;
};


const UploadComponent: React.FC<IPROPS> = (props: any) => {

    const handleFileInput = (acceptedFiles: any): void => {
        acceptedFiles && acceptedFiles.length > 0 && acceptedFiles.map((selectedFile: any) => {
            // console.log(selectedFile);

            if (selectedFile && selectedFile.type === "video/mp4") {
                const target = { Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`, Key: selectedFile ? selectedFile["name"] : "", Body: selectedFile };
                const region = `${process.env.REACT_APP_REGION}`;
                const creds = { accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`, secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}` };
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
            else {
                if (selectedFile)
                    alert(`${selectedFile.name} is Invalid File!!`);
            }
        })

    }
    return (
        <div className="uploadComponent">
            <Dropzone onDrop={acceptedFiles => handleFileInput(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section style={{ width: "100%", height: "100%" }}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div style={{ width: "100%", height: "100%" }}>
                                <h1 style={{ textAlign: "center" }}>You can Upload Video</h1>
                                <h3 style={{ textAlign: "center" }}>Click on the button or Drag/Drop File</h3>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
            {/* <input type="file" onChange={handleFileInput} /> */}
            {/* <button onClick={uploadFile}> Upload to S3</button> */}
        </div>
    );
}

export default UploadComponent;