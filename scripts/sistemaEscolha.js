function EscolhaOtima(todos) {
    let contador = 0
    for(let i = 0; i < todos.length; i++) {
        if(todos[i].corTopo()[0] == 0) continue
        for(let j = 0; j < todos.length; j++) {
            if(i == j || todos[j].corTopoDisponivel() == -1 ) continue
            
            if(todos[i].corTopo()[0] === todos[j].corTopoDisponivel()[0] || 
            todos[j].corTopoDisponivel()[0] === 0) {
                let iter = todos[j].receberCor(todos[i])
                todos[i].movimentos.push(`${i},${j}`)
                for(let h = 0; h < todos.length; h++) {
                    if(todos[h].corTopo()[0] == 0) continue

                    for(let k = 0; k < todos.length; k++) {
                        if(i == h || h == k || todos[k].corTopoDisponivel() == -1) continue

                        if(todos[h].corTopo()[0] == todos[k].corTopoDisponivel()[0]) {
                            contador++
                        }

                    }
                }
                
                todos[i].devolveCor(todos[j], iter)
                todos[i].movimentos.push(contador)
                contador = 0
            }

        }
    }
    
    let movimentos = []
    for(let i = 0; i < todos.length; i++) {
        for(let j = 0; j < todos[i].movimentos.length; j++) {
            movimentos.push(todos[i].movimentos[j])
        }
    }

    let movimentosOtimizados = movimentos.filter((elem) => {
        return typeof elem === 'string'
    }).map( (elem) => {
        let vidros = elem.split(',')
        let corTopoAntesVidro1 = todos[vidros[1]].corTopo()[0]
        let iter = todos[vidros[1]].receberCor(todos[vidros[0]])
        let corTopoDepoisVidro0 = todos[vidros[0]].corTopo()[0]
        todos[vidros[0]].devolveCor(todos[vidros[1]], iter)
        if(corTopoAntesVidro1 == corTopoDepoisVidro0) {
            return false
        }
        return elem
    }).filter((elem) => {
        return elem
    })

    let qualidadeMovimentos = movimentosOtimizados.map( (elem) => {
        let index = movimentos.indexOf(elem)
        return movimentos[index+1]
    })
    
    let maiorQualidade = Math.max(...qualidadeMovimentos)

    let movimentosOtimos = movimentos.filter((elem, i) => {
        return movimentos[i+1] == maiorQualidade
    })

    let depositores = []
    for(let i in movimentosOtimos) {
        let numeroVidros = movimentosOtimos[i].split(',')
        depositores.push(numeroVidros[0])
    }

    let maiorDepositor = Math.max(...depositores)

    let movimentoOtimo = movimentosOtimos[depositores.indexOf(`${maiorDepositor}`)]

    if(movimentoOtimo) {
        let vetorMovimentoOtimo = movimentoOtimo.split(',')
        let iter = todos[vetorMovimentoOtimo[1]].receberCor(todos[vetorMovimentoOtimo[0]])
        return [todos, vetorMovimentoOtimo, iter]
    }else {
        return [todos, 'none', 0]
    }
}

export {EscolhaOtima}