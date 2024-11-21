import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service'; 

@Component({
  selector: 'app-agregar-actualizar-task',
  templateUrl: './agregar-actualizar-task.component.html',
  styleUrls: ['./agregar-actualizar-task.component.scss'],
})
export class AgregarActualizarTaskComponent  implements OnInit {

  @Input() task: Task;
   user = {} as user;

  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(4)]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
   this.user = this.utilsSvc.getElementFromLocalStorage('user')

   if(this.task){
    this.form.setValue(this.task);
    this.form.updateValueAndValidity();
   }
  }

}
