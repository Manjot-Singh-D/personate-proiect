import React from 'react'
import UploadComponent from './UploadComponent';
import UploadingComponent from './UploadingComponent';
import "../App.css"

interface IPROPS {
	updateProgress: any;
	removeFile: any;
	addNewFile: any;
	progress: any;
	selectCurrentFile: any;
	activeList: any;
	selectFile: any
};

const FileUploadWrapper: React.FC<IPROPS> = (props: any) => {
	return (
		<div className="uploadWrapper">
			<UploadComponent
				updateProgress={props.updateProgress}
				removeFile={props.removeFile}
				addNewFile={props.addNewFile}
				progress={props.progress}
				abortProgress={props.abortProgress} />

			{props.progress.map((progDetails: any, idx: number) => {
				return (
					<UploadingComponent
						key={idx}
						progressDetails={progDetails}
						removeFile={props.removeFile}
						selectCurrentFile={props.selectCurrentFile}
						selectFile={props.selectFile}
					/>
				);
			})}
		</div>
	)
}

export default FileUploadWrapper;