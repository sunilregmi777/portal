// //public routes
// { path: '/login', isPublic: true, component: login },
// { path: '/forgot-password', isPublic: true },

// //authenticated routes
// { path: '/dashboard', component: dashboard }
import Dashboard from './pages/dashboard/Dashboard'
import AddDriver from './pages/driver/AddDriver'
import DriverList from './pages/driver/DriverList'
import AddRider from './pages/rider/AddRider'
import RiderList from './pages/rider/RiderList'

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "fa fa-home text-info",
        component: Dashboard
    }, {
        collapse: true,
        name: "Driver",
        state: "testCollapse",
        icon: "fa fa-car text-info",
        views: [
            {
                path: "/add-driver",
                miniName: "AD",
                name: "Add Driver",
                component: AddDriver,
            }, {
                path: "/driver-list",
                name: "Driver List",
                miniName: "DL",
                component: DriverList,
            }
        ]
    }, {
        collapse: true,
        name: "Rider",
        state: "test2Collapse",
        icon: "fa fa-motorcycle text-info",
        views: [
            {
                path: "/add-rider",
                name: "Add Rider",
                miniName: "AR",
                component: AddRider,
            }, {
                path: "/rider-list",
                name: "Rider List",
                miniName: "RL",
                component: RiderList,
            }
        ]
    }
]
export default routes;