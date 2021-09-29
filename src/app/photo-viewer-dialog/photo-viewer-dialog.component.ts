import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-photo-viewer-dialog',
  templateUrl: './photo-viewer-dialog.component.html',
  styleUrls: ['./photo-viewer-dialog.component.scss']
})
export class PhotoViewerDialogComponent implements OnInit {

  test = 0;
  imageUrl = '';
  imagePreview = {
    imageArray: '',
    leftPosition: ''
  };

  constructor(public dialogRef: MatDialogRef<PhotoViewerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.imagePreview.imageArray = this.data.imageArray;
    this.onClickPreview(this.data.imageUrl);
  }

  onClickPreview(imageUrl: string): void {
    this.imageUrl = imageUrl;
    const photoViewer = document.querySelector('.cdk-global-overlay-wrapper') as HTMLElement;
  }

}
