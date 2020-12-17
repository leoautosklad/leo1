// ==UserScript==
// @name         Bot for yandex2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getRandom(min,max){ //ОТ min до max не включая max
    return Math.floor(Math.random()*(max-min)+min);
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать барабанное шоу в москве","Барабанщики на свадьбу","Барабанщики на корпоратив"]
}
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let words = sites[site];
let word = words[getRandom(0,words.length)];

let Input = document.getElementById("text");
let btnK = document.getElementsByClassName("button mini-suggest__button button_theme_websearch")[0];

if (btnK!=undefined){
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(function(){
        Input.value = Input.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            btnK.click();
        }
    },1000);
}else if (location.hostname== "yandex.ru"){
    site = getCookie("site");
    let pageNum = document.querySelector("span.pager__item").innerText;
    let linkIsFound = false;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        link.removeAttribute("target");
        if(link.href.includes(site)){
            setTimeout(()=>{link.click();},1000);
            linkIsFound = true;
            break;
        }
    }
    if(!linkIsFound && pageNum<10){

        pageNum = document.querySelector("span.pager__item").innerText;
        setTimeout(()=>{
            document.getElementsByClassName('pager__item_kind_next')[0].click();},3000);
    }else if (!linkIsFound){
        location.href = "https://yandex.ru";
    }
}else{
    if(getRandom(1,11) > 8 ) setTimeout(()=>{location.href = "https://yandex.ru";},3000);
    let links = document.links;
    setInterval(()=>{
        let index = getRandom(0,links.length);
        let link = links[index];
        if (link.href.includes(location.hostname)){
            setTimeout(()=>{link.click();},3000);
        }
    },5000);
}
