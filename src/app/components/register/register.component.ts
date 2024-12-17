import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {InputOtp} from "primeng/inputotp";
import {PrimeTemplate} from "primeng/api";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputOtp,
    PrimeTemplate
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  userToken= '';
  isOTPRequesting: boolean = false;
  otpTimer:number =0;

  registerForm = new FormGroup({
    first_name:new FormControl<string>('', [
      Validators.required,
    ]),
    last_name:new FormControl<string>('', [
      Validators.required,
    ]),
    mobile:new FormControl<string>('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern("^[0-9]*$"),
    ]),
    email:new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    national_code:new FormControl<string>('', [
      Validators.required,
    ]),
    position:new FormControl<string>(''),
    company:new FormControl<string>('')
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

  ngOnInit() {
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

  requestRegister() {
    if (this.registerForm.valid) {
      this.loginService.register(this.registerForm.value).subscribe((res)=>{
          this.isOTPRequesting = true;
          this.otpTimer = 60;
          this.setCountDown()
      })
    }
  }

  protected requestLogin(): void {
    if (this.registerForm.valid) {
      if (!this.isOTPRequesting) {
        const phone = this.registerForm.get('mobile')?.value;
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
        const phone = this.registerForm.get('mobile')?.value;
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
