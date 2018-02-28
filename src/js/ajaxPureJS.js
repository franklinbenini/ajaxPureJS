/* Função para fazer a chamada GET AJAX. 
   Devido a resposta ser Assíncrona (ASYNC), só retorna o valor quando a consulta estiver pronta.
   Por isso precisa de uma função callback passada como parâmetro para "imprimir" o resultado
   Ex.: 
        function callbackFunction(xhttp) {          
            document.getElementById("divTeste").innerHTML += "GET: </br>" + xhttp.responseText;
        }
        
        ajaxGet(url, callbackFunction);
*/
function ajaxGet(url, callbackFunc) {    
    var xhttp = new XMLHttpRequest();    
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();    
    xhttp.onreadystatechange = function() {            
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callbackFunc(this); 
        }
    }
}

function ajaxPost(url, callbackFunc) {    
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

function carregaDadosTabelaAjax(url)
{
    var data = ajaxGet(url, callbackCarregaTabela);    
}

// Exemplo de callback para uma tabela.
// Deve ser alterado para corresponder ao "desenho" de cada tabela
function callbackCarregaTabela(xhttp) {
    var data = JSON.parse(xhttp.responseText);  
    var tmp = ""
    for (x in data) {
        tmp += "<tr><td>" + data[x].id + "</td>"
        tmp += "<td>" + data[x].title + "</td>"
        tmp += "</tr>";
    }
    document.getElementById("tabelaTeste").getElementsByTagName("tbody")[0].innerHTML = tmp;
}