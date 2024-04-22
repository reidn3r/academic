
export const ParamsIsNull = (params:Array<string | null>):boolean => {
    return params.every(param => param == "" || param == null);
}