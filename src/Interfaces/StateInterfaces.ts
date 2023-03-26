export interface IFile {
	file: any;
};

export interface IActiveFile {
	file: any;
	url: string;
};
export interface IProgress {
	value: number;
	file: any;
};
export interface ISTATE {
	progress: IProgress[];
	activeList: IActiveFile[];
	selectFile: IActiveFile;
	uploadFile: IFile;
};