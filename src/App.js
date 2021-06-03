import React from 'react';
import {Autorenew,PlayArrow,Pause,SkipPrevious,SkipNext} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import bubbleSort from './algorithms/bubbleSort';
import mergeSort from './algorithms/mergeSort';
import quickSort from './algorithms/quickSort';
import './App.css';

import Bar from './components/Bar';

class App extends React.Component{
  state={
    array:[],//完整資料
    arraySteps:[],
    colorKey:[],//決定bar的顏色
    colorSteps:[],//bar排序的過程中顏色的變化步驟 每一個步驟為一個array
    currentStep:0,//bar排序顏色變化的步驟數
    barCount:10,//資料數量
    timeouts: [],
    delay:300,
    algorithms:'Bubble Sort'
  }
  algorithmsSet = {
    'Bubble Sort': bubbleSort,
    'Merge Sort': mergeSort,
    'Quick Sort': quickSort,

  }
  
  componentDidMount(){
    this.generateBars();
  }

  generateBars = ()=>{
    this.clearColorKey();
    this.clearTimeouts();
    //parseInt將輸入的字串轉為整數
    let barCount = parseInt(this.state.barCount);
    let barsTemp = [];
    //製造出barCount個亂數
    for (let i =0;i<barCount;i++){
      barsTemp.push(Math.floor(Math.random()*90)+10);
    }
    //{}中為 更新4個數據  
    //()=>this.generateSteps(): 將4個數據傳給函數 並將數據更新為函數的輸出
    this.state.arraySteps = [barsTemp]
    this.setState({
      array:barsTemp,
      arraySteps:[barsTemp],
      barCount:barCount,
      currentStep:0,
    },()=>this.generateSteps());
  }

  clearColorKey(){ 
    //resetKey為barCount個0的array
    let resetKey = new Array(parseInt(this.state.barCount)).fill(0);
    this.setState({
      colorKey :resetKey,
      colorSteps :[resetKey],
    });
  }

  clearTimeouts = () => {
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    })
  }

  changeToBubbleSort=()=>{
    this.setState({
      algorithms: 'Bubble Sort',
      currentStep: 0,
      arraySteps: [this.state.arraySteps[this.state.currentStep === 0 ? 0 : this.state.currentStep - 1]],
    }, () => this.generateSteps());
    this.clearTimeouts();
    this.clearColorKey();
  }
  changeToQuickSort=()=>{
    this.setState({
      algorithms: 'Quick Sort',
      currentStep: 0,
      arraySteps: [this.state.arraySteps[this.state.currentStep === 0 ? 0 : this.state.currentStep - 1]],
    }, () => this.generateSteps());
    this.clearTimeouts();
    this.clearColorKey();
  }
  changeToMergeSor= (e) =>{
    this.setState({
      algorithms: e.target.value,
      currentStep: 0,
      arraySteps: [this.state.arraySteps[this.state.currentStep === 0 ? 0 : this.state.currentStep - 1]],
    }, () => this.generateSteps());
    this.clearTimeouts();
    this.clearColorKey();
  }

  generateSteps=()=>{
    //複製array arraySteps colorSteps三組數據
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    //執行演算法放入參數(array, 0, steps, colorSteps)
    this.algorithmsSet[this.state.algorithms](array, 0, steps, colorSteps);
    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    });
  }

  setTimeouts() {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();
    let timeouts = [];
    let i = 0;
    //steps.length - this.state.currentStep決定剩下的步數
    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
      }, this.state.delay * (i));
      timeouts.push(timeout);
      i++;
    }
    this.setState({
      timeouts: timeouts,
    });
  }
  
  stepBack=()=>{
    if (this.state.currentStep === 0) return;
    this.clearTimeouts();
    let currentStep = this.state.currentStep-1;
    this.setState({
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
      currentStep: currentStep,
    });
  }
  stepForward=()=>{
    if(this.state.currentStep>=this.state.arraySteps.length-1) return;
    this.clearTimeouts();
    let currentStep = this.state.currentStep+1;
    this.setState({
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
      currentStep: currentStep,
    });

  }

  render(){
    //map對array進行循環
    console.log();
    let barsDiv = this.state.array.map((value,index) => <Bar
      key={index}
      length={value}
      colorKey={this.state.colorKey[index]}
    />);
    let playarrayBtn;

    //排序進行中
    if (this.state.timeouts.length !==0 && this.state.currentStep !== this.state.arraySteps.length){
      playarrayBtn = (
        <IconButton onClick={()=>this.clearTimeouts()}>
          <Pause/>
        </IconButton>
      );
      //完成排序
    }else if(this.state.currentStep == this.state.arraySteps.length){
      playarrayBtn = (
        <IconButton color="secondary" onClick={()=>this.generateBars()}>
          <Autorenew/>
        </IconButton>
      );
      //靜止狀態
    }else{
      playarrayBtn = (
        <IconButton onClick={()=>this.setTimeouts()}>
          <PlayArrow/>
        </IconButton>
      );
    }

    return(
      <div className="App">
        <h1>sort visualization</h1>
        <section className="algorithm Btn">
          <button   
            className="bubblesortBtn"
            onClick={this.changeToBubbleSort}
          >Bubble Sort</button>
          <button 
            className="mergesortBtn"
            value ="Merge Sort"
            onClick={this.changeToMergeSor}
          >Merge Sort</button>
          <button 
            className="quicksortBtn"
            value ="Quick Sort"
            onClick={this.changeToQuickSort}
          >Quick Sort</button>
        </section>
        {/* bar的繪製 */}
        <section className="bars card container">
          {barsDiv}
        </section>
        {/* 功能按鍵 */}
        <section className="container-small">
          <IconButton onClick={()=>this.generateBars()}>
            <Autorenew/>
          </IconButton>
          <IconButton onClick={this.stepBack} >
            <SkipPrevious />
          </IconButton>
          {playarrayBtn}
          <IconButton onClick={this.stepForward} >
            <SkipNext />
          </IconButton> 
        </section>

      </div>
    )
  }
}


export default App;
