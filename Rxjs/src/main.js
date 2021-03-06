import { executionQueue } from "./utils";
import * as one from './1_observables';
import * as two from './2_moreOperators';
import * as three from './3_castingAndSubjects';


document.addEventListener('DOMContentLoaded', () => {
    for (var fn of executionQueue) {
        fn();
    }
});
