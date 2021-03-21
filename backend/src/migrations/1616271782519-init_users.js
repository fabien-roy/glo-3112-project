"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_models_1 = require("../src/connect.models");
exports.up = (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield connect_models_1.Users.updateMany({ googleId: { $exists: false } }, { $set: { googleId: '' } });
    // TODO : Add rest of fields
    done();
});
exports.down = (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield connect_models_1.Users.collection.drop();
    done();
});
