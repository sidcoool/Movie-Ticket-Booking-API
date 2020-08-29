// let currentTime = new Date();
// currentTime.getTime("13:30")

// console.log(currentTime.toLocaleTimeString({timeZone: 'Asia/Kolkata'}))

// let d = new Date().toLocaleTimeString()

// console.log(d)

// d = "11:23"
// let currentMins;

//     let i=0;
//     let hours = "";
//     let minutes = ""
//     while(d[i] != ':'){
//         hours = hours + d[i];
//         i++;
//     }

//     i++
//     while(d[i] != ':'){
//         minutes = minutes + d[i];
//         i++;
//     }

//     hours = Number(hours)
//     minutes = Number(minutes)


//     if(d[d.length - 2] === 'P'){
//         time = (hours+12)*60 + minutes
//     }
//     else{
//         time = hours*60 + minutes
//     }

    
//     console.log(time)


let d1 = new Date()
let d2 = new Date("2020-08-29 17:45")

console.log(d1.getHours(), d1.getMinutes())
// let diff = new Date(d2-d1)
let diff = d2-d1
// console.log(diff.getHours())
console.log(diff/(60*60*1000))
