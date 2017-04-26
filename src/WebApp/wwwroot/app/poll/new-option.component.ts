import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    //moduleId: module.id,
    selector: 'new-option',
    template: `<div [formGroup]="optionForm">
    <div class="form-group">
        <p class="control"><input type="text" class="form-control input" formControlName="text"></p>
    </div>
</div>`,
})
export class NewOptionComponent {
    @Input('group')
    public optionForm: FormGroup;
}