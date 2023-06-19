import { Route, Routes } from 'react-router-dom';
import Issue from './pages/Issue';
import Nav from './layout/Nav';
import Header from './layout/Header';

function App() {
  //'Code', 'Issues', 'Pull requests', 'Actions', 'Project', 'Wiki', 'Security', 'Insights', 'Setting'
  return (
    <>
      <Nav/>
      <Header/>
      <Routes>
        <Route path='/' element={<Issue />} />
        <Route path='/issue' element={<Issue />} />
      </Routes>
    </>

  );
}
export default App;


