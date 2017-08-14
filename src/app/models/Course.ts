export interface Course {
    creditHours: number;
    identifier: {
        domain: string;
        full: string;
        number: string;
    };
    longDescription: string;
    name: string;
    prerequisites: Array<Prerequisite>;
    shortDescription: string;
}

export interface Prerequisite {
    canTakeConcurrently: boolean;
    identifier: string;
}