import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  //[x: string]: any;
  account = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {}

  async onSubmit() {
    try {
      const result = await this.accountService.createAccount(this.account);

      ////////////////////////////////////////
      // Exibir algo para o usuário aqui!!! //
      ////////////////////////////////////////

      this.router.navigate(['']);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
