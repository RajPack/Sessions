import { executionQueue } from "./utils";
import * as one from './1_observables';


document.addEventListener('DOMContentLoaded', () => {
    for (var fn of executionQueue) {
        fn();
    }
});