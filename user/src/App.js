import './App.css';
import Form from './Component/Form';
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <>
      <PrimeReactProvider>
        <Form />
      </PrimeReactProvider>
    </>
  );
}

export default App;
