export const parseJson = (obj1) => {
    var ret: any = [];
    if (obj1)
        for (var i in obj1) {
            ret.push({ name: i, value: obj1[i] });
        }
    return ret;
}; 