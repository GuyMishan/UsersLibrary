import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../src/app/hooks'
import { getUsersDataFunc } from './redux/features/usersSlice';
import { Button, Container } from 'reactstrap';
import DashboardCard from '../src/components/DashboardCard/DashboardCard'
import UserForm from '../src/components/UserForm/UserForm'
import DeleteForm from './components/DeleteForm/DeleteForm';

function App() {
  const reduxusers = useAppSelector(state => state.users.value)
  const dispatch = useAppDispatch()
  //user form modal
  const [isuserformopen, setIsuserformopen] = useState(false);
  const [useridformodal, setUseridformodal] = useState(undefined);
  //delete form modal
  const [isdeleteformopen, setIsdeleteformopen] = useState(false);
  const [useridfordeletemodal, setUseridfordeletemodal] = useState(undefined);

  function ToggleDelete(evt: any) {
    setUseridfordeletemodal(evt.currentTarget.value)
    setIsdeleteformopen(!isdeleteformopen);
  }

  function ToggleForDeleteModal(evt: any) {
    setIsdeleteformopen(!isdeleteformopen);
    setUseridfordeletemodal(undefined)
  }

  function Toggle(evt: any) {
    if (evt.currentTarget.value === '') {
      setUseridformodal(undefined)
    }
    else {
      setUseridformodal(evt.currentTarget.value)
    }
    setIsuserformopen(!isuserformopen);
  }

  function ToggleForModal(evt: any) {
    setIsuserformopen(!isuserformopen);
    setUseridformodal(undefined)
  }

  const getUsersRedux = () => {
    dispatch(getUsersDataFunc());
  }

  useEffect(() => {
    getUsersRedux();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <DeleteForm isOpen={isdeleteformopen} userid={useridfordeletemodal} Toggle={ToggleDelete} ToggleForDeleteModal={ToggleForDeleteModal} reduxusers={reduxusers} />
      <UserForm isOpen={isuserformopen} userid={useridformodal} Toggle={Toggle} ToggleForModal={ToggleForModal} reduxusers={reduxusers} />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'10px' }}>
        <Button onClick={Toggle}>Add user</Button>
      </div>

      <Container>
        {reduxusers.map((user, i) => (
          user ?
            <DashboardCard user={user} key={i} Toggle={Toggle} ToggleDelete={ToggleDelete} setUseridformodal={setUseridformodal} />
            : null))}
      </Container>
    </>
  );
}

export default App;
