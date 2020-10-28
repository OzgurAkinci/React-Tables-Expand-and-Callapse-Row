import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import './App.css';
import React from "react";
import MessagesAntd from "./pages/MessagesAntd";
import Messages from "./pages/Messages";

function App() {
  return (
    <div className="App">
        <div class="col-lg-6 ant-col-lg-offset-5">
            <div class="col-lg-12">
                <MessagesAntd />
            </div>
            <div className="col-lg-12">
                <Messages/>
            </div>
        </div>
    </div>
  );
}

export default App;
