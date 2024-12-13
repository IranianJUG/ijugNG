import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {LoginService} from '../../services/login.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputOtp} from "primeng/inputotp";
import {PrimeTemplate} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputOtp,
    PrimeTemplate
  ]
})
export class LoginComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  userToken= '';
  isOTPRequesting: boolean = false;
  otpTimer:number =0;
  phoneForm = new FormGroup({
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern("^[0-9]*$"),
    ]),
  });

  otpForm = new FormGroup({
    otp: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern("^[0-9]*$"),
    ]),
  });

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.userToken = token ? token : '';
  }

  closeModal(): void {
    this.close.emit();
  }

  setCountDown(){
    if(this.otpTimer>0){
      this.otpTimer--;
      setTimeout(()=>{
        this.setCountDown();
      },1000)
    }else{
      this.otpTimer = 0
    }
  }

  protected requestLogin(): void {
    if (this.phoneForm.valid) {
      if (!this.isOTPRequesting) {
        const phone = this.phoneForm.get('phone')?.value;
        if (!phone) return;
        this.loginService.requestOTP(phone).subscribe(res => {
          if (res.success) {
            this.isOTPRequesting = true;
            this.otpTimer = 60;
            this.setCountDown()
          }
        })
      }
    }
    if (this.isOTPRequesting) {
      if (this.otpForm.valid) {
        const phone = this.phoneForm.get('phone')?.value;
        if (!phone) return;
        const otp = this.otpForm.get('otp')?.value;
        if (!otp) return;
        this.loginService.verifyOTP(phone, otp).subscribe(res => {
          if (res.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            this.closeModal();
            document.location.reload();
          }
        })
      }
    }

  }
}
