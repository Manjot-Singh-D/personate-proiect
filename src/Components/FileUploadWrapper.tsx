import React from 'react'
import UploadComponent from './UploadComponent';
import UploadingComponent from './Util_Components/UploadingComponent';

interface IPROPS {
	updateProgress: any;
	addToActiveFile: any;
	setUploadFile: any;
	removeFile: any;
	addNewFile: any;
	progress: any
};

const FileUploadWrapper: React.FC<IPROPS> = (props: any) => {
	// console.log("WRAPPER : ", props.progress);
	return (
		<>
			<UploadComponent
				updateProgress={props.updateProgress}
				addToActiveFile={props.addToActiveFile}
				setUploadFile={props.setUploadFile}
				removeFile={props.removeFile}
				addNewFile={props.addNewFile}
				progress={props.progress} />

			{props.progress.map((progDetails: any, idx: number) => {
				return (
					<UploadingComponent
						key={idx}
						progressDetails={progDetails}
						removeFile={props.removeFile}
					/>
				);
			})}
		</>
	)
}

export default FileUploadWrapper;