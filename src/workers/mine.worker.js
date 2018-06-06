import * as crypto from "crypto"

class Miner {
    constructor(last_hash, last_proof, proof){
        this.last_hash = last_hash
        this.last_proof = last_proof
        this.proof = proof
        this.hashes = proof
    }

    is_proof(hashStr){
        return hashStr.slice(0, 4) == "0000"
    }

    start() {
        let hashStr = ''
        let hash;

        while (true) {
            hash = crypto.createHash('sha256')
            hash.update(`${this.last_proof}${this.proof}${this.last_hash}`)
            hashStr = hash.digest('hex')

            if(this.is_proof(hashStr)) {
                self.postMessage({
                    "computedHashs": this.hashes,
                    "minedHash": hashStr,
                    "proof": this.proof
                })

                // terminate worker
                console.log('Find Hash!')
                break
            } else {
                this.hashes++;
                this.proof++;
                self.postMessage({
                    "computedHashs": this.hashes
                })
            }
        }
    }
}


onmessage = function(evt) {
    let last_hash = evt.data.last_hash
    let last_proof = evt.data.last_proof
    let proof = evt.data.proof

    let miner = new Miner(last_hash, last_proof, proof)
    console.log('Worker start!')
    console.log(evt.data)
    miner.start()
}
