import { ComponentFixture, TestBed } from '@angular/core/testing'; //testfile
import { PostsCreateComponent } from './posts-create.component';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedMaterialDesignModule } from '../../module/shared-material-design/shared-material-design.module';

describe('PostsCreateComponent', () => {
  let component: PostsCreateComponent;
  let fixture: ComponentFixture<PostsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SharedMaterialDesignModule],
      declarations: [PostsCreateComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
