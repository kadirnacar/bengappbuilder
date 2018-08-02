import * as React from 'react';
import Components from './Components';

export class Container extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate() {
        return false;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(nextState);
    }
    render() {
        const style: React.CSSProperties = {
            width: '100%',
            height: '100%',
            position: "relative"
        }
        const { schema } = this.props;

        return schema.map((item, index) => {
            const Tag = Components(Object.keys(item)[0]);
            if (!Tag)
                return null;
            const { children, ...props } = item[Object.keys(item)[0]];
            Object.keys(props).forEach((itm) => {
                if (typeof props[itm] == "object" && Object.keys(props[itm]).indexOf("function") > -1) {
                    props[itm] = eval(props[itm]["function"]);
                }
            });
            return <Tag key={index} {...props}>{
                children ?
                    (children instanceof Array ? <Container schema={children} /> : children)
                    : null}</Tag>;
        })
    }

}

export default Container;