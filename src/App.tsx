import React, { useState } from 'react';
import './App.css';
import FileUploadWrapper from './Components/FileUploadWrapper';
import VideoViewer from './Components/VideoViewer';
import { ISTATE } from "./Interfaces/StateInterfaces";
import BackgroundParticles from './Components/BackgroundParticles';



const App: React.FC = () => {
	const [state, setState] = useState<ISTATE>({
		progress: [],
		activeList: [],
		selectFile: { file: "", url: "" },
		uploadFile: { file: "" },
		uploadComponent: []
	});

	const updateProgress = (file: string, current_progress: number): void => {
		if (current_progress < 100) {
			setState((state) => {
				const newItems = { ...state };
				const newProgress = [...newItems.progress];
				const index = newProgress.findIndex(item => item.file.name === file);
				const newFile = newProgress[index].file;

				newProgress.map((prog, idx) => {
					if (prog.value < 100 && prog.file === newFile) {
						newProgress[idx].value = current_progress;
					}
					return prog;
				})
				newItems["progress"] = newProgress;

				return newItems;
			})
		}
		else if (current_progress === 100) {
			const url = `${process.env.REACT_APP_OBJECT_URL}${file}`;
			setState((state) => {
				const newItems = { ...state };
				const newProgress = [...newItems.progress];
				let newActiveFile = [...newItems.activeList];
				const index = newProgress.findIndex(item => item.file.name === file);

				const newFile = { file: newProgress[index]?.file, url: url };
				newProgress[index] = { ...newProgress[index], value: current_progress };
				newActiveFile = [...newActiveFile, newFile];
				newItems["progress"] = newProgress;
				newItems["activeList"] = newActiveFile;
				if (newItems["selectFile"] && newItems["selectFile"].url === "") {
					newItems["selectFile"] = newFile;
				}

				return newItems;
			})
		}
	}


	const selectCurrentFile = (file: any) => {
		setState((state) => {
			const newItems = { ...state };
			const newSelect = [...state.activeList];
			const index = newSelect.findIndex(item => item.file === file);

			try {
				newItems["selectFile"] = newSelect[index];
			}
			catch (err) {
				console.log(err);
			}
			return newItems;
		})
	}


	const removeFile = (file: any): void => {
		setState((state) => {
			let newState = { ...state };
			let newProgress = [...state.progress];
			let newActiveList = [...state.activeList];
			let newSelectFile = { ...state.selectFile };
			let newUploadFile = { ...state.uploadFile };

			newProgress = newProgress.filter((prog) => {
				return prog.file !== file;
			})
			newActiveList = newActiveList.filter((prog) => {
				return prog.file !== file;
			})
			if (newSelectFile.file === file) {
				newSelectFile = { file: "", url: "" };
			}
			if (newUploadFile.file === file) {
				newUploadFile = { file: "" };
			}
			state.uploadComponent.length > 0 && state.uploadComponent.map((uc: any) => {
				if (uc.params.Body === file) {
					uc.abort();
					return;
				}
				return uc;
			})
			state.uploadComponent = state.uploadComponent.filter((uc: any) => {
				return (uc.params.Body !== file);
			})

			newState["progress"] = newProgress;
			newState["activeList"] = newActiveList;
			newState["selectFile"] = newSelectFile;
			newState["uploadFile"] = newUploadFile;
			newState["uploadComponent"] = state.uploadComponent;

			return newState;
		})
	}



	const removeShowingSelectedFile = () => {
		setState({ ...state, ["selectFile"]: { file: "", url: "" } });
	}



	const addNewFile = (file: any, uploadComponent: any) => {
		return new Promise((resolve, reject) => {
			let newProgress: any = [];
			const name = file?.name?.slice(-4);
			if (name === ".mp4") {
				newProgress = [...newProgress, { value: 0, file: file }]
			}

			const index = state.progress.findIndex((item) => {
				return item.file.name === file.name && item.file.size === file.size;
			});
			if (index === -1) {

				state.progress = [...state.progress, ...newProgress];
				state.uploadComponent = [...state.uploadComponent, uploadComponent];
				setState({ ...state, ["progress"]: state.progress, ["uploadComponent"]: state.uploadComponent });
			}
			else {
				alert("Already Available");
			}
			resolve("DONE!!");
		});
	}

	return (
		<div className='app'>
			<BackgroundParticles />
			{
				state?.selectFile?.file !== "" && <VideoViewer
					currentSelectedFile={state.selectFile}
					removeShowingSelectedFile={removeShowingSelectedFile} />
			}

			<FileUploadWrapper
				progress={state.progress}
				selectFile={state.selectFile}
				activeList={state.activeList}
				selectCurrentFile={selectCurrentFile}
				updateProgress={updateProgress}
				removeFile={removeFile}
				addNewFile={addNewFile}
				removeShowingSelectedFile={removeShowingSelectedFile} />
		</div>
	);
}

export default App;
