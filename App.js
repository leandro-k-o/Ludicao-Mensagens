import './App.css';
import Login from './Components/Login/Login';
import { UserStorage } from './AuthUserContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Services/ProtectedRoute';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
    <UserStorage> 
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>}>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </UserStorage>
    </BrowserRouter>        
  );
}

export default App;
