import { Action, Reducer, ActionCreator } from 'redux';
import { fetch, addTask } from 'domain-task';
import { IAuthStore } from '../../Shared/models';
import config from '../../Shared/config';
import { sessionService } from 'redux-react-session';
import { push, replace } from 'react-router-redux';
import * as CryptoJS from 'crypto-js';


export const actionCreators = {
    login: (email, password) => (dispatch, getState) => {
        let fetchTask = fetch(`${config.restUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '123456'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data.data) {
                    var token = data.token;

                    var bytes = CryptoJS.AES.decrypt(data.data.toString(), token);
                    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                    return sessionService.saveSession(token)
                        .then(() => {
                            return sessionService.saveUser(decryptedData).then(() => {
                                return "success";
                            })
                                .catch(err => {
                                    console.error(err);
                                    return err;
                                });
                        })
                        .catch(err => {
                            console.error(err);
                            return err;
                        });
                } else if (data.errors) {
                    console.log(data.errors[0]);
                    return data.errors;
                }
            });
        addTask(fetchTask);
        return fetchTask;
    },
    logout: () => (dispatch, getState) => {
        sessionService.deleteSession();
        sessionService.deleteUser();
    },
    checkemail: (name) => (dispatch, getState) => {
        let fetchTask = fetch(`${config.restUrl}/api/users/checkemail`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '123456'
            },
            body: JSON.stringify({
                EMAIL: name
            })
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data.data) {
                    return data;
                } else if (data.errors) {
                    console.log(data.errors[0]);
                    return data.errors;
                }
            });
        addTask(fetchTask);
        return fetchTask;
    },
    sendForgetEmail: (data) => (dispatch, getState) => {
        let fetchTask = fetch(`${config.restUrl}/api/users/forgetemail`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '123456'
            },
            body: JSON.stringify({ email: data })
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data.data) {
                    return data.data;
                } else if (data.errors) {
                    console.log(data.errors[0]);
                    return data.errors;
                }
            });
        addTask(fetchTask);
        return fetchTask;
    },
    registerNewUser: (data) => (dispatch, getState) => {
        let fetchTask = fetch(`${config.restUrl}/api/users/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '123456'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data.data) {
                    return data.data;
                } else if (data.errors) {
                    console.log(data.errors[0]);
                    return data.errors;
                }
            });
        addTask(fetchTask);
        return fetchTask;
    },
    sendReActivation: (email) => (dispatch, getState) => {
        let fetchTask = fetch(`${config.restUrl}/api/users/activatemail`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '123456'
            },
            body: JSON.stringify({ EMAIL: email })
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data.data) {
                    return data;
                } else if (data.errors) {
                    console.log(data.errors[0]);
                    return data.errors;
                }
            });
        addTask(fetchTask);
        return fetchTask;
    },
    Activate: (uid) => (dispatch, getState) => {
        let fetchTask = fetch(`${config.restUrl}/api/users/activate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '123456'
            },
            body: JSON.stringify({ UID: uid })
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data.data) {
                    return data;
                } else if (data.errors) {
                    console.log(data.errors[0]);
                    return data.errors;
                }
            });
        addTask(fetchTask);
        return fetchTask;
    },
    saveNewPassword: (password, uid) => (dispatch, getState) => {
        let fetchTask = fetch(`${config.restUrl}/api/users/newpassword`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'key': '123456'
            },
            body: JSON.stringify({ password: password, UID: uid })
        })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                if (data.data) {
                    return data.data;
                } else if (data.errors) {
                    console.log(data.errors[0]);
                    return data.errors;
                }
            });
        addTask(fetchTask);
        return fetchTask;
    }

};