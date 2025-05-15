// resources/ts/global.d.ts
import axios from "axios";
import _ from "lodash"; // si también extiendes con lodash u otros

declare global {
    interface Window {
        axios: typeof axios;
        _: typeof _;
    }
}

export {}; // convierte este archivo en módulo
