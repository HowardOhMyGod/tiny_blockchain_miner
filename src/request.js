const domain = process.env.DOMAIN
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function login(pid) {
    return new Promise((resolve, reject) => {
        fetch(`${domain}/login`, {
            method: 'post',
            headers,
            body: JSON.stringify({
                pid
            })
        })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}

function register(pid) {
    return new Promise((resolve, reject) => {
        fetch(`${domain}/new_wallet`, {
            method: 'post',
            headers,
            body: JSON.stringify({
                data: pid
            })
        })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
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

function transfer(wallet_address, amount, recipient) {
    return new Promise((resolve, reject) => {
        fetch(`${domain}/transfer`, {
            method: 'post',
            headers,
            body: JSON.stringify({
                wallet_address,
                amount,
                recipient
            })
        })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}

export {
    client_mine,
    block_verify,
    get_wallet,
    register,
    login,
    transfer
}
