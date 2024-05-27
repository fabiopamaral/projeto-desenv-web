const body = document.querySelector('body')
const form = document.getElementById('form')
const imcResp = document.querySelector('#imc')
const resetBtn = document.getElementById('resetBtn') // Corrigido o seletor

form.addEventListener('click', (ev) => {
  ev.preventDefault()

  const nome = document.getElementById('nome').value
  const idade = document.getElementById('idade').value
  const peso = Number(document.getElementById('peso').value)
  const altura = Number(document.getElementById('altura').value)

  const imc = calcularImc(peso, altura)

  const resposta = document.createElement('h3')

  if (isNaN(imc)) {
    return
  }

  resposta.innerHTML = `Nome: ${nome} <br/>Idade: ${idade}</br>IMC: ${imc.toFixed(2)}`
  resposta.className = 'resp'

  imcResp.classList.add('#imcResp')

  const categoria = verificarCategoria(imc)
  resposta.appendChild(categoria)
  imcResp.appendChild(resposta)
})

resetBtn.addEventListener('click', () => {
  form.reset()
  imcResp.innerHTML = '' // Limpa a resposta
})

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
  categoria.className = 'cat'

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
