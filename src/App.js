import './input.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ExpenseTable from './pages/ExpenseTable';
import UserProvider from "./UserContext";
import IncomeTable from './pages/IncomeTable';
import Logout from './pages/Logout';
import Settings from './pages/Settings';
import GoalAndSubs from './pages/GoalAndSubs';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <UserProvider>
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/signup" Component={Signup}></Route>
            <Route path="/main/dashboard" Component={Dashboard}></Route>
            <Route path="/main/expenses" Component={ExpenseTable}></Route>
            <Route path="/main/incomes" Component={IncomeTable}></Route>
            <Route path="/main/settings" Component={Settings}></Route>
            <Route path="/main/goalsandsubs" Component={GoalAndSubs}></Route>
            <Route path="/logout" Component={Logout}></Route>
          </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>


  );
}

export default App;
