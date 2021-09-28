import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoViewerDialogComponent } from './photo-viewer-dialog.component';

describe('PhotoViewerDialogComponent', () => {
  let component: PhotoViewerDialogComponent;
  let fixture: ComponentFixture<PhotoViewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoViewerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
