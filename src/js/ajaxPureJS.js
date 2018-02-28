// Variavel global que armazena o retorno da chamada AJAX
var retornoCallback = null;

// função "callback" que armazena na variavel global o retorno da chamada AJAX
function callbackFunction(xhttp) {  
    localStorage.setItem(retornoCallback,xhttp.responseText)    
}

// função com o parametro "callback" para fazer a chamada GET AJAX
function ajaxGetCallback(url, callbackFunc) {    
    var xhttp = new XMLHttpRequest();

    // Seta tipo de requisição e URL com os parâmetros
    xhttp.open("GET", url, true);

    xhttp.setRequestHeader("Content-type", "application/json");

    // Envia a requisição
    xhttp.send();

    // Cria um evento para receber o retorno.
    xhttp.onreadystatechange = function() {
    
        // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
        if (xhttp.readyState == 4 && xhttp.status == 200) {            
            callbackFunc(this); 
        }
    }
}

// função final a ser usada pelo usuário para fazer uma chamada GET AJAX apenas passando a URL
function ajaxGet(url)
{
    ajaxGetCallback(url, callbackFunction);     
    return localStorage.getItem(retornoCallback);    
}



function ajaxPostCallback(url, callbackFunc) {    
    var xhttp = new XMLHttpRequest();

    // Seta tipo de requisição: Post e a URL da API
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Seta paramêtros da requisição e envia a requisição
    xhttp.send("email=teste@teste.com");

    // Cria um evento para receber o retorno.
    xhttp.onreadystatechange = function() {
    
    // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callbackFunc(this);
            /* var data = xhttp.responseText;
            
        // Retorno do Ajax
            console.log(data);
            return data; */
        }
    }
}

function ajaxPost(url)
{
    ajaxPostCallback(url, callbackFunction);     
    return localStorage.getItem(retornoCallback);    
}