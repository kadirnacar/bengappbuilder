import * as React from 'react';

export interface BaseProps {
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<any>;
    onDidMount?: (comp?: any) => void;
    onWillMount?: (comp?: any) => void;
    onUnMount?: (comp?: any) => void;
    children?: React.ReactNode;
    key?: string | number;
    ref?: string | ((component) => any);
    [other: string]: any;
}

export abstract class BaseComponent<P extends BaseProps> extends React.Component<P, any>{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.onDidMount)
            this.props.onDidMount.call(this, this);
    }

    componentWillMount() {
        if (this.props.onWillMount)
            this.props.onWillMount.call(this, this);
    }

    componentWillUnmount() {
        if (this.props.onUnMount)
            this.props.onUnMount.call(this, this);
    }
}

export default BaseComponent;