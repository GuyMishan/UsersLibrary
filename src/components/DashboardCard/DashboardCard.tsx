import { Card, Row, Col, CardBody, Button } from 'reactstrap';

function DashboardCard(props: any) {

    return (
        <Row style={{ paddingTop: '10px' }}>
            <Card style={{ boxShadow: 'rgb(123 123 123 / 5%) 0px 2px 5px 5px' }}>
                <CardBody>
                    <Row>
                        <Col xs={12} md={1} lg={1} style={{ display: 'flex', alignItems: 'center' }}>
                            {props.user.picture ? <img src={props.user.picture.medium} alt='profilepic' style={{ width: '45px' }} /> : null}
                        </Col>
                        <Col xs={12} md={2} lg={2} style={{ display: 'flex', alignItems: 'center' }}>
                            <h6 style={{ margin: '0px' }}>{props.user.name.title} {props.user.name.first} {props.user.name.last}</h6>
                        </Col>
                        <Col xs={12} md={4} lg={3} style={{ display: 'flex', alignItems: 'center', wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {props.user.email}
                        </Col>
                        <Col xs={12} md={2} lg={2} style={{ display: 'flex', alignItems: 'center' }}>
                            {props.user.location ?
                                <>
                                    {props.user.location.country}
                                    <br></br>
                                    {props.user.location.city}
                                    <br></br>
                                    {props.user.location.street.name}
                                </>
                                : null}
                        </Col>
                        <Col xs={12} md={1} lg={2} style={{ display: 'flex', alignItems: 'center' }}>
                            {props.user.login ? props.user.login.uuid : null}
                        </Col>
                        <Col xs={12} md={2} lg={2} style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
                            <Button style={{marginRight:'10px'}} color='primary' value={props.user.login.uuid} onClick={props.Toggle}>edit</Button>
                            <Button color='danger' value={props.user.login.uuid} onClick={props.ToggleDelete}>delete</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Row>
    );
}

export default DashboardCard;
