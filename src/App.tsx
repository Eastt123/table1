import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Loading from './components/Loading/Loading';
import { columns } from './persons/columns';
import PerosnsDataTable from './persons/DataTable';
import { fetchPersons, getPersons, PersonsState } from './store/features/personsSlice';
import { AppDispatch } from './store/store';
import { ToastContainer } from 'react-toastify';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import UserDetails from './pages/UserDetails';
import.meta.env.BASE_URL
function App() {
  const {persons, isLoading} = useSelector<PersonsState>(getPersons) as PersonsState;
  const dispatch = useDispatch<AppDispatch>();
  console.log();
  
  useEffect(()=>{
    dispatch(fetchPersons());
  },[dispatch]);  
  return (
    <div className='overflow-hidden' >
      <div className='container py-10 mx-auto'>
          <Router>
            <Routes>
              <Route path='/'  element= { isLoading ? <Loading /> : <PerosnsDataTable  columns={columns} data={persons} />} />
              <Route path='/:id' element={<UserDetails />} />
            </Routes>
          </Router>
          
            
         <ToastContainer />
         </div>
    </div>
  )
}

export default App
