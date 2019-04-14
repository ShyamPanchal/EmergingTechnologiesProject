export class Log {
    bodyTemperature: number;
	heartRate: number;
	bloodPressure: string;
	respiratoryRate: number;
	createdBy: string;
	createdFor: string;
}

export class Alert {
	alertString:string;
	createdBy: string;
}

export class Tip {
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