import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {PaginationService} from 'app/core/services/pagination.service';
import {IUserForm} from 'app/core/domain/IUserForm';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-user-forms',
    templateUrl: './user-forms.component.html',
    styleUrls: ['./user-forms.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormsComponent implements OnInit {

    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'address', 'gender', 'phoneNumber', 'createdDate'];

    userForms: IUserForm[] = this.route.snapshot.data['userForms'];
    dataSource = new MatTableDataSource<IUserForm>(this.userForms);
    public currentUserForms: IUserForm[];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        public paginationService: PaginationService
    ) {
    }

    ngOnInit() {
        this.updatePaginatorValues();
    }

    public setPhonesAndPaginationValues(event: PageEvent) {
        this.setPaginationValues(event);
        this.setCurrentUserForms(event);
    }

    private setPaginationValues(event: PageEvent) {
        this.paginationService.pageSize = event.pageSize;
        this.paginationService.pageIndex = event.pageIndex;
    }

    private setCurrentUserForms(event: PageEvent) {
        const endPoint = event.pageSize * (event.pageIndex + 1);
        const startPoint = endPoint - event.pageSize;
        this.currentUserForms = this.userForms.slice(startPoint, endPoint);
    }

    private updatePaginatorValues() {
        this.paginator.page.emit({
            pageSize: this.paginationService.pageSize,
            pageIndex: this.paginationService.pageIndex,
            length: this.userForms.length
        });
    }
}
