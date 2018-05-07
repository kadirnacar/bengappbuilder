export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => any): void;
}