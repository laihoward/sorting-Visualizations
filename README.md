# Sort Visualizing
使用三種sort algorithms排列，並且將sort algorithms過程的步驟視覺化。

![](https://i.imgur.com/18jWwFd.png)
## 建立React
一開始先在命令列程式中輸入，專案資料夾名稱為backend_connect_frontend
```javascript=
npx create-react-app sort_visualization
```
輸入以下的指令切換到backend_connect_frontend資料夾中，然後啟動網站伺服器
```javascript=
cd sort_visualization
npm start
```
在index.js中會去呼叫App.js，因此會在App.js中編寫主要的程式。
![](https://i.imgur.com/l8uFQsS.png)
```javascript=
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## React架構
以下介紹如何在App.js中編寫主要程式
### React.Component
在 React 中，你可以將 component 定義成 class 。定義為 class 的 component 提供了多種功能，React.Component中一定要定義render()因為Component會接受名為 props的參數，並透過render()這個方法回傳一個有階層架構的view到螢幕上。
```javascript=
class App extends React.Component{
    render(){
        return 
    }
}
```
### 宣告變數
在React.Component中宣告與初始化變數。
```javascript=
  state={
    array:[],//完整資料
    arraySteps:[],//bar排序的過程中數值的變化步驟 每一個步驟為一個array
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
```
### render()

render()為React中必要存在的生命週期函數，接受輸入的資料並回傳需要顯示的內容。只要預設的變數發生改變，render()會自動進行一次，因此建置網頁格式與外觀的內容就會寫在此函數中，並且使用[JSX語法](https://zh-hant.reactjs.org/docs/introducing-jsx.html)，傳入給元件的輸入資料可以透過 this.props存取。

### export default 
只需要回傳一個值時，使用export default。import後可直接讀取module供index.js使用。
```javascript=
export default App;
```
如果要回傳多個值，使用export。

## 建立網頁格式與外觀
在上述提到的render()的return()
中編寫網頁格式與外觀的內容，有關於頁面的設計的語法基本跟HTML的寫法相似。
### **標題**
![](https://i.imgur.com/fGj27pb.png)
```javascript=
<h1>Sorting Visualization</h1>
```
### **功能欄位**
**選擇Sorting Algorithms**

![](https://i.imgur.com/1JxPvYH.png)
```htmlmixed=
<button   
    className="bubblesortBtn"
    onClick={this.changeToBubbleSort}
>Bubble Sort</button>
```
按鈕設計
```css=
.bubblesortBtn{
  width: 90px;/*寬度*/
  margin-right:20px ;/*與右邊間隔*/
  height: 35px;/*高度*/
  border-radius: 5px;/*圓角*/
  color: white;/*文字顏色*/
  background: #4C8FFB;/*背景顏色*/
  border: 2px #3079ED solid;
  box-shadow: inset 0 1px 0 #80B0FB;/*陰影*/
}
```
按下按鈕更改顏色

![](https://i.imgur.com/hVsIDZJ.png)
```css=
.bubblesortBtn:focus{
  background-color: red
}
```
**功能按鍵**

使用[IconButton API](https://material-ui.com/zh/api/icon-button/)
使圖標有按鍵功能
```javascript=
import { IconButton } from '@material-ui/core';
```

使用[官方Material icons](https://material-ui.com/zh/components/material-icons/)載入不同圖標樣式

![](https://i.imgur.com/G0WCwzJ.png)
```javascript=
import {Autorenew,PlayArrow,Pause,SkipPrevious,SkipNext} from '@material-ui/icons';
```

```javascript=
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
```
啟動按鍵{playarrayBtn}會有三種狀態
排序進行中會顯示暫停功能

![](https://i.imgur.com/Q5AY9MF.png)

完成排列會顯示重啟功能

![](https://i.imgur.com/ACWuh9t.png)

靜止狀態會顯示啟動功能

![](https://i.imgur.com/FO5Ddrp.png)

將判斷狀態的程式碼寫在render中的return()前
```javascript=
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
```

### **資料視覺化**
以bar型式視覺化array中的資料

![](https://i.imgur.com/qTebvTM.png)

在return()前宣告變數barsDiv，並將array中的資料逐一給到預先寫好的Bar標籤中

![](https://i.imgur.com/7AyqYyl.png)

將array中的index和value給到Bar標籤中的key和length
```javascript=
let barsDiv = this.state.array.map((value,index) => <Bar
      key={index}
      length={value}
      colorKey={this.state.colorKey[index]}
/>);
```
Bar標籤中宣告變數COLOR_SET、color和style，COLOR_SET宣告bar的3種顏色，color依據colorKey陣列決定每個bar的顏色，style設定bar的高度以及顏色
```javascript=
function Bar({ length, colorKey }) {
    const COLOR_SET = ["black", "red", "green"];
    let color = COLOR_SET[colorKey];
    let style = {
      height: length,
      backgroundColor: color,
    }
    return (
      <div className="bar" style={style} >{length}</div>
    )
  }
```
把陣列資料視覺化出來，程式碼寫在return中
```htmlmixed=
<section className="bars card container">
    {barsDiv}
</section>
```
設計背景以及顯示位置

![](https://i.imgur.com/qTebvTM.png)
```css=
  .container {
    display: flex;
    align-items: flex-end;/*物件位置*/
    justify-content: center;/*對齊主軸線中央*/
    margin: 50px;/*頂部與上一個物件距離*/
    padding: 30px;/*bar與背景間隔*/
  }
  .bars {
    height: 100px;/*背景高度*/
  }
  .card {
    background: white;/*背景顏色*/
    border-radius: 15px;/*圓角*/
    box-shadow: 0px 5px 15px 0px #ddd;/*陰影*/
  }
```
## 函數介紹
### componentDidMount()
為生命週期函數，在程式首次執行render渲染後，自動執行的函數，函數中呼叫函數generateBars()初始化亂數陣列。
```javascript=
componentDidMount(){
    this.generateBars();
  }
```
### generateBars()
初始化或重製亂數陣列，
```javascript=
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
    //()=>this.generateSteps(): 將4個數據傳給函數generateSteps()並將數據更新為函數的輸出
    this.state.arraySteps = [barsTemp]
    this.setState({
      array:barsTemp,
      arraySteps:[barsTemp],
      barCount:barCount,
      currentStep:0,
    },()=>this.generateSteps());
  }
```
### generateSteps()
將sort algorithm所需的參數array、arraySteps和colorSteps複製並且將參數傳入選擇好的sort algorithm中，經過sort algorithm排列後的arraySteps和colorSteps，在以setState更新。
```javascript=
generateSteps=()=>{
    //複製array、arraySteps和 colorSteps三組數據
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
```
經過上述三個函式的運作，已經備製好視覺化每個步驟的陣列arraySteps以及colorSteps。

**<font color=red>arraySteps</font>**
負責bar排序的過程中數值的變化步驟 每一個步驟為一個array

**<font color=red>colorSteps</font>**
負責bar排序的過程中顏色的變化步驟 每一個步驟為一個array

### clearColorKey()
初始化colorKey和colorSteps兩個變數，將2個變數的值都初始化為0。
```javascript=
clearColorKey(){ 
    //resetKey為barCount個0的array
    let resetKey = new Array(parseInt(this.state.barCount)).fill(0);
    this.setState({
      colorKey :resetKey,
      colorSteps :[resetKey],
    });
  }
```
### clearTimeouts()
初始化timeouts變數。
```javascript=
clearTimeouts = () => {
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    })
  }
```
### changeToBubbleSort()
按下Bubble Sort的按鈕後，會呼叫此函數，將變數algorithms更改為Bubble Sort，currentStep為0。

如果this.state.currentStep === 0，arraySteps =arraySteps[0]

如果不為0，arraySteps =arraySteps[currentStep - 1]

在將這3個變數傳給函數generateSteps()，讓資料以Bubble Sort進行排列。
函數changeToQuickSort()、changeToMergeSor()和changeToSelectionSor()皆以此原理更改變數algorithms並進行排列。
```javascript=
changeToBubbleSort=()=>{
    this.setState({
      algorithms: 'Bubble Sort',
      currentStep: 0,
      arraySteps: [this.state.arraySteps[this.state.currentStep === 0 ? 0 : this.state.currentStep - 1]],
    }, () => this.generateSteps());
    this.clearTimeouts();
    this.clearColorKey();
  }
```
## 介紹演算法
這次視覺化採用4種sort algorithms，分別是Bubble Sort、Merge Sort、Quick Sort和Selection Sort，以下依序介紹排列原理。
### Bubble Sort
演算法原理是從陣列的最前面開始，一次比較陣列中兩兩相鄰的元素，然後根據大小將它們調換順序，大的移到後面，以此類推完成排列。arraySteps紀錄每次變化後的陣列數據，colorSteps紀錄每次變化後bar該對應的顏色。
```javascript=
import { swap } from './helpers';
const bubbleSort = (array, position, arraySteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  //輸出完整的arraySteps colorSteps
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1);
      }
      arraySteps.push(array.slice());
      colorKey[j] = 1;
      colorKey[j + 1] = 1;
      colorSteps.push(colorKey.slice());
      colorKey[j] = 0;
      colorKey[j + 1] = 0;
    }
    //最大值設定為綠色
    colorKey[array.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }
  // Remaining bars become green
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  return;
}
export default bubbleSort;
```
### Merge Sort
Merge Sort是一種Divide and Conquer演算法，會將陣列拆分成最小單位，再比較拆分後陣列數值的大小，依序進行排列。如下圖所示

![](https://i.imgur.com/zAuxjGv.png)

### Quick Sort
Quick Sortu也是一種Divide and Conquer演算法，原理如下：

在陣列中挑選第一個、最後一個和中間三者中第二小的值稱為pivot，將pivot與最尾端的值互換，然後調整數列，使得「所有在pivot左邊的數，都比pivot還小」，而「在pivot右邊的數都比pivot大」。
接著，將所有在pivot左邊的數視為「新的數列」，所有在pivot右邊的數視為「另一個新的數列」，「分別」重複上述步驟(選pivot、調整數列)，直到分不出「新的數列」為止。
### Selection Sort
Selection Sort的原理只需要重複執行兩個步驟，分別是：
找最小值從陣列中找到最小值，再把最小值與陣列中未排序最左邊的值進行互換，以此類推完成排列。

![](https://i.imgur.com/q2O2fpM.png)
