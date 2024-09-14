import "./App.css"
import Post from "./components/Post";
import Header from "./components/Header";

function App() {
  return (<>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
  <main>
  <Header/>
  
    <Post/>
    <Post/>
    <Post/>

    </main>
    </>
  );
}

export default App;
