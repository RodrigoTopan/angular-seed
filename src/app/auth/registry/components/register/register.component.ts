import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Register } from '../../models/register.model';
import { RegisterService } from '../../services/register.service';

export interface Bond {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;

  private bonds: any[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.generateForm();
    this.loadBonds();
  }

  loadBonds(){
    this.registerService.getBonds().subscribe(data => {
      this.bonds = data;
      console.log(this.bonds);
    },
      err => {
        const msg: string = 'Erro obtendo os tipos de público.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }

  generateForm() {
    this.form = this.fb.group({
      //Primeiro parâmetro seria o valor default pra ser exibido no formulário
      //O segundo parâmetro são os arrays de validações
      name: ['Rodrigo Garcia Topan Moreira', [Validators.required]],
      email: [
        'rodrigo.moreira0797@gmail.com',
        [Validators.required, Validators.email]
      ],
      password: ['teste123', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['teste123'],
      registry_id: ['123456', [Validators.minLength(6)]],
      registry_id_2: ['', [Validators.minLength(6)]],
      phone_number: ['11994213400'],
      cpf: ['48470576908', [Validators.required, Validators.minLength(11)]],
      full_adress: ['Rua General Euclides', [Validators.required]],
      adress_number: ['370', [Validators.required]],
      adress_complement: ['Casa', [Validators.required]],
      whatsapp_flag: ['0'],
      district: ['SP', [Validators.required]],
      city: ['SP', [Validators.required]],
      state: ['SP', [Validators.required]],
      postal_code: ['11700780', [Validators.required]],
      bond_id: ['1'],
      role_id: ['2']
    });
  }

  register() {
    //invalid é sempre true quando os validadores não são atendidos
    if (this.form.invalid) {
      this.snackBar.open('Dados inválidos', 'Erro', { duration: 5000 });
      return;
    }
    //Adicionando os dados válidos do formulário dentro da classe login
    const register: Register = this.form.value;
    //Conectando com API
    console.log('Conectando com API');
    /*
          Disparamos uma requisição para a API, nosso método retorna um observable, o qual quando receber alguma resposta
          deve retornar um subscribe, que nos permite ler os dados de retorno.
          Com a resposta retornando o token gerado pelo laravel, podemos armazenar o token localmente para que 
          após logado o usuário possa acessar as demais rotas
         */
    this.registerService.register(register).subscribe(
      //Caso sucesso
      data => {
        console.log(JSON.stringify(data));
        alert('Cadastrado com sucesso');
        this.router.navigate(['/']);
      },
      err => {
        console.log('Cadastro com erro', err);
        let msg: string =
          'Tente novamente em instantes ou nos contate em : (13) 99703-5994';
        if ((err['status'] = 401)) {
          msg = msg;
        }
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }
}
