const bubbleSort = (array) => {
  const checks = [];
  const swaps = [];
  const tempArray = array.slice();
  for (let i = 0; i < tempArray.length; i++) {
    for (let j = 0; j < tempArray.length - i - 1; j++) {
      checks.push([j, j + 1]);
      if (tempArray[j] > tempArray[j + 1]) {
        swaps.push([j, j + 1]);
        const temp = tempArray[j];
        tempArray[j] = tempArray[j + 1];
        tempArray[j + 1] = temp;
      }
    }
  }
  return { checks, swaps, tempArray };
};

export default bubbleSort;
