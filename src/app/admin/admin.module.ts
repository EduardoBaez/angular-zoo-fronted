// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule } from './admin-routing.module';

// Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';

//Guards
import { AdminGuard } from '../guards/admin.guard';

//Servicios
import { UserService } from '../services/user.service';
import { AnimalService } from '../services/animal.service';
import { UploadService } from '../services/upload.service';

// Pipes
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        ListComponent,
        EditComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AdminRoutingModule
    ],
    providers: [
        AdminGuard,
        UserService,
        AnimalService,
        UploadService
    ]
})

export class AdminModule {}