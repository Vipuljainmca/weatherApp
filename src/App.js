import "./App.css";
import SearchCity from "./components/SearchCity";
import ForeCast from "./components/ForeCast";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="outer">
    <div className="main">
      <div>
        <SearchCity/>
      </div>
      <div>
        <ForeCast/>
      </div>
    </div>
    </div>
  );
}

export default App;
