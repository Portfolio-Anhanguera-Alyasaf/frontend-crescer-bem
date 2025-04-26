import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { ChildrenComponent } from './modules/children/children.component';
import { ConsultationsComponent } from './modules/consultations/consultations.component';
import { HomeComponent } from './modules/home/home.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { VaccinesComponent } from './modules/vaccines/vaccines.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: '', component: HomeComponent },
  {
    path: 'panel', component: LayoutComponent, canActivate: [authGuard], children: [
      {
        canActivate: [authGuard],
        path: 'filhos',
        component: ChildrenComponent,
      },
      {
        canActivate: [authGuard],
        path: 'consultas',
        component: ConsultationsComponent,
      },
      {
        canActivate: [authGuard],
        path: 'vacinas',
        component: VaccinesComponent,
      }
    ]
  }
];
