import { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
    Modal,
    ModalBody,
    Input
} from "reactstrap";
import { toast } from "react-toastify";
import { useAppDispatch } from '../../app/hooks'
import { updateUsersDataFunc } from '../../redux/features/usersSlice';
import { generate } from 'shortid'

const UserForm = (props: any) => {
    const dispatch = useAppDispatch();

    const [user, setUser] = useState({
        name: { first: '', last: '', title: '' },
        location: { country: '', city: '', street: { number: 0, name: '' } },
        email: '',
        login: { uuid: '' },
    })

    function handleChange_namefirst(evt: any) {
        const value = evt.target.value;
        let tempname = { ...user.name };
        tempname.first = value;
        setUser({ ...user, name: tempname });
    }

    function handleChange_namelast(evt: any) {
        const value = evt.target.value;
        let tempname = { ...user.name };
        tempname.last = value;
        setUser({ ...user, name: tempname });
    }

    function handleChange_nametitle(evt: any) {
        const value = evt.target.value;
        let tempname = { ...user.name };
        tempname.title = value;
        setUser({ ...user, name: tempname });
    }

    function handleChange_email(evt: any) {
        const value = evt.target.value;
        setUser({ ...user, email: value });
    }

    function handleChange_country(evt: any) {
        const value = evt.target.value;
        let templocation = { ...user.location };
        templocation.country = value;
        setUser({ ...user, location: templocation });
    }

    function handleChange_city(evt: any) {
        const value = evt.target.value;
        let templocation = { ...user.location };
        templocation.city = value;
        setUser({ ...user, location: templocation });
    }

    function handleChange_street(evt: any) {
        const value = evt.target.value;
        let templocation = { ...user.location };
        templocation.street.name = value;
        setUser({ ...user, location: templocation });
    }

    function Submit(evt: any) {
        CheckFormData()
    }

    const CheckFormData = () => {
        var flag = true;
        var ErrorReason = "";

        if (((user.name.first === undefined) || (user.name.first === ""))) {
            ErrorReason += "Missing field: first name,"
            flag = false;
        }
        if (user.name.first.length < 3) {
            ErrorReason += "first name - min of 3 characters,"
            flag = false;
        }

        if (((user.name.last === undefined) || (user.name.last === ""))) {
            ErrorReason += "Missing field: last name,"
            flag = false;
        }
        if (user.name.last.length < 3) {
            ErrorReason += "last name - min of 3 characters,"
            flag = false;
        }

        if (((user.name.title === undefined) || (user.name.title === ""))) {
            ErrorReason += "Missing field: title,"
            flag = false;
        }

        if (((user.email === undefined) || (user.email === ""))) {
            ErrorReason += "Missing field: email,"
            flag = false;
        }

        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (pattern.test(user.email) === false) {
            ErrorReason += "Email is not Valid"
            flag = false;
        }

        for (let i = 0; i < props.reduxusers.length; i++) {
            if (user.email === props.reduxusers[i].email && user.login.uuid !== props.reduxusers[i].login.uuid) {
                ErrorReason += "Email already in use"
                flag = false;
            }
        }

        //need to check unique mail..

        if (flag === true) {
            if (props.userid !== undefined) {
                UpdateUser();
            }
            else {
                CreateUser();
            }
        } else {
            toast.error(ErrorReason);
        }
    }

    async function CreateUser() {
        let tempreduxusers = [...props.reduxusers];
        let tempuser = { ...user };
        tempuser.login.uuid = generate();
        tempreduxusers.push(tempuser);
        dispatch(updateUsersDataFunc(tempreduxusers))
        props.ToggleForModal();
    }

    async function UpdateUser() {
        let tempreduxusers = [...props.reduxusers];
        let tempuser = { ...user };
        for (let i = 0; i < tempreduxusers.length; i++) {
            if (tempuser.login.uuid === tempreduxusers[i].login.uuid) {
                tempreduxusers[i] = { ...tempuser };
            }
        }
        dispatch(updateUsersDataFunc(tempreduxusers))
        props.ToggleForModal();
    }

    function finduserbyid() {
        let temp = props.reduxusers.filter((user: any) => user.login.uuid === props.userid);
        if (temp[0] !== undefined)
            setUser(temp[0]);
        else {
            setUser({
                name: { first: '', last: '', title: '' },
                location: { country: '', city: '', street: { number: 0, name: '' } },
                email: '',
                login: { uuid: '' },
            })
        }
    }

    useEffect(() => {
        finduserbyid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    return (
        <Modal
            style={{ minHeight: '80%', maxHeight: '80%', minWidth: '80%', maxWidth: '80%' }}
            isOpen={props.isOpen}
            centered
            scrollable
            size="xl"
            toggle={props.ToggleForModal}>
            <ModalBody>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4" style={{ textAlign: 'center', fontWeight: "bold" }}></CardTitle>
                    </CardHeader>
                    <CardBody>
                        {user ?
                            <Container>
                                <h6>First name</h6>
                                <Input placeholder="First name" value={user.name.first} onChange={handleChange_namefirst} />
                                <h6>Last name</h6>
                                <Input placeholder="Last name" value={user.name.last} onChange={handleChange_namelast} />
                                <h6>Title</h6>
                                <Input placeholder="Title" value={user.name.title} onChange={handleChange_nametitle} />
                                <h6>Email</h6>
                                <Input placeholder="Email" value={user.email} onChange={handleChange_email} />

                                {props.userid ?
                                    <>
                                        <h6>Country</h6>
                                        <Input placeholder="Country" value={user.location.country} onChange={handleChange_email} disabled />
                                        <h6>City</h6>
                                        <Input placeholder="City" value={user.location.city} onChange={handleChange_email} disabled />
                                        <h6>Street</h6>
                                        <Input placeholder="Street" value={user.location.street.name} onChange={handleChange_email} disabled />
                                    </> :
                                    <>
                                        <h6>Country</h6>
                                        <Input placeholder="Country" value={user.location.country} onChange={handleChange_country} />
                                        <h6>City</h6>
                                        <Input placeholder="City" value={user.location.city} onChange={handleChange_city} />
                                        <h6>Street</h6>
                                        <Input placeholder="Street" value={user.location.street.name} onChange={handleChange_street} />
                                    </>}


                                <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                                    <Button style={{ marginRight: '10px' }} color='primary' onClick={Submit}>Save</Button>
                                    <Button color='danger' onClick={props.ToggleForModal}>Cancel</Button>
                                </div>
                            </Container>
                            : null}
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    );
}
export default UserForm;