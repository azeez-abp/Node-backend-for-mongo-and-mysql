
function arr(){
let _a = ['a','b','c','d','e','f']
let _b  = _a  
let r_  = _a.shift()
console.log(r_,_a)

let r_2  = _a.unshift(...['2','5']);
let r_3 = _a.splice(-2,2);
console.log(r_,_a,r_2,r_3,_b) 

}

arr();