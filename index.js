const banco = document.querySelector("p.banco")
const referencia = document.querySelector("p#referencia")

const caixa = "8502231"
const bradesco = "63333"
const safra = "42297"

//funções de auxilio
function codigoInvalido(texto) {
    const regexLetrasEPontos = /[a-zA-Z.,;'"]/
    return regexLetrasEPontos.test(texto)
}

function alterarBanco(bancoBoleto){
    banco.classList.remove("bradesco")
    banco.classList.remove("caixa")
    banco.classList.remove("safra")
    if(bancoBoleto != null)
        banco.classList.add(bancoBoleto)
}

//formatar as referencias
function boletoCaixa(str){
    let referencia = str.slice(17,30)
    return referencia.replace(/40/g, '')
}

function boletoBradesco(str){
    let referencia = str.slice(11,23)
    return referencia.slice(0, 9) + referencia.slice(10);
}

function boletoSafra(str){
    return str.slice(21,30)
}

//função principal
function gerarReferencia(){
    let boleto = document.getElementById("boleto").value;
    boleto = boleto.replace(/\s/g, "");

    if(codigoInvalido(boleto)){
        referencia.innerHTML = "Código inválido. códigos de boleto não devem conter letras ou caracteres especiais"
        alterarBanco(null)
    } 
    else if(boleto.startsWith("1049") && boleto.slice(4,11) === caixa){
        referencia.innerHTML = "Referência: " + boletoCaixa(boleto)
        alterarBanco("caixa")
    }
    else if(boleto.startsWith("2379") && boleto.slice(25,30) === bradesco){
        referencia.innerHTML = "NSU: " + boletoBradesco(boleto)
        alterarBanco("bradesco")
    }
    else if(boleto.startsWith(safra)){
        referencia.innerHTML = "NSU: " + boletoSafra(boleto)
        alterarBanco("safra")
    }
    else {
        referencia.innerHTML = "O boleto não é de recebimento do mercado pago"
    }

}