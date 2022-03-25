import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
  const dataInput = `0 15 0 1 0 2 10 14 12 0 0 0 0 0 0 0
0 6 3 16 12 0 8 4 14 15 1 0 2 0 0 0
14 0 9 7 11 3 15 0 0 0 0 0 0 0 0 0
4 13 2 12 0 0 0 0 6 0 0 0 0 15 0 0
0 0 0 0 14 1 11 7 3 5 10 0 0 8 0 12
3 16 0 0 2 4 0 0 0 14 7 13 0 0 5 15
11 0 5 0 0 0 0 0 0 9 4 0 0 6 0 0
0 0 0 0 13 0 16 5 15 0 0 12 0 0 0 0
0 0 0 0 9 0 1 12 0 8 3 10 11 0 15 0
2 12 0 11 0 0 14 3 5 4 0 0 0 0 9 0
6 3 0 4 0 0 13 0 0 11 9 1 0 12 16 2
0 0 10 9 0 0 0 0 0 0 12 0 8 0 6 7
12 8 0 0 16 0 0 10 0 13 0 0 0 5 0 0
5 0 0 0 3 0 4 6 0 1 15 0 0 0 0 0
0 9 1 6 0 14 0 11 0 0 2 0 0 0 10 8
0 14 0 0 0 13 9 0 4 12 11 8 0 0 2 0`
  const [dataRows, setDataRows] = useState([]);
  const [separateNumber, setSeparateNumber] = useState(1);
  const [borderWidth, setBorderWidth] = useState('solid 1px ');
  useEffect(() => {
    const t = dataInput.split('\n');
    setDataRows(t);
    setSeparateNumber(Math.sqrt(t.length));
  }, []);

  const solve = () => {

  }
  return (
    <div className="App">
      <button style={{width: '200px',height: '80px', position:'fixed', top:'0', left:'0'}} onClick={solve}>Solve</button>
      {dataRows.map((row, i) => {
        return (<div style={{width:`${45*(dataRows.length+5)} px`}}>
            {row.split(' ').map((c, j) => {
              const top = i % separateNumber === 0 ? 'red' : 'grey';
              const left = j % separateNumber === 0 ? 'red' : 'grey';
              const right = (j % separateNumber) === (separateNumber - 1) ? 'red' : 'grey';
              const down = (i % separateNumber) === (separateNumber - 1) ? 'red' : 'grey';
              return (<div style={{
                display: 'inline-table',
                width: '45px',
                height: '45px',
                borderLeft: borderWidth + left,
                borderRight: borderWidth + right,
                borderTop: borderWidth + top,
                borderBottom: borderWidth + down,
                lineHeight: '45px'
              }}>
                &nbsp;{c === '.' ||c === '0'  ? '' : c}
              </div>)
            })}
          </div>
        )
      })}
    </div>
  );
}

export default App;
