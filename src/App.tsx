import React, {useState, useEffect} from 'react';
import GuideButton from './components/GuideButton';
import './normalize.css';
import './App.css';
import HeaderImg from './images/headerimg.png';

function App() {
  const [beatValue,setBeatValue] = useState<number>(4);
  const [countValue,setCountValue] = useState<number>();
  const [bpmValue,setBpmValue] = useState<number>();
  const [hitValue,setHitValue] = useState<number>();
  const [hitLength, setHitLength] = useState<number | null>(null);
  const [hitLengthReal, setHitLengthReal] = useState<number | null>(null);
  const [hitPerSecond, sethitPerSecond] = useState<number | null>(null);
  const [hitLimit, sethitLimit] = useState<number | null>(null);
  const [hitDifference, sethitDifference] = useState<number | null>(null);
  const handleBeat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBeatValue(Number(e.target.value));
  };
  const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountValue(Number(e.target.value));
  };
  const handleBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpmValue(Number(e.target.value));
  };
  const handleHit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHitValue(Number(e.target.value));
  };

  useEffect(() => {
    if (beatValue && countValue && bpmValue) {
      const length = (240*Number(countValue)/Number(beatValue) - 5) / Number(bpmValue);
      setHitLength(parseFloat(length.toFixed(4)));
      setHitLengthReal(length);
    } 
    else {
      setHitLength(null);
    }
  }, [beatValue,countValue, bpmValue]);

  useEffect(() => {
    if(hitLengthReal && hitValue){
      const mainresult = Number(hitValue)/Number(hitLengthReal);
      sethitPerSecond(parseFloat(mainresult.toFixed(4)));
    }
    else{
      sethitPerSecond(null);
    }
  },[hitLength,hitValue]);

  useEffect(() => {
    if(hitLengthReal){
      const limit = Math.ceil(Number(hitLengthReal)*60);
      sethitLimit(limit);
    }
    else{
      sethitLimit(null);
    }
  },[hitLengthReal]);

  useEffect(() => {
    if(hitValue && hitLimit){
      const dif = Number(hitLimit) - Number(hitValue);
      sethitDifference(dif);
    }
    else{
      sethitDifference(null);
    }
  })
  
  return (
    <div className="App">
      <header>
        <img src={HeaderImg} />
        <h1 className="title" >連打計算サイト</h1>
        <GuideButton/>
      </header>
      <div className="bg">
        <section className="input">
          <div className="inputField">
            <div className="inputField1">
              <div className="inputboxspecial">
                <label className="labelSp" htmlFor="beat">リズム単位</label>
              <select id="beat" value={beatValue} onChange={(e) => handleBeat(e)}>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
              </div>
              <div className="inputText">[分音符]　×</div>
              <div className="inputbox">
                <label htmlFor="count">個数</label>
                <input type="number" id="count" name="" value={countValue} onChange={(e) => handleCount(e)}></input>
              </div>
              <button className="bm" onClick={() => setCountValue(Number(countValue)-1)}>-</button>
              <button className="bp" onClick={() => setCountValue(Number(countValue)+1)}>+</button>
            </div>
            <div className="inputField2">
              <div className="inputbox">
                <label htmlFor="bpm">BPM</label>
                <input type="number" id="bpm" name="" value={bpmValue} onChange={(e) => handleBpm(e)}></input>
              </div>
              <button className="bm" onClick={() => setBpmValue(Number(bpmValue)-1)}>-</button>
              <button className="bp" onClick={() => setBpmValue(Number(bpmValue)+1)}>+</button>
            </div>
            <div className="inputField3">
              <div className="inputbox">
                <label htmlFor="hit">入力打数</label>
                <input type="number" id="hit" name="" value={hitValue} onChange={(e) => handleHit(e)}></input>
              </div>
              <button className="bm" onClick={() => setHitValue(Number(hitValue)-1)}>-</button>
              <button className="bp" onClick={() => setHitValue(Number(hitValue)+1)}>+</button>
              <div className="inputText">[打]</div>
            </div>
          </div>
        </section>
        <hr/>
        <section className="output">
          <p>秒速:　<strong>{hitPerSecond} [打/秒]</strong></p>
          <p className="smalltext">(理論値まであと　<strong>{hitDifference} [打]</strong>)</p>
          <p>連打秒数:　<strong>{hitLength} [秒]</strong></p>
          <p>理論値:　<strong>{hitLimit} [打]</strong></p>
        </section>
      </div>
    </div>
  );
}

export default App;
