import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
    Modal,
    ModalBody,
} from "reactstrap";
import { useAppDispatch } from '../../app/hooks'
import { updateUsersDataFunc } from '../../redux/features/usersSlice';

const DeleteForm = (props: any) => {
    const dispatch = useAppDispatch();

    async function DeleteUser() {
        let tempreduxusers = [...props.reduxusers];
        for (let i = 0; i < tempreduxusers.length; i++) {
            if (props.userid === tempreduxusers[i].login.uuid) {
                tempreduxusers.splice(i, 1);
                break;
            }
        }
        dispatch(updateUsersDataFunc(tempreduxusers))
        props.ToggleForDeleteModal();
    }

    return (
        <Modal
            style={{ minHeight: '80%', maxHeight: '80%', minWidth: '80%', maxWidth: '80%' }}
            isOpen={props.isOpen}
            centered
            scrollable
            size="xl"
            toggle={props.ToggleForDeleteModal}>
            <ModalBody>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4" style={{ textAlign: 'center', fontWeight: "bold" }}></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Container>
                            <h3>Are you sure you want to delete this user?</h3>
                            <div style={{ paddingTop: '10px', textAlign: 'center' }}>
                                <Button style={{ marginRight: '10px' }} color='primary' onClick={props.ToggleForDeleteModal}>No</Button>
                                <Button color='danger' onClick={DeleteUser}>Yes</Button>
                            </div>
                        </Container>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    );
}
export default DeleteForm;