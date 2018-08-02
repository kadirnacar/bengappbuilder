import * as React from 'react';
import { BaseProps, BaseComponent } from '../Base';
import Container from '../Container';
var json = require('./test.json');

export interface PageProps extends BaseProps {
    container?: 'none' | 'fluid';
}

class Page extends BaseComponent<PageProps>{
    constructor(props) {
        super(props);
    }

    static defaultProps: Partial<PageProps> = {
        container: 'none',
    }
    shouldComponentUpdate(){
        return false;
    }
    render() {
        const { container, className, style, onClick, onDidMount, onUnMount, onWillMount, ...others } = this.props;
        console.log("page")
        const classname = "container" + (container == 'none' ? ' ' : '-fluid ') + (className ? className : '');
        return <div className={classname}
            style={style}
            onClick={onClick ? onClick.bind(this) : null} {...others}>
            <Container schema={json.data} />
        </div>;
    }
}

export default Page;