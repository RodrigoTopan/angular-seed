import { Component, OnInit } from '@angular/core';
/**
 * FormBuilder => Ajuda a criar o mapeamento do forms
 * FormGroup => Agrupa Componentes
 * Validators => Valida entrada de dados como email, tamanho, required
 * Router=> redirecionamento para outro componente de login,
 * MatsnackBar => exibe mensagens de erro e de sucesso
 */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from '../../models/user.model';

//Import model
import { Login } from '../../models/login.model';
//Import Service
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private user: User;
  constructor(
    private fb: FormBuilder, //Importando os recursos para o componente
    private snackbar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    //Método responsável por criar o formulário na instância do objeto
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      //Primeiro parâmetro seria o valor default pra ser exibido no formulário
      //O segundo parâmetro são os arrays de validações
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    //invalid é sempre true quando os validadores não são atendidos
    if (this.form.invalid) {
      this.snackbar.open('Dados inválidos', 'Erro', { duration: 5000 });
      return;
    }
    //Adicionando os dados válidos do formulário dentro da classe login
    const login: Login = this.form.value;
    //Conectando com API
    console.log('Conectando com API');
    /*
      Disparamos uma requisição para a API, nosso método retorna um observable, o qual quando receber alguma resposta
      deve retornar um subscribe, que nos permite ler os dados de retorno.
      Com a resposta retornando o token gerado pelo laravel, podemos armazenar o token localmente para que 
      após logado o usuário possa acessar as demais rotas
     */
    this.loginService.login(login).subscribe(
      //Caso sucesso
      data => {
        console.log(JSON.stringify(data));
        // localStorage['token'] =
        this.user = data['data'];
        console.log('NOME DO USUÁRIO', data['data']['user']['name']);
        console.log('USUARIO', this.user);
        localStorage.setItem('token', data['data']['token']);
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log('STORAGE', localStorage);
        const userData = JSON.parse(localStorage['user']);
        console.log('Dados do usuario', JSON.stringify(userData));
        // if (userData['profile'] == '1') {
        if (userData['user']['id']) {
          const access_string = localStorage.getItem('user');
          const access_obj = JSON.parse(access_string);
          if (access_obj.user.role_id == 1) {
            alert('Bem vindo, administrador');
            this.router.navigate(['/admin/dashboard']);
          }else{
            alert('Bem vindo ao SEEDUC');
            this.router.navigate(['/public/feed']);
          }
        }
      },
      err => {
        console.log('DEU RUIM NO LOGIN', err);
        let msg: string =
          'Tente novamente em instantes ou nos contate em : (13) 99703-5994';
        if ((err['status'] = 401)) {
          msg = 'Email/Senha inválido(s)';
        }
        this.snackbar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }

  logout() {
    localStorage['token'] = null;
  }
  
}
