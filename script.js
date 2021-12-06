function addLink(){
    value = document.getElementById("input").value;
    if(value == ""){
        document.getElementById("input").classList.add("error");
    }
    else{
    jsonURL = 'https://api.shrtco.de/v2/shorten?url='+value+'/very/long/link.html';
    $.getJSON(jsonURL, function(data){
        long = JSON.parse(localStorage.getItem("long"));
        short = JSON.parse(localStorage.getItem("short"));
        long[long.length] = value;
        short[short.length] = data.result.short_link2;
        localStorage.setItem("long", JSON.stringify(long));
        localStorage.setItem("short", JSON.stringify(short));
        document.getElementById("link_container").innerHTML += '<div class="link_object"><p class="link_dark">'+value+'</p><div class="link_right"><p class="link_light">'+data.result.short_link2+'</p><button class="link_button" id="btn'+(long.length-1)+'" onclick=\'copy("'+data.result.short_link2+'","btn'+(long.length-1)+'")\'>Copy</button></div></div>';
    });
    }
}
function setup(){
    if (localStorage.getItem("isDefined") === null) {
        long = ["undefined"];
        short = ["undefined"];
        localStorage.setItem("long", JSON.stringify(long));
        localStorage.setItem("short", JSON.stringify(short));
        localStorage.setItem("isDefined", "defined");
    }
    else{
        long = JSON.parse(localStorage.getItem("long"));
        short = JSON.parse(localStorage.getItem("short"));
        for(i = 1; i < long.length; i++){
            document.getElementById("link_container").innerHTML += '<div class="link_object"><p class="link_dark">'+long[i]+'</p><div class="link_right"><p class="link_light">'+short[i]+'</p><button class="link_button" id="btn'+i+'" onclick=\'copy("'+short[i]+'","btn'+i+'")\'>Copy</button></div></div>';
        }
    }
}
function copy(short, id){
    navigator.clipboard.writeText(short);
    document.getElementById(id).innerHTML = "Copied!";
    document.getElementById(id).classList.add("copied");
    setTimeout(clearStyle, 1000, id);
}
function clearStyle(id){
    document.getElementById(id).classList.remove("copied");
    document.getElementById(id).innerHTML = "Copy";
}
function clearError(){
    document.getElementById("input").classList.remove("error");
}
