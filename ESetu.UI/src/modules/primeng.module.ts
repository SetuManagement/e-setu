import { APP_INITIALIZER, NgModule } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
    primeConfig.ripple = true;
};

@NgModule({
    declarations: [],
    imports: [
        ButtonModule,
        RippleModule
    ],
    exports: [
        ButtonModule,
        RippleModule

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
