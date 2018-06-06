import Mine from '../components/mine.vue'
import Login from '../components/login.vue'
import Verify from '../components/verifyBlock.vue'


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
        'path': '/wallet'
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
