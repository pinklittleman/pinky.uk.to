let lightstatus = false
let onoff = 2
let bulb = document.getElementById('bulb')
let lswitch = document.getElementById('lswitch')
let onlyonce
let int12

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

function randomNumber(min, max) {  
    return Math.random() * (max - min) + min; 
}

async function lightstart(){
    onoff++
    if(onoff % 2){
        bulb.style.visibility = 'visible'
        clearInterval(int12)
        lswitch.style.rotate = '180deg'
        onlyonce = 0
        lightstatus = true
        // if(onlyonce < 1){
            for (let i = 0; i <= 350; i++) {
                // await sleep(0.001)
                console.log(i)
                bulb.style.boxShadow = `0 0 920px ${i}px rgb(255,255,255)`
                bulb.style.backgroundColor = 'white'
                if (i === 350) {
                    console.log('new loop')
                    for(let b = 0; b <= 350; b++){
                        await sleep(randomNumber(100,200))
                        ran = Math.floor(randomNumber(447,450))
                        bulb.style.boxShadow = `0 0 920px ${ran}px rgb(255,255,255)`
                        if(b => 1000){
                            b = 0
                        }
                    }
                }
            }
        // }
    }
    else{
        lightstatus = false
        bulb.style.boxShadow = `0 0 0px 0px rgb(0,0,0)`
        lswitch.style.rotate = '0deg'
        bulb.style.visibility = 'hidden'
        i = 0
    }
}
