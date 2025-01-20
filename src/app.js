let accessURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/"
let selection = document.querySelector("#tocountry");
let firstflag=document.querySelector(".fromflag")
let lastflag=document.querySelector(".toflag")
let button=document.querySelector("#btn");
let to=document.querySelector(".tocontainer select")
let result=document.querySelector("#output");
let ratebox=document.querySelector("#rate");
let amount=document.querySelector('.amountcontainer input')
let amountmssg=document.querySelector('.amountcontainer p')
let firstselection=document.querySelector("#fromcountry");
let reverse=document.querySelector(".reverse");
let turn=true;


const firstselectionsfunction=()=>{
    for(let allList in countryList){
        let options= document.createElement("option");
        options.innerText= allList;
        options.value=allList;
        firstselection.append(options);
        if (allList==='USD') options.selected='selected'
    }
}
const lastselectionsfunction=()=>{
    for(let allList in countryList){
        let options= document.createElement("option");
        options.innerText= allList;
        options.value=allList;
        selection.append(options);
        if(allList==='NPR') options.selected='selected'
    }
}

const selectionfunction=()=>{
    firstselectionsfunction()
    lastselectionsfunction()
}


window.addEventListener("load",async(e)=>{
    selectionfunction()
    calculation()

    firstselection.addEventListener('change',(e)=>{
        firstchangeflag(e.target.value)
        calculation()
    })
    
    selection.addEventListener('change',(e)=>{
        lastchangeflag(e.target.value )
        calculation()
    })
    
    amount.addEventListener('input',calculation)

})

const firstchangeflag=(a)=>{
    let country=countryList[a]
    firstflag.src=`https://flagsapi.com/${country}/flat/64.png`
}
const lastchangeflag=(a)=>{
    let country=countryList[a]
    lastflag.src=`https://flagsapi.com/${country}/flat/64.png`
}

const calculation= async(e)=>{
let first=firstselection.value.toLowerCase()
let second=selection.value.toLowerCase()
let url=`${accessURL}${first}.json`
let response= await fetch(url)
let data=await response.json();
let rate=data[first][second]
let amt=amount.value
let conversion=(amt*rate).toFixed(2)
result.innerText=conversion;
amountmssg.innerText=`Enter Amount [${first.toUpperCase()}]`
ratebox.innerText=`1 ${first.toUpperCase()} = ${rate} ${second.toUpperCase()}`
}





const reversefunction=(e)=>{
    e.preventDefault()
    let temporary
    temporary=selection.value
    selection.value=firstselection.value
    firstselection.value=temporary
    firstflag.src=`https://flagsapi.com/${countryList[firstselection.value]}/flat/64.png`
    lastflag.src=`https://flagsapi.com/${countryList[selection.value]}/flat/64.png`
    calculation()
}
reverse.addEventListener('click',reversefunction)
