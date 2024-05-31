const body = document.querySelector('body')
const form = document.getElementById('form')
const imcResp = document.querySelector('#imc')
const resetBtn = document.querySelector('#resetBtn')

function calcularImc(peso, altura) {
  if (isNaN(peso) || isNaN(altura) || peso < 0 || altura < 0) {
    alert('Por favor, insira dados válidos')
    document.getElementById('peso').value = ''
    document.getElementById('altura').value = ''
    form.focus()
    return NaN
  }
  const alturaMetros = altura / 100
  const imc = peso / (alturaMetros * alturaMetros)
  return imc
}

function verificarCategoria(imc) {
  const categoria = document.createElement('span')

  if (imc < 18.5) {
    categoria.innerHTML = '<br/>Você está abaixo do peso!'
  } else if (imc < 24.9) {
    categoria.innerHTML = '<br/>Parabéns! Você está no peso ideal!'
  } else if (imc < 29.9) {
    categoria.innerHTML = '<br/>Cuidado, você está acima do peso!'
  } else if (imc < 34.9) {
    categoria.innerHTML = '<br/>Muito cuidado, você está com obesidade grau 1!'
  } else if (imc < 40) {
    categoria.innerHTML = '<br/>Muito cuidado, você está com obesidade grau 2!'
  } else {
    categoria.innerHTML = '<br/>Muito cuidado, você está com obesidade grau 3!'
  }
  return categoria
}

function mostrarResposta(resposta) {
  const elementoResposta = document.createElement('h3')
  elementoResposta.innerHTML = `Nome: ${resposta.nome} </br>Idade: ${resposta.idade}</br>IMC: ${resposta.imc}</br> ${resposta.categoria}`
  elementoResposta.className = 'resp'

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Deletar'
  deleteBtn.className = 'deleteBtn'
  elementoResposta.appendChild(deleteBtn)

  deleteBtn.addEventListener('click', () => {
    let imcDataArray = JSON.parse(localStorage.getItem('imcDataArray')) || []
    imcDataArray.pop()
    localStorage.setItem('imcDataArray', JSON.stringify(imcDataArray));
    elementoResposta.remove()
  })
  imcResp.appendChild(elementoResposta)
}


form.addEventListener('click', (ev) => {
  ev.preventDefault()

  const nome = document.getElementById('nome').value
  const idade = document.getElementById('idade').value
  const peso = Number(document.getElementById('peso').value)
  const altura = Number(document.getElementById('altura').value)

  const imc = calcularImc(peso, altura)


  if (isNaN(imc)) {
    return
  }

  const resposta = {
    nome,
    idade,
    imc: imc.toFixed(2),
    categoria: verificarCategoria(imc).innerHTML
  }

  let imcDataArray = JSON.parse(localStorage.getItem('imcDataArray')) || [];
  imcDataArray.push(resposta);
  localStorage.setItem('imcDataArray', JSON.stringify(imcDataArray));

  mostrarResposta(resposta)

  document.getElementById('nome').value = ''
  document.getElementById('idade').value = ''
  document.getElementById('peso').value = ''
  document.getElementById('altura').value = ''
})

resetBtn.addEventListener('click', () => {
  imcResp.innerHTML = ''
  localStorage.removeItem('imcDataArray')
})

window.addEventListener('load', () => {
  const dadosSalvos = JSON.parse(localStorage.getItem('imcDataArray')) || []
  dadosSalvos.forEach(mostrarResposta)
  if (dadosSalvos) {
    const resposta = JSON.parse(dadosSalvos)
    mostrarResposta(resposta)
  }
})

