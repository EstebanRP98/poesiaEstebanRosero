import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearpoesiaPage } from './crearpoesia.page';

describe('CrearpoesiaPage', () => {
  let component: CrearpoesiaPage;
  let fixture: ComponentFixture<CrearpoesiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpoesiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearpoesiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
