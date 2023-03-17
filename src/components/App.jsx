import List from './List/List';
import SelectedCosmetic from './SelectCosmetic/SelectCosmetic';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<List/>} />
      <Route path="/:id" element={<SelectedCosmetic />} />
    </Routes>
  );
}

export default App;
