import Pointage from "../components/employee/pointage/Pointage";
import Signup from '../components/authentication/sign-up/Signup';
import Login from '../components/authentication/sign-in/Login';
import ReqLeave from '../components/employee/leave/ReqLeave';
import Home from "../components/home/Home"
import About from './../components/home/About';
import SuppHours from './../components/employee/heure-supp/SuppHours';
import Rapport from './../components/employee/rapport/Rapport';
import Profile from "../components/employee/profile/Profile";
import InsertPointage from "../components/admin/pointage/InsertPointage";
import AdminSignin from "../components/authentication/admin/Admin-signin";
import Promotion from "../components/admin/promotion/Promotion";
import Sanction from "../components/admin/sanction/Sanction";
import ApplySuppHours from "../components/admin/supphours/ApplySuppHours";
import ApplyLeave from "../components/admin/leave-management/ApplyLeave";
import Mission from "../components/admin/mission/Mission";
import Mutation from "../components/admin/mutation/Mutation";

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
    {   exact:true,
        component:Home,
        path:'/',
        shouldNotDisplayPublicRoute: true
    },
    {   exact:true,
        component:About,
        path:'/About',
        shouldNotDisplayPublicRoute: true
    },
  
    {   exact:true,
        component:AdminSignin,
        path:'/admin-signin',
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
export const adminRoutes = [
    {   exact:true,
        component:InsertPointage,
        path:'/admin'
    },
    {   exact:true,
        component:Promotion,
        path:'/admin/promotion'
    },
    {   exact:true,
        component:ApplyLeave,
        path:'/admin/requests'
    },
    {   exact:true,
        component:ApplySuppHours,
        path:'/admin/supphours'
    },
    {   exact:true,
        component:Sanction,
        path:'/admin/sanction'
    },
    {   exact:true,
        component:Mission,
        path:'/admin/mission'
    },
    {   exact:true,
        component:Mutation,
        path:'/admin/mutation'
    },
]