import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = {
    email: '',
    password: '',
  };

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {}

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado: ${result}`); //ATENÇÃO NO ACENTO

      //Navega para a rota vazia novamente.
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }
}
