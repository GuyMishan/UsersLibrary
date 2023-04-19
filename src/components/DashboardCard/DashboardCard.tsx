import './DashboardCard.css';
import { Row, Card, CardBody, Col, Button } from 'reactstrap';

const DashboardCard = (props: any) => {
    return (
        <Row className="user-card-row">
            <Card className="user-card">
                <CardBody>
                    <Row className="user-card-body-row">
                        <Col xs={12} md={3} lg={3} className="user-card-col">
                            {props.user.picture ? (
                                <img
                                    src={props.user.picture.medium}
                                    alt="profilepic"
                                    className="user-card-profile-pic"
                                />
                            ) : null}
                            <h6 style={{ margin: '0px' }}>
                                {props.user.name.title} {props.user.name.first} {props.user.name.last}
                            </h6>
                        </Col>
                        <Col xs={12} md={3} lg={3} className="user-card-col user-card-email">
                            {props.user.email}
                        </Col>
                        <Col xs={12} md={2} lg={2} className="user-card-col user-card-location">
                            {props.user.location ? (
                                <>
                                    {props.user.location.country}
                                    <br />
                                    {props.user.location.city}
                                    <br />
                                    {props.user.location.street.name}
                                </>
                            ) : null}
                        </Col>
                        <Col xs={12} md={2} lg={2} className="user-card-col user-card-login">
                            {props.user.login ? props.user.login.uuid : null}
                        </Col>
                        <Col xs={12} md={2} lg={2} className="user-card-col user-card-edit-delete-col">
                            <Button
                                style={{ marginRight: '10px' }}
                                color="primary"
                                value={props.user.login.uuid}
                                onClick={props.Toggle}
                            >
                                edit
                            </Button>
                            <Button
                                color="danger"
                                value={props.user.login.uuid}
                                onClick={props.ToggleDelete}
                            >
                                delete
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Row>
    );
};

export default DashboardCard;
