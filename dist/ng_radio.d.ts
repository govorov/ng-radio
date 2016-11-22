import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
export declare class NgRadio {
    private _eventBus;
    private separator;
    constructor();
    keyMatch(key: any, wildcard: any): boolean;
    cast(key: string, data?: any): void;
    on<T>(key: string): Observable<T>;
}
