import Pointage from "../components/employee/pointage/Pointage";
import Signup from '../components/authentication/sign-up/Signup';
import Login from '../components/authentication/sign-in/Login';
import ReqLeave from '../components/employee/leave/ReqLeave';
import Home from "../components/home/Home"
import About from './../components/home/About';
import SuppHours from './../components/employee/heure-supp/SuppHours';
import Rapport from './../components/employee/rapport/Rapport';
import Profile from "../components/employee/profile/Profile";

export const publicRoutes = [
    {   
        exact:true,
        component:Login,
        path:'/login',
        shouldNotDisplayPublicRoute: true
    },
    {   
        exact:true,
        component:Signup,
        path:'/Signup',
        shouldNotDisplayPublicRoute: true
    },
  
]

export const privateRoutes = [
    {   exact:true,
        component:ReqLeave,
        path:'/ReqLeave'
    },
    {   exact:true,
        component:Pointage,
        path:'/Pointage'
    },
    {   exact:true,
        component:Home,
        path:'/Home'
    },
    {   exact:true,
        component:About,
        path:'/About'
    },
    {   exact:true,
        component:SuppHours,
        path:'/SuppHours'
    },
    {   exact:true,
        component:Rapport,
        path:'/Rapport'
    },
    {   exact:true,
        component:Profile,
        path:'/Profile'
    },

]