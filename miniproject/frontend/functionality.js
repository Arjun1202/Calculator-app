const arr=document.getElementsByClassName("btns");
const box=document.getElementById("expression");
let arr1=[];

let zr=document.getElementById('zero')
let equalto=document.getElementById('eql')

window.addEventListener('load',()=>
{
    box.value="";
    let k3=document.getElementById("recents");
    fetch('http://localhost:8383/getresults',{method:"GET"}).then(res=>res.json()).then
    (
        (res)=>
        {
            Array.from(res).forEach((item,i)=>
            {
                let k1=document.createElement('div');
                k1.innerText=(i+1)+" ) "+item.expression+" = "+item.result;
                k3.appendChild(k1);
                arr1.push({expression:item.expression,result:item.result})
            })
        }
    ).catch(err=>console.log(err))
})

zr.addEventListener('click',()=>
{   
    let rg4=/[i]/i;
    if(rg4.test(box.value)!=true)
    {
        box.value+=zr.innerText;
    }
})

Array.from(arr).forEach((item)=>
{   
    let rg4=/[i]/i;
    item.addEventListener('click',()=>
    {   
    if(rg4.test(box.value)!=true)
    {
        box.value+=item.innerText;
    }
    }
    )
})

let calc=(box)=>
{   
    let wr=document.getElementById('wrong');
    let ob=document.getElementById("results");
    let recentResults=document.getElementById("recents");
    let a=box.value;
    wr.style.visibility="hidden";
    let rg5=/\/{2,}/;
    if(a=="Invalid Expression")
        return;
    try
    {   
        let f=0;
        d=eval(a);
        if(d===undefined || d===null)
        {
            box.value=""; 
            f=1;
        }
        else if(rg5.test(a)!=true)
        {   
            if(d-Math.floor(d)==0)
            {
            box.value=d;
            }
            else
            {
                let l2=d.toString().split('.');
                if(l2[1].length<=5)
                {
                box.value=d;
                }
                else
                {
                box.value=d.toFixed(5);
                }
            }
            arr1.push({expression:a,result:box.value}); 
        }
        else
        {
            wr.style.visibility="visible";
            arr1.push({expression:a,result:"Invalid Expression"});
        }    
    }
    catch(err)
    {
            box.value="";
            wr.style.visibility="visible";
            arr1.push({expression:a,result:"Invalid Expression"});
    }
    finally
    {   
        ob.removeChild(recentResults);
        let ob2=document.createElement('div');
        ob2.setAttribute("id","recents");
        let l=arr1.length;
        let resultCollection;
        let j;
        let c1;
        for(j=l-1;j>=0;j--)
        {
            if(l-j<=8)
            {
                resultCollection=document.createElement('div');
                resultCollection.innerText=(l-j)+") "+arr1[j].expression+" = "+arr1[j].result;
                ob2.appendChild(resultCollection);
            }
            else
            {
                c1=j;
                break;
            }
        }
        arr1=arr1.slice(c1+1,l);
        fetch('http://localhost:8383',
        {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify
            (
                {
                elements:arr1
                }
            )
        })
        ob.appendChild(ob2);
    }
}

let result=document.getElementById("eql");
result.addEventListener('click',()=>
{   
    let d;   
    calc(box);
    
})

let clearbox=document.getElementById('clr');
clearbox.addEventListener('click',()=>
{
    box.value="";
})


let back=document.getElementById("bk");
back.addEventListener('click',()=>
{   
    let s1=box.value;
    let l1=s1.length;
    let str=s1.slice(0,l1-1);
    box.value=str;
})

let pr=document.body;

box.addEventListener('keypress',(e)=>
{   
    let rg4=/[i]/i;
    if(e.key=="c" || e.key=="C")
    {
        box.value="";
    }

    if(rg4.test(box.value))
    {   
        e.preventDefault();
    }

    if(e.key=="Enter" || e.key=="=")
    {   
        calc(box);
    }

    let rg=/[0-9\+\*\-\/\.]/;
    if(rg.test(e.key)==false)
    {   
        e.preventDefault();
    }
})

box.addEventListener('contextmenu',(e)=>
{
    e.preventDefault();
}
)

Array.from(arr).forEach((item)=>{
    if(item.innerText!="0")
    {
    box.addEventListener('keydown',(e)=>{
        if(e.key==item.innerText)
        {   
        item.style.boxShadow="-1px -2px 1px 1px grey";
        }
    })
    box.addEventListener('keyup',(e)=>{
        if(e.key==item.innerText)
        {
        item.style.boxShadow="0px 0px 0px grey";
        }
    })
}
})

box.addEventListener('keydown',(e)=>
{   
    if(e.keyCode==8)
    {
        back.style.boxShadow="-1px -2px 1px 1px grey";
    }
    if(e.key=="c" || e.key=="C")
    {
        clearbox.style.boxShadow="-1px -2px 1px 1px grey"; 
    }
    if(e.key=="=" || e.key=="Enter")
    {
        equalto.style.boxShadow="-1px -2.5px 1px 1px grey";
    }
    if(e.key=="0")
    {
        zr.style.boxShadow="-1.5px -2px 1px 1px grey";
    }
})

box.addEventListener('keyup',(e)=>
{
    if(e.keyCode==8)
    {
        back.style.boxShadow="0px 0px 0px 0px grey";
    }
    else if(e.key=="c" || e.key=="C")
    {
        clearbox.style.boxShadow="0px 0px 0px 0px grey"; 
    }
    else if(e.key=="=" || e.key=="Enter")
    {
        equalto.style.boxShadow="0px 0px 0px 0px grey";
    }
    else if(e.key=="0")
    {
        zr.style.boxShadow="0px 0px 0px 0px grey";
    }
})
