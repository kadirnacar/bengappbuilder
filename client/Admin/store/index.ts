import { ApplicationState as SharedState,reducers as SharedReducer } from '../../Shared/store';


export interface ApplicationState extends SharedState {
 
}

export const reducers = {
    ...SharedReducer
};
