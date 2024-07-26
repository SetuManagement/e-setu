import { APP_INITIALIZER, NgModule } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
    primeConfig.ripple = true;
};

@NgModule({
    declarations: [],
    imports: [
        ButtonModule,
        RippleModule,
        SkeletonModule,
        DialogModule
    ],
    exports: [
        ButtonModule,
        RippleModule,
        SkeletonModule,
        DialogModule

    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAppFactory,
            deps: [PrimeNGConfig],
            multi: true,
        }
    ]
})
export class PrimeNgModule { }
