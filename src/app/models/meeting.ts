export class Meeting {
    id?: number = null;
    mail?: string = 'default@default.def';
    start_hour?: Date = new Date();
    end_hour?: Date = new Date();
    title?: string = 'Example';
    description?: string = "Description";
    color?: string = "red";

    constructor() {
    }
}
