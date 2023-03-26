import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import FileUploadWrapper from './Components/FileUploadWrapper';
import UploadComponent from './Components/UploadComponent';
import { ISTATE } from "./Interfaces/StateInterfaces";



const App: React.FC = () => {
	const [state, setState] = useState<ISTATE>({
		progress: [],
		activeList: [],
		selectFile: { file: "", url: "" },
		uploadFile: { file: "" },
	});

	const updateProgress = (file: string, current_progress: number): void => {
		setState((state) => {
			const newItems = { ...state };
			const newProgress = [...newItems.progress];
			const index = newProgress.findIndex(item => item.file.name === file);

			newProgress[index] = { ...newProgress[index], value: current_progress };
			newItems["progress"] = newProgress;

			return newItems;
		})
	}
	const addToActiveFile = (file: any, url: string): void => {
		const newActiveFile = { file: file, url: url };
		setState({ ...state, ["activeList"]: [...state["activeList"], newActiveFile] });
	}
	const setUploadFile = (file: any): void => {
		setState({ ...state, ["uploadFile"]: { file: file } });
	}
	const removeFile = (file: any): void => {
		// Remove File From Progress
		const newProgress = state.progress.filter((prog) => {
			return prog.file !== file;
		});
		setState({ ...state, ["progress"]: newProgress });

		// Remove File from uploadList
		if (state.uploadFile === file) {
			setState({ ...state, ["uploadFile"]: { file: "" } });
		}

		// Remove File from SelectFile
		if (state.selectFile === file) {
			setState({ ...state, ["selectFile"]: { file: "", url: "" } });
		}

		// Remove File from activeList
		const newActiveList = state.activeList.filter((active) => {
			return active.file !== file;
		})
		setState({ ...state, ["activeList"]: newActiveList });
	}
	// const addNewFile = async (file: any) => {
	// 	const newFile = { value: 0, file: file }

	// 	await console.log("BEFORE CONVERTING : ", state.progress.length);
	// 	await setState({ ...state, ["progress"]: [...state.progress, newFile] });
	// 	await console.log("AFTER CONVERTING : ", state.progress.length);
	// 	await setState({ ...state, ["uploadFile"]: file });
	// }

	// const addFile=(file:any)=>{
	// 	return new Promise((resolve,reject)=>{
	// 		setState({...});
	// 	});
	// }

	const addNewFile = (file: any) => {
		return new Promise((resolve, reject) => {
			state.progress = [...state.progress, { value: 0, file: file }];
			setState({ ...state, ["progress"]: state.progress });

			resolve("DONE!!");
		});
	}

	return (
		<div className='app'>
			<FileUploadWrapper progress={state.progress} updateProgress={updateProgress} addToActiveFile={addToActiveFile} setUploadFile={setUploadFile} removeFile={removeFile} addNewFile={addNewFile} />
		</div>
	);
}

export default App;
