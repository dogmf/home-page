import "./App.css";
import MyPhoto from "./MyPhoto/MyPhoto";
import CLASSES from "./App.module.css";

function App() {
  return (
    <div className={CLASSES.card}>
      <MyPhoto />
      <div className={CLASSES.cardText}>
        <p>
          Hi, i am <b>dogmf</b>!
        </p>
      </div>
    </div>
  );
}

export default App;
