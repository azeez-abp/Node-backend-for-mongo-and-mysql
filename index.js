 
 function CreatCircle(e){
this.radius = e  ;
this.a= "help" 
console.log(this.radius+this.m)
this.cll();  
 } 
let q = {uo:"uippp",cll:()=>{console.log("YEPAAA")},m:90}
 function2 = (r,x=null)=>{
      this.a ="pou"
    // console.log("FUNCTION 2",this.uo);

  
 }
///////////call
//let c  =  new CreatCircle("BIF CIRCLE");
CreatCircle.call(q,8,0)
//c.call({},"3")
// let a= document.querySelector("div")
// console.log(a)

let p  = {a:3,b:5,c:6};  ///obj iteratin
for (const key in p) {
    if (p.hasOwnProperty(key)) {
        const element = p[key];
       // key = p[key]
        console.log(element,key);
    }
    if(p.hasOwnProperty("c")){
        console.log("sd")
    }
}

let p_ ={v:5}
let nu = function(d){
d.v++;
console.log(d) 

}
nu(p_);

//console.log(nu(p)

function MakeC(r){
 this.radius = r;
 let defaultLocation= {x:0,y:0};///abtact variable
 let compL = function(){/////////abstract functin

 };
 

}



setTimeout(() => {
   // location.reload()
}, 3000);




/*
<ref *1> Mongoose {
  connections: [
    NativeConnection {
      base: [Circular *1],
      collections: {},
      models: {},
      config: {},
      replica: false,
      options: null,
      otherDbs: [],
      relatedDbs: {},
      states: [Object: null prototype],
      _readyState: 0,
      _closeCalled: false,
      _hasOpened: false,
      plugins: [],
      id: 0,
      _queue: [],
      _listening: false
    }
  ],
  models: {},
  events: EventEmitter {
    _events: [Object: null prototype] {},
    _eventsCount: 0,
    _maxListeners: undefined,
    [Symbol(kCapture)]: false
  },
  __driver: {
    Binary: [Function: Binary] {
      fromExtendedJSON: [Function (anonymous)],
      BSON_BINARY_SUBTYPE_DEFAULT: 0,
      BUFFER_SIZE: 256,
      SUBTYPE_DEFAULT: 0,
      SUBTYPE_FUNCTION: 1,
      SUBTYPE_BYTE_ARRAY: 2,
      SUBTYPE_UUID_OLD: 3,
      SUBTYPE_UUID: 4,
      SUBTYPE_MD5: 5,
      SUBTYPE_ENCRYPTED: 6,
      SUBTYPE_COLUMN: 7,
      SUBTYPE_USER_DEFINED: 128
    },
    Collection: [Function: NativeCollection],
    Decimal128: [Function: Decimal128] {
      fromString: [Function (anonymous)],
      fromExtendedJSON: [Function (anonymous)]
    },
    ObjectId: [Function: ObjectId] {
      getInc: [Function (anonymous)],
      generate: [Function (anonymous)],
      createPk: [Function (anonymous)],
      createFromTime: [Function (anonymous)],
      createFromHexString: [Function (anonymous)],
      isValid: [Function (anonymous)],
      fromExtendedJSON: [Function (anonymous)],
      index: 14831572
    },
    ReadPreference: [Function: readPref],
    getConnection: [Function (anonymous)]
  },
  options: {
    pluralization: true,
    autoIndex: true,
    autoCreate: true,
    [Symbol(mongoose:default)]: true
  },
  _pluralize: [Function: pluralize],
  Schema: [Function: Schema] {
    reserved: [Object: null prototype] {
      validate: 1,
      toObject: 1,
      save: 1,
      remove: 1,
      populated: 1,
      isNew: 1,
      isModified: 1,
      init: 1,
      get: 1,
      errors: 1,
      collection: 1,
      removeListener: 1,
      listeners: 1,
      emit: 1,
      prototype: 1
    },
    Types: {
      String: [Function],
      Number: [Function],
      Boolean: [Function],
      DocumentArray: [Function],
      Subdocument: [Function],
      Array: [Function],
      Buffer: [Function],
      Date: [Function],
      ObjectId: [Function],
      Mixed: [Function],
      Decimal: [Function],
      Decimal128: [Function],
      Map: [Function],
      Oid: [Function],
      Object: [Function],
      Bool: [Function],
      ObjectID: [Function]
    },
    ObjectId: [Function: ObjectId] {
      schemaName: 'ObjectId',
      defaultOptions: {},
      get: [Function (anonymous)],
      set: [Function: set],
      _checkRequired: [Function (anonymous)],
      _cast: [Function: castObjectId],
      cast: [Function: cast],
      _defaultCaster: [Function (anonymous)],
      checkRequired: [Function (anonymous)]
    }
  },
  model: [Function (anonymous)],
  plugins: [
    [ [Function (anonymous)], [Object] ],
    [ [Function (anonymous)], [Object] ],
    [ [Function], [Object] ],
    [ [Function (anonymous)], [Object] ],
    [ [Function: trackTransaction], [Object] ]
  ],
  default: [Circular *1],
  mongoose: [Circular *1]
}*/ 