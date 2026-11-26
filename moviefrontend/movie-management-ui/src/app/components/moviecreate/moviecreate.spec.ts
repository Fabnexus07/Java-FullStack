import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCreate } from './moviecreate';

describe('MovieCreate', () => {
  let component: MovieCreate;
  let fixture: ComponentFixture<MovieCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
