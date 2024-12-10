import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.close.emit();
  }

  protected requestLogin(): void {
    // this.loginService
    //   .makeLoginRequest('0081042019', 'testt')
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }
}
