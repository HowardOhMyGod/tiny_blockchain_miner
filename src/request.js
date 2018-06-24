const domain = process.env.DOMAIN
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function client_mine() {
    return new Promise((resolve, reject) => {
        fetch(`${domain}/client_mine`)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((e) => reject(e))
    })
}

function block_verify(vue) {
    return new Promise((resolve, reject) => {
        fetch(`${domain}/block_verify`, {
            method: 'post',
            headers,
            body: JSON.stringify({
                miner: vue.$route.query.miner,
                hash: vue.$route.query.hash,
                proof: vue.$route.query.proof
            })
        })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}

function get_wallet(address) {
    return new Promise((resolve, reject) => {
        fetch(`${domain}/wallet/transactions`, {
            method: 'post',
            headers,
            body: JSON.stringify({
                address
            })
        })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}

export {client_mine, block_verify, get_wallet}
