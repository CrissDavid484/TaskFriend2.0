import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl,
  })

  constructor(
    private firebaseSVc: FirebaseService,
    private utilsSvc: UtilsService 
  ) { }

  ngOnInit() {
    this.confirmPasswordValidator()
  }

  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ])
    this.form.controls.confirmPassword.updateValueAndValidity();

  }

  submit() {
    if (this.form.valid) {
      
 
      this.utilsSvc.presentLoading({ message: 'Registrando...' });
      this.firebaseSVc.signUp(this.form.value as user).then(async res => {
        console.log(res);
      
        await this.firebaseSVc.updateUser({ displayName: this.form.value.name})

        let user: user = {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email

        }
        this.utilsSvc.setElementInLocalStorage('user', user);
        this.utilsSvc.routerLink('/inicio');

        this.utilsSvc.dismissLoading();

        this.utilsSvc.presentToast({
          message: '¡Bienvenido a TaskFriend! ${user.name}',
          duration: 1500,
          color: 'success',
          icon: 'person-outline'
        })
      }, error => {
        this.utilsSvc.presentToast({
          message: error,
          duration: 5000,
          color: 'warning',
          icon: 'alert-circle-outline'
        })
        this.utilsSvc.dismissLoading();

        
      }
      )
    }
  }
}