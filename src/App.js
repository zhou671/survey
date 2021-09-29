import React, { Suspense, useState } from "react";
import Registration from "./components/Registration";
import Survey from "./components/Survey";
import Loading from "./components/Loading";
import "./components/styles/body.css"

const axios = require('axios');
const url = window.location.origin;
//const url = "http://localhost:5000"
const checkuserurl = url + "/api/checkuser/";
const getobjfileurl = url + "/api/getfile/";
const choiceurl = url + "/api/makeselection/";
const uniqueurl = url + "/api/getuniquecode/";

function App() {
  const [regPage, setRegPage] = useState(true)
  const [nextSeqId, setNextSeqId] = useState(0)
  const [userId, setUserId] = useState('')
  const [filename, setFilename] = useState()

  const handleLogin = async(userName) => {
    const data = await axios.get(checkuserurl+userName)
    var jsonresp = data.data
    setUserId(userName)
    setNextSeqId(parseInt(jsonresp.nextId));
    setFilename(jsonresp.fileName)
    setRegPage(false)
  }

  function webgl_support () { 
    try {
     var canvas = document.createElement('canvas'); 
     return !!window.WebGLRenderingContext &&
       (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch(e) {
      return false;
    }
  };

  var webgltest = webgl_support();
  if (!webgltest){
    return <body>
      This survey needs support of webgl, please either switch a brower or enable webgl.
    </body>
  }

  return (
    <body>
      { 
        regPage ? 
          <Registration onRegister={handleLogin}/> : 
          <Suspense fallback={<Loading/>}> 
            <Survey url={getobjfileurl} nextseq={nextSeqId} userId={userId} fileNames={filename} choiceurl={choiceurl} uniqueurl={uniqueurl}/>
          </Suspense>
        
      }
    </body>
  );
}

export default App;
