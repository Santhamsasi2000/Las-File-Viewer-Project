import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

 const[file,setFile] = useState(null);
 function changeHandler(event)
 {
   setFile(event.target.files[0]);
 }
 async function clickHandler()
 {
   const formData = new FormData();
   formData.append("lasFile",file);

   try
   {
    const response = await axios.post("http://localhost:3000/upload",formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    console.log(response.data);
   }
   catch(error)
   {
     console.log(error);
   }
 }

  
  return (
   <>
     <h1>LAS File Viewer</h1>
     <div>
       <input type="File" onChange={changeHandler}/>
       <button onClick={clickHandler}>File Submit</button>
     </div>
   </>
  );
}

export default App;
