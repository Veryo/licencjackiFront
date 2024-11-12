import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlpacaService } from '../../data/alpaca.service';
import { Alpaca } from '../../data/alpaca.interface';
import { AlpacaEditFormComponent } from '../../forms/alpaca/alpaca-edit-form/alpaca-edit-form/alpaca-edit-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-alpaca-detail',
  templateUrl: './alpaca-detail.component.html',
  styleUrl: './alpaca-detail.component.scss',
})
export class AlpacaDetailComponent implements OnInit {
  alpacaId: number | undefined;
  alpaca: Alpaca | undefined;
  isWagaTabSelected = true;
  isMedicationTabSelected = false;
  isMedicationSavedTabSelected = false;

  onTabChange(event: MatTabChangeEvent) {
    this.isWagaTabSelected = event.tab.textLabel === 'Waga';
    this.isMedicationTabSelected = event.tab.textLabel === 'Medyczne';
    this.isMedicationSavedTabSelected =
      event.tab.textLabel === 'Zapisane Medyczne';
  }

  constructor(
    private route: ActivatedRoute,
    private alpacaService: AlpacaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  loadAlpaca(): void {
    if (this.alpacaId !== undefined) {
      this.alpacaService.getAlpacaById(this.alpacaId).subscribe((alpaca) => {
        this.alpaca = alpaca;
      });
    }
  }

  deleteAlpaca(): void {
    if (this.alpacaId !== undefined) {
      this.alpacaService.deleteAlpaca(this.alpacaId).subscribe(() => {
        this.snackBar.open('Alpaca deleted successfully!', 'Close', {
          duration: 2000,
        });
        this.router.navigate([`/alpaca-list`]);
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlpacaEditFormComponent, {
      width: '99%',
      data: this.alpaca,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAlpaca();
      }
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.alpacaId = params['id'];

      if (this.alpacaId !== undefined) {
        this.loadAlpaca();
      }
    });
  }
}
