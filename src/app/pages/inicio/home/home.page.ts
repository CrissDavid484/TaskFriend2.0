import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AgregarActualizarTaskComponent } from 'src/app/compartido/componentes/agregar-actualizar-task/agregar-actualizar-task.component';
import { user } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


tasks: Task[] = []

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getTask();
  }

  getPercentage(task: Task){
    return this.utilsSvc.getPercentage(task);
  }

  addOrUpdateTask(task?: Task){
    this.utilsSvc.presentModal({
      component: AgregarActualizarTaskComponent,
      componentProps: { task },
      cssClass:'add-update-modal'
    });
  }

  getTask(){
  let user: user = this.utilsSvc.getElementFromLocalStorage('user');
  let path = `users/${user.uid}`;
  
  let sub = this.firebaseSvc.getSubcollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        console.log();
        this.tasks = res;
        sub.unsubscribe();
      }
    })
  }

}
