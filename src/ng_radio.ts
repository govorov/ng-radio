import {Subject}    from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface RadioMessage {
  key:   string;
  data?: any;
}

export class NgRadio {
  private _eventBus: Subject<RadioMessage>;
  private separator = ':';

  constructor() {
    this._eventBus = new Subject<RadioMessage>();
  }


  keyMatch(key,wildcard){

      let w  = '*';
      let ww = '**';

      let partMatch = (wl,k)=>{
        let match = (wl === w) || (wl === k);
        return match;
      };

      let sep  = this.separator;
      let kArr = key.split(sep);
      let wArr = wildcard.split(sep);

      let kLen = kArr.length;
      let wLen = wArr.length;
      let max  = Math.max(kLen,wLen);

      for (let i = 0; i < max; i++){
        let cK = kArr[i];
        let cW = wArr[i];
        // '**' match all gragments
        if (cW == ww && (typeof cK !== 'undefined')){ return true; }
        // test if fragments match
        if (!partMatch(cW,cK)){
          return false;
        }
      }

      return true;
  }


  cast(key: string, data?: any) {
    if (typeof key !== 'string' || !key.length){
      throw 'Bad key. Please provide a string';
    }
    this._eventBus.next({key, data});
  }


  on<T>(key: string): Observable<T> {
    return this._eventBus.asObservable()
      .filter((event) => {
        return this.keyMatch(event.key,key);
      })
      .map(event => <T>event.data);
  }
}
