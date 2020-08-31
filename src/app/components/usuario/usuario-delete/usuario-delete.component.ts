import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Usuario } from './../usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

  usuario: Usuario

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.readById(id).subscribe(usuario => {
      this.usuario = usuario
    })
  }

  deleteProduct(): void {
    this.usuarioService.delete(this.usuario.idUsuario).subscribe(() => {
      this.router.navigate(['/manter_usuarios'])
    })
  }

  cancel(): void {
    this.router.navigate(['/manter_usuarios'])
  }

}
