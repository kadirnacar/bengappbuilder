import * as React from 'react';
import { BaseProps, BaseComponent } from '../Base';
import Container from '../Container';

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

    render() {
        const { container, className, style, onClick, onDidMount, onUnMount, onWillMount, ...others } = this.props;

        const classname = "container" + (container == 'none' ? ' ' : '-fluid ') + (className ? className : '');
        return <div className={classname}
            style={style}
            onClick={onClick ? onClick.bind(this) : null} {...others}>
            <Container data={[{ FormInput: { title: "deneme", style: { height: 200 } } }]} />
        </div>;
    }
}

export default Page;