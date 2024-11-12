import { Component, OnInit } from '@angular/core';
import { AlpacaService } from '../../data/alpaca.service';
import { MatDialog } from '@angular/material/dialog';
import { Alpaca } from '../../data/alpaca.interface';
import { AlpacaAddFormComponent } from '../../forms/alpaca/alpaca-add-form/alpaca-add-form/alpaca-add-form.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alpaca-list',
  templateUrl: './alpaca-list.component.html',
  styleUrl: './alpaca-list.component.scss',
})
export class AlpacaListComponent implements OnInit {
  alpacas: Alpaca[] = [];
  displayedColumns: string[] = ['name', 'sex', 'dob', 'status'];

  constructor(
    private alpacaService: AlpacaService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  loadAlpacas(): void {
    this.alpacaService.getAlpacas().subscribe((alpacas) => {
      this.alpacas = alpacas;
    });
  }
  goToAlpacaDetail(id: number): void {
    this.router.navigate([`/alpaca-detail`, id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlpacaAddFormComponent, {
      width: '99%',
    });

    dialogRef.afterClosed().subscribe((result: Alpaca | undefined) => {
      if (result) {
        this.loadAlpacas();
      }
    });
  }

  ngOnInit(): void {
    this.loadAlpacas();
  }
}
