

let num  = 0;
function app( ){
   num++;

  document.querySelector('.num').innerHTML  = num;
  console.log(num)
  window.requestAnimationFrame(app);    //app(); solve reursion stack over flow problem
}

 //app();
 Array.prototype.myfilter  = function(cb){
    let out  =  [];
    for (let index = 0; index < this.length; index++) {
         let element = this[index];
         //console.log(element)
         if(cb(element) ) { out.push(element)};
      
    }
    console.log(out)
 };/// if you remove the delimeter (;) it won't work

 [2,3,4,5,6].myfilter( ele=>ele > 5)

function myfilter2(array,cb){
  let this_  = array;
  let out  =  [];
  for (let index = 0; index < this_.length; index++) {
       let element = this_[index];
     //  console.log(element)
       if(cb(element) ) { out.push(element)};
    
  }
  console.log(out)
  

} 

myfilter2( [2,3,4,5,6],ele=>ele > 5)

let obj1  = {
     
 buy: function(thing){
       // console.log(this)
    console.log(...thing,this.money)
 }  //
}

let obj2  = {
  money:" for 5M",
  sell:function(something){
     console.log(something)
  }
}

obj1.buy.call(obj2,['car','house'])
let m   = obj1.buy.bind(obj2)
m('gold')
//console.log(m,obj1.buy("tv"))




function _a(a){
  console.log(a, ' is A')
  return a+2
}


function _b(b){
   console.log(b, ' is B')
  return b+6
}



function _c(c){
  console.log(c," is c")
  return c**2
}

function _d(d){
  console.log(d," is d")
  return d**3
}
function _e(e){
  console.log(e," is e")
  return e**4
}

function _f(f){
  console.log(f," is e")
  return f**5+f
}

let a =  3
let compose   = (...functions)=>{
    return (args)=>{
      return functions.reduceRight((arg,fn)=>fn(arg),args)
    }
}     

let customeCompose  = (...functions)=>{
  return (arg_of_last_function)=>{
            j  = 0;
            let all_ans = []  
            let ans_  = 0;
        for(let i = functions.length ; i > 0 ;i--){
                 let ans = 0;
                 //console.log((i-j),"i - J",functions.length-)
               j++
                        
               if((i-1) === functions.length-j){
                  //console.log(functions[i-1],' function',j-1)
                  let ans__ = functions[i-1](j==1?arg_of_last_function:all_ans[j-2] );
                    //console.log(ans," ", i) 
                  all_ans.push(ans__);
                  //console.log(all_ans,'___ALL ANS')
              }
             // ans_ +=ans;
             

              
        }
        console.log("FIANL",all_ans[j-1])
        return all_ans[j-1]
  }
}


console.log(customeCompose(_b,_a,_c,_d,_e,_f)(3))
console.log(compose(_b,_a,_c,_d,_e,_f)(3))


function debouncing(cb,d){
  let timer ;
  return (...arg)=>{
    if(timer) clearTimeout(timer);
      console.log(arg)
      timer  = setTimeout(()=>{
        cb(arg)
      },d)
  }
}
document.querySelector('input[name="email"]').addEventListener('change',debouncing(ev=>{
          console.log(ev)
},1000))

document.querySelector(".login-wrapper input[type='checkbox']").addEventListener("click", function() {
  
  this.classList.toggle("z-10")
})
// debouncing((arg)=>{
//    console.log(arg)
// },3000)('a','b','d')