/*function fatorial(n) {
    
    if(n === 0){
        return 1;
    }

    return n * fatorial(n-1);


    
};

console.log(fatorial(5));
*/

function findMax(arr, index = 0, max = -Infinity) {
    if (index === arr.length) {
      return max;
    }
    if (arr[index] > max) {
      max = arr[index];
    }
    return findMax(arr, index + 1, max);
}
  
// Exemplo de uso
const array = [3, 1, 4, 1, 5, 9, 2, 6, 5];
const maxVal = findMax(array);
console.log(`O valor máximo no array é: ${maxVal}`);
  