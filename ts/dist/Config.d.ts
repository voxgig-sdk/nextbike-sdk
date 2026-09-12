import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
            transport: string;
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            live_data: {};
            public: {};
            reservation: {};
            reservation_status: {};
        };
    };
    entity: {
        live_data: {
            fields: ({
                name: string;
                type: string;
                short?: undefined;
                format?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                format?: undefined;
            } | {
                format: string;
                name: string;
                short: string;
                type: string;
            })[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: ({
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                example?: undefined;
                            } | {
                                example: number;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        public: {
            fields: never[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: ({
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                example?: undefined;
                            } | {
                                example: number;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        reservation: {
            fields: ({
                name: string;
                op: {
                    create: {
                        req: boolean;
                        type: string;
                    };
                };
                short: string;
                type: string;
                format?: undefined;
                req?: undefined;
            } | {
                format: string;
                name: string;
                short: string;
                type: string;
                op?: undefined;
                req?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                op?: undefined;
                format?: undefined;
                req?: undefined;
            } | {
                name: string;
                req: boolean;
                short: string;
                type: string;
                op?: undefined;
                format?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            $action: string;
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        reservation_status: {
            fields: ({
                name: string;
                short: string;
                type: string;
                format?: undefined;
            } | {
                format: string;
                name: string;
                short: string;
                type: string;
            })[];
            name: string;
            op: {
                load: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };
