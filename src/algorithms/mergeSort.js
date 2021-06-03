// import { insertStep } from './helpers';

function mergeSort(array, position, arraySteps, colorSteps) {
  if (array.length === 1) return array;
  let middle = Math.floor(array.length / 2);

  // Split and work recursively
  let arrayL = mergeSort(array.slice(0, middle), position, arraySteps, colorSteps);
  let arrayR = mergeSort(array.slice(middle), position + middle, arraySteps, colorSteps);

  let arrayNew = merge(arrayL, arrayR, position, arraySteps, colorSteps);
  arraySteps.push(arraySteps[arraySteps.length - 1].slice());
  colorSteps.push(colorSteps[colorSteps.length - 1].fill(arrayNew.length === arraySteps[0].length ? 2 : 0));
  return arrayNew;
}

const merge = (arrayL, arrayR, position, arraySteps, colorSteps) => {
  let arrayNew = [];
  let A = 0;
  let B = 0;
  //處理  
  while (arrayL.length > 0 && arrayR.length > 0) {
    if (arrayL[A] < arrayR[B]) {
      arrayNew.push(arrayL.shift());
      insertStep(arrayNew, position, arraySteps);
    } else {
      arrayNew.push(arrayR.shift());
      insertStep(arrayNew, position, arraySteps);
    }
    updateColor(position, colorSteps, arrayNew.length - 1, [], []);
  }

  // concatenate remaining values

  if (arrayL.length !== 0 || arrayR.length !== 0) {
    updateColor(position, colorSteps, arrayNew.length, arrayL, arrayR);
    arrayNew = arrayNew.concat(arrayL);
    arrayNew = arrayNew.concat(arrayR)
    insertStep(arrayNew, position, arraySteps);
  }
  

  return arrayNew;
}

function insertStep(arrayNew, position, arraySteps) {
    //複製arraySteps的最後一個array
    let currentStep = arraySteps[arraySteps.length - 1].slice();
    //從position位置開始 刪除arrayNew.length個元素 插入arrayNew所有的值
    currentStep.splice(position, arrayNew.length, ...arrayNew);
    arraySteps.push(currentStep);
  }

//colorSteps加入新的一個array(步驟)
function updateColor(position, colorSteps, start, arrayL, arrayR) {
  //複製colorSteps的最後一個array
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  //計算要更改的元素的終點
  let end = position + start + arrayL.length + arrayR.length;
  //計算要更改的元素的起點
  start = start + position;

  if (end === start) {
    colorKey.fill(1, start, end + 2);
  } else {
    colorKey.fill(1, start, end+1);
  }
  colorSteps.push(colorKey);
}

export default mergeSort;