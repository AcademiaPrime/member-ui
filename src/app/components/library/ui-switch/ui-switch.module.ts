import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UI_SWITCH_OPTIONS } from './ui-switch.token';
import { UiSwitchModuleConfig } from './ui-switch.config';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule],
    exports: [FormsModule,],
})
export class UiSwitchModule {
    static forRoot(
        config: UiSwitchModuleConfig | null | undefined
    ): ModuleWithProviders<UiSwitchModule> {
        console.log('config');
        return {
            ngModule: UiSwitchModule,
            providers: [{ provide: UI_SWITCH_OPTIONS, useValue: config || {} }],
        };
    }
}
