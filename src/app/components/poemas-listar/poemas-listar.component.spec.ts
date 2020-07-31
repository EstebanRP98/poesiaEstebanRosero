import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoemasListarComponent } from './poemas-listar.component';

describe('PoemasListarComponent', () => {
  let component: PoemasListarComponent;
  let fixture: ComponentFixture<PoemasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoemasListarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoemasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
