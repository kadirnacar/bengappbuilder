import * as React from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import config from '../../config';

class ImageBox extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }
    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }
    removeClick() {
        this.setState({ popoverOpen: false });
        if (this.props.onRemove) {
            const { file, index } = this.props;
            this.props.onRemove.call(this, file, index)
        }
    }
    render() {
        const { file, index } = this.props;
        return (<Col xs={3}>
            <Card>
                <CardBody style={{ height: 100, padding: 10 }} className="text-center">
                    <Button onClick={this.removeClick.bind(this)} id={'Popover-' + file.file.lastModified + file.file.size} outline 
                    className=" float-right" color="danger" size="sm" style={{ position: "absolute", top: 0, right: 0, padding: "0px 3px" }}>
                        <i className="fa fa-trash"></i>
                    </Button>
                    <Popover isOpen={this.state.popoverOpen} placement="bottom" target={'Popover-' + file.file.lastModified + file.file.size} toggle={this.toggle}>
                        <PopoverHeader>Uyarı</PopoverHeader>
                        <PopoverBody>
                            <Row>
                                <Col>
                                    Resim Kaldırılıyor.
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button color="primary" size="sm" onClick={this.removeClick.bind(this)}>Tamam</Button>
                                </Col>
                            </Row>
                        </PopoverBody>
                    </Popover>
                    <img style={{ maxHeight: 80 }} className="img-thumbnail" src={file.imagePreviewUrl} />
                </CardBody>
            </Card>
        </Col>
        )
    }
}

export default ImageBox;
