import * as React from 'react';
import Components from './Components';
export class Container extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    render() {
        const style: React.CSSProperties = {
            width: '100%',
            height: '100%',
            position: "relative"
        }
        const { data } = this.props;
        const Tag = Components[data];
        return <div style={style}>
            {
                data.map((item, index) => {
                    const Tag = Components[Object.keys(item)[0]];
                    const { children, ...props } = item[Object.keys(item)[0]];
                    return <Tag key={index} {...props}>{children}</Tag>;
                })
            }
        </div>;
    }

}

export default Container;