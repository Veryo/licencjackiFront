import { Component,Input,OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { WeightAddFormComponent } from '../../../forms/weight/weight-add-form/weight-add-form.component';
import { WeightService } from '../../../data/weight.service';
import { Weight } from '../../../data/weight.interface';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WeightEditFormComponent } from '../../../forms/weight/weight-edit-form/weight-edit-form.component';
@Component({
  selector: 'app-alpaca-weight',
  templateUrl: './alpaca-weight.component.html',
  styleUrl: './alpaca-weight.component.scss'
})
export class AlpacaWeightComponent implements OnInit {
  weights: Weight[] = [];
  displayedColumns: string[] = [ 'current','change','date','menu'];
  @Input() alpacaId: number|undefined;

  constructor(public dialog: MatDialog, public weightServie : WeightService,private route: ActivatedRoute,private snackBar: MatSnackBar, private router: Router) { }

  loadWeights(): void {
    if(this.alpacaId){
    this.weightServie.getWeight(this.alpacaId).subscribe((weights) => {
      this.weights = weights;
    });
   
    }
  }

  deleteWeight(weightId:number): void {
    if (weightId  && this.alpacaId) {
        this.weightServie.deleteWeight(this.alpacaId,weightId).subscribe(() => {
          this.snackBar.open('Weight deleted successfully!', 'Close', { duration: 2000 });
          this.loadWeights();
        });
      
    }
  }

  ngOnInit(): void {
    this.loadWeights();
    console.log(this.weights)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WeightAddFormComponent, {
      width: '99%',
      data: { alpacaId: this.alpacaId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWeights();
      }
    });
    
  }

  openEditDialog(weight: Weight): void {
    const dialogRef = this.dialog.open(WeightEditFormComponent, {
      width: '99%',
      data: { alpacaId: this.alpacaId, weight:weight  }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadWeights();
      }
    });
    
  }
}
