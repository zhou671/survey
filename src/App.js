import React, { Suspense, useState } from "react";
import Registration from "./components/Registration";
import Survey from "./components/Survey";
import Loading from "./components/Loading";

const checkuserurl = "http://localhost:5000/api/checkuser/";
const getobjfileurl = "http://localhost:5000/api/getfile/";

function App() {
  const [regPage, setRegPage] = useState(true)
  const [nextSeqId, setNextSeqId] = useState(0)
  const [userId, setUserId] = useState('')
  const [filename, setFilename] = useState('')
  const handleLogin = (userName) => {
    console.log(userName)
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", checkuserurl+userName, true);
    xhttp.addEventListener('load', () => {
        console.log('Received an HTTP response.');
        var jsonresp = JSON.parse(xhttp.response);
        console.log(jsonresp);
        setNextSeqId(parseInt(jsonresp.nextId));
        setFilename(jsonresp.fileName)
        setRegPage(false)
        setNextSeqId(0)
    });
    xhttp.send();
    setUserId(userName)
  }

  return (
    <div className="container">
      {
        regPage ? 
          <Registration onRegister={handleLogin}/> : 
          <Suspense fallback={<Loading/>}> 
            <Survey url={getobjfileurl} nextseq={nextSeqId} userId={userId}/>
          </Suspense>
      }
    </div>
  );
}

export default App;
