import { sessionService } from 'redux-react-session';

export const compareJSON = (obj1, obj2) => {
    var ret: any = {};
    for (var i in obj2) {
        if (!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
            ret[i] = obj2[i];
        }
    }
    return ret;
};

export const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

export const delay = (ms) => new Promise(resolve =>
    setTimeout(resolve, ms)
);

export const fetchReq = async (url, type: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any, params?: any, serialize?: boolean, contentType?: string | boolean, accept?: string | boolean): Promise<any> => {
    const headers = {};
    if (contentType != null) {
        if (contentType != false)
            headers["Content-Type"] = contentType;
    } else {
        headers["Content-Type"] = "application/json";
    }
    if (accept != null) {
        if (accept != false)
            headers["Accept"] = accept;
    } else {
        headers["Accept"] = "application/json";
    }
    return sessionService.loadSession()
        .then(currentSession => {
            headers["Authorization"] = currentSession;

            return fetch(`${url}/${params ? Object.keys(params).map((item) => item + '=' + params[item]).join("&") : ''}`, {
                method: type,
                headers: headers,
                body: body ? (serialize != false ? JSON.stringify(body) : body) : null
            })
                .then(async response => {
                    if (!response.ok) {
                        const err = await response.json();
                        console.error(err);
                        throw err;
                    }
                    return response.json() as Promise<any>
                })
                .then(data => {
                    return data;
                });
        }).catch(err => {
            console.error(err);
            throw err;
        });
}