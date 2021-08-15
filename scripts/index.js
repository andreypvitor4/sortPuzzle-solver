import { Vidro } from '../modulos/moduloVidro.js'
import { EscolhaOtima } from './sistemaEscolha.js'
import { retornaBackground } from './retornaBackground.js'

let bag = {
    tutorial: true,
    corEscolhida: 0,
    todosOsVidros: [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ],

    historico: [],
    coresSalvas: [],
}

const boxCor = document.querySelectorAll('.cor')
boxCor.forEach( box => {
    box.addEventListener('click', () => {
        bag.corEscolhida = box.dataset.cor
    })
})

function bodyListener(e) {
    try {
        if(!!bag.tutorial) {
            document.querySelector('.tutorial1').style.display = 'none'
            document.querySelector('.tutorial2').style.visibility == 'visible'
        }
    
        boxCor.forEach(box => {
            if(e.target == box) {
                box.style.border = 'solid 3px red'
            }
            if(e.target != box && e.target.classList == 'cor'){
                box.style.border = 'solid 2px black'
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

document.body.addEventListener('click', bodyListener)

const boxVidro = document.querySelectorAll('.boxVidro')
boxVidro.forEach( (box, i) => {
    box.addEventListener('click', () => {
        let indiceI = Math.trunc(i/4)
        let indiceJ = i%4
        if( box.style.backgroundColor == retornaBackground(Number(bag.corEscolhida)) ) {
            box.style.backgroundColor = ''
            bag.todosOsVidros[indiceI][indiceJ] = 0
        }else {
            box.style.backgroundColor = retornaBackground(Number(bag.corEscolhida))
            bag.todosOsVidros[indiceI][indiceJ] = Number(bag.corEscolhida)
        }
    })
})

const proximo = document.querySelector('#proximo')
proximo.addEventListener('click', () => {
    if(bag.tutorial) {
        document.querySelector('.tutorial2').style.display == 'none'
        bag.tutorial = false
    }

    let coresEscolhidas = []
    for(let i in bag.todosOsVidros) {
        coresEscolhidas.push(new Vidro(bag.todosOsVidros[i]))
    }
    let [CoresMovimentadas, movimento, iter] = EscolhaOtima(coresEscolhidas)
    if(movimento !== 'none') {
        bag.historico.push([movimento, iter])
    
        boxVidro.forEach( (box, i) => {
            let indiceI = Math.trunc(i/4)
            let indiceJ = i%4
            box.style.backgroundColor = retornaBackground(Number(CoresMovimentadas[indiceI].cores[indiceJ]))
        })
    }
})

const anterior = document.querySelector('#anterior')
anterior.addEventListener('click', () => {

    if(!bag.historico[bag.historico.length - 1]) return

    let [movimento, iter] = bag.historico[bag.historico.length - 1]
    let vidrosAtuais = []
    for(let i in bag.todosOsVidros) {
        vidrosAtuais.push(new Vidro(bag.todosOsVidros[i]))
    }
    vidrosAtuais[movimento[0]].devolveCor(vidrosAtuais[movimento[1]], iter)

    boxVidro.forEach( (box, i) => {
        let indiceI = Math.trunc(i/4)
        let indiceJ = i%4
        box.style.backgroundColor = retornaBackground(Number(vidrosAtuais[indiceI].cores[indiceJ]))
    })

    for(let i in vidrosAtuais) {
        for(let j = 0; j < 4; j++) {
            bag.todosOsVidros[i][j] = vidrosAtuais[i].cores[j]
        }
    }

    bag.historico.pop()
})

const salvar = document.querySelector('#salvar')
salvar.addEventListener('click', () => {
    bag.coresSalvas = [ [], [], [], [], [], [], [], [], [], [] ]
    for(let i in bag.todosOsVidros) {
        for(let j = 0; j < 4; j++) {
            bag.coresSalvas[i][j] = bag.todosOsVidros[i][j]
        }
    }
})

const carregar = document.querySelector('#carregar')
carregar.addEventListener('click', () => {
    bag.historico = []
    boxVidro.forEach( (box, i) => {
        let indiceI = Math.trunc(i/4)
        let indiceJ = i%4
        box.style.backgroundColor = retornaBackground(Number(bag.coresSalvas[indiceI][indiceJ]))
        bag.todosOsVidros[indiceI][indiceJ] = bag.coresSalvas[indiceI][indiceJ]
    })
})