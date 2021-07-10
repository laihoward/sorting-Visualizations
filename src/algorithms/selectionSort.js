import { swap } from './helpers';
const selectionSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    //輸出完整的arraySteps colorSteps
     
    for (let i = 0; i < array.length - 1; i++) {
      let changeindex = i;
      for (let j = i+1; j < array.length ; j++) {
        if (array[j] < array[changeindex]) {
          changeindex = j;
        }
      }
      array = swap(array,changeindex,i)
      arraySteps.push(array.slice());
      colorKey[changeindex] = 1;
      colorKey[i] = 1;
      colorSteps.push(colorKey.slice());
      colorKey[changeindex] = 0;
      colorKey[i] = 0;
      
      //最大值設定為綠色
      colorKey[i] = 2;
      arraySteps.push(array.slice());
      colorSteps.push(colorKey.slice());
    }
  
    // Remaining bars become green
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
  }
  
  export default selectionSort;