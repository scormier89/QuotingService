import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteComponent } from './quote.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteComponent],
      imports: [HttpClientModule, FormsModule],
    });
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
