import { Usuario } from '../../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-usuario-delete',
    templateUrl: './usuario-delete.component.html',
    styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

    usuario: Usuario = {
        id: null,
        nome: '',
        senha: '',
        empresa: {
            id: null,
            empresa_nome: ''
        },
        email: '',
        jwttoken: '',
        expireAt: 0
    }

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.usuarioService.readById(id).subscribe(usuario => {
            this.usuario = usuario;
        })
    }

    deleteUsuario(): void {
        if (this.usuario.nome === JSON.parse(localStorage.getItem('usuario')).nome) {
            this.usuarioService.showMessage2('Exclusão não autorizada:  usuário logado');
        } else {
            this.usuarioService.delete(this.usuario.id).subscribe(() => {
                this.router.navigate(['/manter_usuarios']);
                this.usuarioService.showMessage('Usuário excluído com sucesso!');
            })
        }
    }

    cancel(): void {
        this.router.navigate(['/manter_usuarios']);
    }

}
