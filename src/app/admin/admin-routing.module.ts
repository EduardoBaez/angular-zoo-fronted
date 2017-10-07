// Modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';

import { AdminGuard } from '../guards/admin.guard';
import { UserService } from '../services/user.service';

const adminRoutes: Routes = [
    { path: 'admin-panel', component: MainComponent, canActivate: [AdminGuard], children: [
        { path: '', redirectTo: 'listado', pathMatch: 'full' },
        { path: 'crear', component: AddComponent },
        { path: 'listado', component: ListComponent },
        { path: 'editar/:id', component: EditComponent },
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule {}