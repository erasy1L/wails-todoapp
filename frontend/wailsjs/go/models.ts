export namespace task {
	
	export enum Status {
	    todo = "todo",
	    done = "done",
	}
	export enum Priority {
	    low = "low",
	    medium = "medium",
	    high = "high",
	}
	export class Request {
	    title: string;
	    status: Status;
	    priority: Priority;
	    description: string;
	    started_at: string;
	    completed_at: string;
	
	    static createFrom(source: any = {}) {
	        return new Request(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.status = source["status"];
	        this.priority = source["priority"];
	        this.description = source["description"];
	        this.started_at = source["started_at"];
	        this.completed_at = source["completed_at"];
	    }
	}
	export class Task {
	    id: string;
	    title: string;
	    status: Status;
	    priority: Priority;
	    description: string;
	    started_at: string;
	    completed_at: string;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.status = source["status"];
	        this.priority = source["priority"];
	        this.description = source["description"];
	        this.started_at = source["started_at"];
	        this.completed_at = source["completed_at"];
	    }
	}

}

