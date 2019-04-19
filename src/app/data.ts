export class Log {
	_id?:string;
    bodyTemperature: number;
	heartRate: number;
	bloodPressure: string;
	respiratoryRate: number;
	createdBy: string;
	createdFor: string;
}

export class Alert {
	_id?:string;
	alertString:string;
	createdBy: string;
}

export class Tip {
	_id?:string;
	dailyTips: string;
	createdBy: string;
	createdFor: string;
}

export class VideoUrl {
	_id?:string;
	url:string;
	title:string;
	createdBy: string;
}