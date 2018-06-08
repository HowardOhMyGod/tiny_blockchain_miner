let domain;

if (process.env.NODE_ENV === 'production') {
    domain = 'http://blockchain_api:5000'
} else {
    domain = 'http://localhost:5000'
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                miner: vue.$route.query.miner,
                hash: vue.$route.query.hash,
                proof: vue.$route.query.proof
            })
        })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((e) => {
            reject(e)
        })
    })
}

export {client_mine, block_verify}
