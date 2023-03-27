import React from 'react';
import '../App.css';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import Dropzone from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface IPROPS {
    updateProgress: any;
    removeFile: any;
    addNewFile: any;
    progress: any;
    abortProgress: any;
};


const UploadComponent: React.FC<IPROPS> = (props: any) => {
    const handleChangeInput = (fileList: any) => {
        let acceptedFiles: any = [];
        for (let i = 0; i < fileList.length; i++) {
            acceptedFiles = [...acceptedFiles, fileList[i]];
        }
        handleFileInput(acceptedFiles);
    }
    const handleFileInput = (acceptedFiles: any): void => {
        let count = 0;
        acceptedFiles && acceptedFiles.length > 0 && acceptedFiles.map((selectedFile: any) => {
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
                    count++;
            }
            return selectedFile;
        })
        if (count !== 0)
            alert(`${count} out of ${acceptedFiles.length} files are not .mp4`)
    }
    return (
        <div className="uploadComponent">
            <Dropzone onDrop={acceptedFiles => handleFileInput(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section className='dropContainer'>
                        <div className='dropSection' {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className='dropSection'>
                                <h1 style={{ textAlign: "center" }}>You can Upload Single/Multiple .mp4 Videos</h1>
                                <p style={{ textAlign: "center", textTransform: "uppercase" }}>Click on the button or Drag & Drop Files here</p>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
            {/* <input type="file" /> */}
            <input type="file"
                multiple
                onChange={(e) => handleChangeInput(e.target.files)}
                name="uploadfile"
                id="uploadInput"
                style={{ display: "none" }} />
            <label className='uploadBtn' htmlFor='uploadInput'>
                <span>
                    <FileUploadIcon style={{ color: "#ffffff", paddingRight: "1rem", display: "flex" }} />
                </span>
                <span style={{ borderLeft: "1px solid #ffffff", paddingLeft: "1rem", color: "#fff" }}>Upload Video</span></label>
        </div >
    );
}

export default UploadComponent;