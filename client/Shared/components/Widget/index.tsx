import * as React from 'react';
import * as classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import { Card, CardBody, CardFooter } from 'reactstrap';

class Widget extends React.Component<any, any> {
    public static defaultProps: Partial<any> = {
        header: '$1,999.50',
        mainText: 'Income',
        icon: "fa fa-cogs",
        color: 'primary',
        variant: "1",
        link: ""
    };
    render() {
        const { className, cssModule, header, mainText, icon, color, img, footer, link, children, variant, ...attributes } = this.props;

        // demo purposes only
        const padding = (variant === '0' ? { card: "p-3", icon: "p-3", lead: "mt-2" } : (variant === "1" ? {
            card: "p-0", icon: "p-4", lead: "pt-3"
        } : { card: "p-0", icon: "p-4 px-5", lead: "pt-3" }));

        const card = { style: "clearfix", color: color, icon: icon, img: img, classes: "" };
        card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

        const lead = { style: "h5 mb-0", color: color, classes: "" };
        lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

        const blockIcon = function (icon) {
            const classes = classNames(icon, 'bg-' + card.color, padding.icon, "font-2xl mr-3 float-left");
            return (<i className={classes}></i>);
        };

        const blockImage = function (img) {
            const classes = classNames('bg-' + card.color, "font-2xl mr-3 float-left");
            return (<img style={{ padding: "5px", height: 60, width: 60 }} src={img} className={classes} />);
        };

        const cardFooter = function () {
            if (footer) {
                return (
                    <CardFooter className="px-3 py-2">
                        <a className="font-weight-bold font-xs btn-block text-muted" href={link}>View More
                      <i className="fa fa-angle-right float-right font-lg"></i></a>
                    </CardFooter>
                );
            }
        };

        return (
            <Card onClick={this.props.onClick ? this.props.onClick.bind(this) : null} style={{cursor:"pointer"}}>
                <CardBody className={card.classes} {...attributes}>
                    {blockImage(card.img)}
                    <div className={lead.classes}>{header}</div>
                    <div className="text-muted text-uppercase font-weight-bold font-xs">{mainText}</div>
                </CardBody>
                {cardFooter()}
            </Card>
        )
    }
}

export default Widget;