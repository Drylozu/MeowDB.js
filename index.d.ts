interface MeowDBOptions {
    dir: string;
    name: string;
}

interface MeowDBPrivateOptions extends MeowDBOptions {
    file: string;
}

declare class MeowDBError extends Error { }

declare class MeowDBUtils {
    public file: string;

    constructor(file: String);

    public validId(id: String): Boolean;
    public validValue(value: any): Boolean;
    public stringifyData(data: any): String;
    public getAll(): Object;
    public get(id: String): any;
    public set(id: String, data: any, create: Boolean): Object;
}

declare class MeowDB {
    private _options: MeowDBPrivateOptions;
    private _utils: MeowDBUtils;

    constructor(options: MeowDBOptions);

    public all(): Object;
    public create(id: String, initialValue: any): MeowDBError | Object;
    public delete(id: String): MeowDBError | Object;
    public exists(id: String): Boolean;
    public get(id: String): any;
    public set(id: String, value: any): MeowDBError | Object;
}

export = MeowDB;