import { Component } from '@angular/core';
import { QuoteService, QuoteResult } from '../quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
})
export class QuoteComponent {
  term = 20;
  sumInsured = 100000;
  quotes: QuoteResult[] = [];

  constructor(private quoteService: QuoteService) {}

  submitQuote() {
    this.quoteService.createQuote({ term: this.term, sumInsured: this.sumInsured }).subscribe(response => {
      this.quoteService.getQuote(response.id).subscribe(result => {
        this.quotes.unshift(result); // latest on top
      });
    });
  }
}
