import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ChildrenResponseDto } from '../../models/responses/children.response.dto';
import { ChildrenService } from '../../services/children.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CreateChildrenComponent } from './create-children/create-children.component';
import { UpdateChildrenComponent } from './update-children/update-children.component';

@Component({
  selector: 'children-component',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatDialogModule, MatButtonModule, MatTableModule, MatIconModule, DatePipe],
  templateUrl: './children.component.html',
  styleUrl: './children.component.scss'
})
export class ChildrenComponent implements OnInit {
  childrenService: ChildrenService = inject(ChildrenService);
  snackbarService: SnackbarService = inject(SnackbarService);

  children: Array<ChildrenResponseDto> = [];

  displayedColumns: string[] = ['name', 'birthday', 'weight', 'height', 'actions'];

  page: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(
    private dialog: MatDialog,
    private dialogUpdate: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllChildren();
  }

  getAllChildren(): void {
    this.childrenService.getAll(this.page, this.pageSize).subscribe({
      next: (value) => {
        if (value) {
          this.children = value.data;
          this.page = value.pagination.page;
          this.pageSize = value.pagination.pageSize;
          this.totalElements = value.pagination.totalElements;
        }
      },
      error: (err) => console.error(err),
    });
  }

  loadPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllChildren();
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(CreateChildrenComponent, {
      width: '700px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.snackbarService.show("Adicionado com sucesso!", "success");
        this.getAllChildren();
      },
      error: (err) => this.snackbarService.show("Ops! Ocorreu um erro!", "error"),
    });
  }

  editChild(children: ChildrenResponseDto) {
    const dialogRef = this.dialogUpdate.open(UpdateChildrenComponent, {
      width: '700px',
      height: '500px',
      data: children,
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.snackbarService.show("Editado com sucesso!", "success");
        this.getAllChildren();
      },
      error: (err) => this.snackbarService.show("Ops! Ocorreu um erro!", "error"),
    });
  }

  deleteChild(id: string) {
    this.childrenService.delete(id).subscribe({
      next: () => {
        this.snackbarService.show("Deletado com sucesso!", "success");
        this.getAllChildren();
      },
      error: (err) => this.snackbarService.show("Ops! Ocorreu um erro!", "error"),
    })
  }

  applyVaccine(id: string) {
    this.childrenService.applyVaccine(id).subscribe({
      next: () => {
        this.snackbarService.show("Vacina aplicada com sucesso!", "success");
        this.getAllChildren();
      },
      error: (err) => this.snackbarService.show("Ops! Ocorreu um erro!", "error"),
    })
  }
}
