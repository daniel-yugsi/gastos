import { Routes } from '@angular/router';
import { Home } from '../components/home/home';
import { Calculadora } from '../components/calculadora/calculadora';
import { Historialgasto} from '../components/historialgasto/historialgasto';
import { Registrogastos } from '../components/registrogastos/registrogastos';
import { Login } from '../components/login/login';
import { Registro } from '../components/registro/registro';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'calculadora',
        component: Calculadora
    },
    {
        path: 'historialgasto',
        component: Historialgasto
    },
    {
        path: 'registrogastos',
        component: Registrogastos
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'registro',
        component: Registro
     }
];
