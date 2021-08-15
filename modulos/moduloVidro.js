class Vidro {
    constructor(cores) {
        this.cores = cores
        this.movimentos = []
    }

    corTopo() {
        for(let i in this.cores) {
            if(this.cores[i] != 0) {
                return [this.cores[i], i]
            }
        }
        return [0, this.cores.length - 1]
    }
    corTopoDisponivel() {
        if(this.cores[0] != 0) return -1
        for(let i in this.cores) {
            if(this.cores[i] != 0) {
                return [this.cores[i], i]
            }
        }
        return [0, this.cores.length - 1]
    }

    receberCor(vidro) {
        let vidroTopo = 0
        let iter = 0
        if(vidro == this) return
        do {
            iter++
            vidroTopo = vidro.cores[vidro.corTopo()[1]]
            vidro.cores[vidro.corTopo()[1]] = 0

            if(this.corTopoDisponivel()[0] != 0){
                this.cores[this.corTopoDisponivel()[1] - 1] = vidroTopo
            }else {
                this.cores[this.corTopoDisponivel()[1]] = vidroTopo
            }

        }while(this.corTopoDisponivel() != -1 && this.corTopoDisponivel()[0] == vidro.corTopo()[0])

        return iter
    }

    devolveCor(vidro, iter) {
        let vidroTopo = 0
        if(vidro == this) return
        for(let i = 0; i < iter; i++) {
            vidroTopo = vidro.cores[vidro.corTopo()[1]]
            vidro.cores[vidro.corTopo()[1]] = 0

            if(this.corTopoDisponivel()[0] != 0){
                this.cores[this.corTopoDisponivel()[1] - 1] = vidroTopo
            }else {
                this.cores[this.corTopoDisponivel()[1]] = vidroTopo
            }

        }
    }


}

export {Vidro}