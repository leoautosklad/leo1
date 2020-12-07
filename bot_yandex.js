// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Leo
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==


function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

let yandexInput = document.getElementsByName("text")[0];
let button = document.getElementsByClassName("i-bem button_js_inited")[0]; //Кнопка поиска в Google
let words = ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"];
let word = words[getRandom(0,words.length)];
if (button!=undefined){ 
    let i = 0;
    let timerId = setInterval(function(){
        yandexInput.value = yandexInput.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            button.click();
        }
    },600);
}else{
    let pageNum = document.querySelector("[aria-label^='Страница 5']");
    let linkIsFound = false;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")){
            setTimeout(()=>{link.click();},600);
            linkIsFound = true;
            break;
        }
    }
    if(!linkIsFound && pageNum<5){
        setTimeout(()=>{pnnext.click();},600)
    }else if (!linkIsFound){
        location.href = "https://www.yandex.ru/";
    }
}
