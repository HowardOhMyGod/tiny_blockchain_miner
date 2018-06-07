import Mine from '../components/mine.vue'
import Login from '../components/login.vue'
import Verify from '../components/verifyBlock.vue'
import Wallet from '../components/wallet.vue'


export const routes = [
    {
        'path': '/',
        redirect: {
            'path': '/mine'
        }
    },{
        'path': '/mine',
        component: Mine
    },{
        'path': '/wallet',
        component: Wallet
    },{
        'path': '/login',
        component: Login
    },{
        'path': '/register',
        component: Login

    },{
        'path': '/verify',
        component: Verify
    },{
        'path': "*",
        redirect: {
            'path': '/mine'
        }
    }
]
