import React from 'react'
import UploadComponent from './UploadComponent';
import UploadingComponent from './Util_Components/UploadingComponent';

interface IPROPS {
	updateProgress: any;
	removeFile: any;
	addNewFile: any;
	progress: any;
	selectCurrentFile: any;
};

const FileUploadWrapper: React.FC<IPROPS> = (props: any) => {
	return (
		<>
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
					/>
				);
			})}
		</>
	)
}

export default FileUploadWrapper;