const { json } = require('express');
const express=require('express');
var fs = require('fs');
const app=express()


var rdtxt=[]


fs.readFile('hl7.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
   
    for(i in array) {
      
        rdtxt.push(array[i]);
       
    }
   
      console.log( rdtxt)
      console.log(rdtxt.length)
});



app.get('/msg',(req,res)=>{
    final=[]
    msg=[]
    pid=[]
   out=rdtxt[0].split('|')
   out=rdtxt[1].split('|')
 
msg.push(`msg:${out[0]}`,`test:${out[3]}`,`out:${out[3].split('^^^')}`)
   var  o2=JSON.stringify({msg})
  
   const patientName=out[5].split('^').join(' ')
  
pid.push(`pid:${out[0]}`,`patient:${patientName}`,`out:${out[3].split('^^^')}`)
    
   o3=JSON.stringify({pid})
   final.push({o2,o3})
    res.send(final)
    // console.log('json',o2)
   })

// app.get('/pid',(req,res)=>{
  
// })

//     out=rdtxt[1].split('|')
//     const patientName=out[5].split('^').join(' ')
//     pid=[]
//  pid.push(`pid:${out[0]}`,`patient:${patientName}`,`out:${out[3]}`)
//     const o2=JSON.stringify({pid})
    
//      res.send(o2)
//      console.log('json',o2)
//  })
app.listen(3005,()=>{
    console.log('listening on port')
});
