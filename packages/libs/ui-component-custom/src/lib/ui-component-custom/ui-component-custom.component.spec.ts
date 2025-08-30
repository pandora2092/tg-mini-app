import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiComponentCustomComponent } from './ui-component-custom.component';

describe('UiComponentCustomComponent', () => {
  let component: UiComponentCustomComponent;
  let fixture: ComponentFixture<UiComponentCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiComponentCustomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiComponentCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
