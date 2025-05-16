import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

export interface QuoteRequest {
  term: number;
  sumInsured: number;
}

export interface PremiumQuote {
  companyCode: string;
  premium: number;
}

export interface QuoteResult {
  id: string;
  term: number;
  sumInsured: number;
  premiums: PremiumQuote[];
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = `${environment.apiUrl}/quote`;

  constructor(private http: HttpClient) {}

  createQuote(req: QuoteRequest): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, req);
  }

  getQuote(id: string): Observable<QuoteResult> {
    return this.http.get<QuoteResult>(`${this.apiUrl}/${id}`);
  }
}
