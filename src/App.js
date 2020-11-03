import React,{useState} from "react";
import logo from './logo.svg';
import './App.css';
import * as XLSX from "xlsx";


function App() {
 const [items, setItems] = useState([])
 let invoice=0;
 let amount=0;
 let valid=0;
 let invalid=0;
  const readExcel=(file)=>{
    const promise=new Promise((resolve,reject)=>{
      const fileReader=new FileReader();
      fileReader.readAsArrayBuffer(file)
      fileReader.onload=(e)=>{
        const bufferArray=e.target.result;
        const wb=XLSX.read(bufferArray,{type:'buffer'})
        const wsname=wb.SheetNames[0];
        const ws=wb.Sheets[wsname];
        const data=XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror=(error)=>{
        reject(error);
      };
    });
     promise.then((d)=>{
       setItems(d)
     })
  }
  return (
    <div >
     <input type="file" onChange={(e)=>{
     const file=e.target.files[0];
     readExcel(file)
     }}/>
     <br />
     <br/>
          <table class="table container">
  <thead>
    <tr >
     
      <th scope="col">Number Of Invoices Uploaded</th>
      <th scope="col">Total Sum of Invoice Amounts</th>
      <th scope="col">Vendors Invoices Uploaded</th>
      <th scope="col">Numbers of Invalid Invoices</th>
    </tr>
  </thead>
  <tbody>
    
    {items.map((d)=>{
      if(parseInt(d['Invoice Numbers'])>0){
        invoice=invoice+parseInt(d['Invoice Numbers']);
        valid++;
      }
      else{
        invalid++;
      }
        amount=amount+parseInt(d['Amt in loc.cur.']);

    })
  }
    <tr key={items['Document Number']}>
      <th scope="row">{invoice}</th>
      <td>{amount}</td>
      <td>{valid}</td>
      <td>{invalid}</td>
    </tr>
   
  </tbody>
</table>

    </div>
  );
}

export default App;
