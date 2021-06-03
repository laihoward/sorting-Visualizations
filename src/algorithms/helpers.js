//BubbleSort 交換位置
export function swap(array, indexA, indexB) {
    let temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
    return array;
  }
  //MergeSort :arraySteps加入新的一個array(步驟)
  export function insertStep(arrayNew, position, arraySteps) {
    //複製arraySteps的最後一個array
    let currentStep = arraySteps[arraySteps.length - 1].slice();
    //從position位置開始 刪除arrayNew.length個元素 插入arrayNew所有的值
    currentStep.splice(position, arrayNew.length, ...arrayNew);
    arraySteps.push(currentStep);
  }