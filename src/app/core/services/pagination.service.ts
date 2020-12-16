import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
    public pageSize = 6;
    public pageIndex = 0;
}
