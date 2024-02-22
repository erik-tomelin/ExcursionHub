import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, NgFor, TitleCasePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';

@Component({
    selector: 'cards',
    templateUrl: './cards.component.html',
    styles: [
        `
            cards fuse-card {
                margin: 16px;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonToggleModule, FormsModule, NgFor, FuseCardComponent, MatButtonModule, MatIconModule, RouterLink, NgClass, MatMenuModule, MatCheckboxModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, TextFieldModule, MatDividerModule, MatTooltipModule, TitleCasePipe],
})
export class CardsComponent implements AfterViewInit {
    @ViewChildren(FuseCardComponent, { read: ElementRef }) private _fuseCards: QueryList<ElementRef>;

    filters: string[] = ['all', 'article', 'listing', 'list', 'info', 'shopping', 'pricing', 'testimonial', 'post', 'interactive'];
    numberOfCards: any = {};
    selectedFilter: string = 'all';

    constructor(private _renderer2: Renderer2) {
    }

    ngAfterViewInit(): void {
        this._calcNumberOfCards();

        this._filterCards();
    }

    onFilterChange(change: MatButtonToggleChange): void {
        this.selectedFilter = change.value;

        this._filterCards();
    }

    private _calcNumberOfCards(): void {
        this.numberOfCards = {};

        let count = 0;

        this.filters.forEach((filter) => {
            if (filter === 'all') {
                count = this._fuseCards.length;
            }
            else {
                count = this.numberOfCards[filter] = this._fuseCards.filter(fuseCard => fuseCard.nativeElement.classList.contains('filter-' + filter)).length;
            }

            this.numberOfCards[filter] = count;
        });
    }

    private _filterCards(): void {
        this._fuseCards.forEach((fuseCard) => {
            if (this.selectedFilter === 'all') {
                fuseCard.nativeElement.classList.remove('hidden');
            }
            else {
                if (fuseCard.nativeElement.classList.contains('filter-' + this.selectedFilter)) {
                    fuseCard.nativeElement.classList.remove('hidden');
                }
                else {
                    fuseCard.nativeElement.classList.add('hidden');
                }
            }
        });
    }
}
