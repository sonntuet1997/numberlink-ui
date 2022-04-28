import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [dataInput, setDataInput] = useState(`40 10
1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . 6 . . . . . . . . . . . . . . . . . 
. . . . 2 4 . 4 . . . . . . . . . . . . . . . . 8 . . . . . . . . . . . . . . . 
. . . . . . . 5 . . . . . . . . . . . . . . . . . . . . 5 . . 9 3 . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 . . . . 9 . . . . 
. . . . 3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 . . . 
. . . . . . . . . . . . . . . . . . . 6 2 7 . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . . . . . . `);
  const [resultInput, setResultInput] = useState(`   1   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   8   8   8   8   8   8   8   8   8   8   8   8   8   8   7   7   7
  1   6   6   6   6   6   6   6   6   5   5   5   5   5   6   6   5   5   5   5   5   5   6   8   8   8   8   8   8   8   9   9   9   9   9   9   8   7   7   7
  1   6   6   6   2   4   4   4   5   5   4   4   4   5   5   5   5   4   4   5   5   5   5   8   8   7   7   7   8   8   9   9   9   3   3   9   8   7   7   7
  1   6   6   6   2   2   2   5   5   4   4   4   4   4   5   5   4   4   4   7   7   7   5   5   7   7   7   7   5   5   9   9   3   3   3   9   8   7   7   7
  1   6   6   6   6   6   2   2   2   4   4   4   4   4   4   4   4   4   4   7   7   7   7   5   7   7   5   5   5   5   7   7   7   7   3   9   8   3   3   3
  1   3   3   3   3   6   2   2   2   2   2   2   2   2   4   4   4   4   2   2   7   7   7   5   5   5   5   5   5   7   7   7   7   7   3   3   8   3   3   3
  1   3   6   6   6   6   6   6   6   6   6   6   6   2   2   2   2   2   2   2   2   7   7   7   7   7   5   5   7   7   7   7   7   7   3   3   8   7   7   7
  1   3   6   6   6   6   6   6   6   6   3   3   6   6   6   6   6   6   6   6   2   7   3   3   7   7   7   7   7   7   7   4   4   4   3   3   3   7   7   7
  1   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   7   7   7   7   7   7   7   4   4   4   3   3   3   7   7   7
  1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   3   3   3   3   3   3   3   3   3   3   3   3   3   3   7   7   7
`);
  const [dataRows, setDataRows] = useState([]);
  const [resultRows, setResultRows] = useState([]);
  const [separateNumber, setSeparateNumber] = useState(1);
  const [borderWidth, setBorderWidth] = useState('solid 4px red');
  const [colorTable, setColorTable] = useState([]);
  useEffect(() => {
    let t = [];
    for (let i = 0; i < 2000; i++) {
      t.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    setColorTable(t);
  }, []);
  useEffect(() => {
    const t = dataInput.split('\n');
    t.shift();
    setDataRows(t);
  }, [dataInput]);
  useEffect(() => {
    const t = resultInput.split('\n');
    setResultRows(t);
  }, [resultInput]);
  const setValue = (v) => {
    setDataInput(v.target.value);
  }
  const setResult = (v) => {
    setResultInput(v.target.value);
  }
  const solve = () => {
    axios.post(`https://api.numberlink.uetbc.xyz/solve`, {data: dataInput})
      .then(res => {
        setResultInput(res.data.result ?? '')
      })
  }
  return (
    <div className="App">
      <button style={{width: '200px', height: '80px', position: 'fixed', top: '0', left: '0'}}
              onClick={solve}>Solve {separateNumber}</button>
      <textarea value={dataInput} onChange={setValue}/>
      <textarea value={resultInput} onChange={setResult}/>
      {dataRows.map((row, i) => {
        const cells = row.split(/(\s+)/).filter((e) => {
          return e.trim().length > 0;
        });
        const resultCells = resultRows[i]?.split(/(\s+)/).filter((e) => {
          return e.trim().length > 0;
        }) ?? [];
        return (<div style={{width: `${65 * (cells.length + 10)}px`}}>
            {cells.map((c, j) => {
              return (<div style={{
                display: 'inline-table',
                width: (c === '.' || c === '0') ? '65px' : '57px',
                height: (c === '.' || c === '0') ? '65px' : '57px',
                backgroundColor: colorTable[resultCells[j] ?? (c === '.' || c === '0' ? '' : c)],
                border: (c === '.' || c === '0') ? '' : borderWidth,
                lineHeight: (c === '.' || c === '0') ? '65px' : '57px'
              }}>
                &nbsp;{resultCells[j] ?? (c === '.' || c === '0' ? '' : c)}
              </div>)
            })}
          </div>
        )
      })}
    </div>
  );
}

export default App;
