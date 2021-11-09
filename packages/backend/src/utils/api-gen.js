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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ts = require("typescript");
var promises_1 = require("fs/promises");
var file_1 = require("./file");
var fs = require('fs');
var path = require('path');
var TYPE_MODULE = 'type';
var REQUEST_MAPPING = 'RequestMapping';
var MethodStrMapping = {
    'PostMapping': 'post',
    'GetMapping': 'get'
};
var typeOptions = '';
var rootPath = '';
var methods = [];
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var ControllerPath, cpath, filesList;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ControllerPath = '../Controller';
                    cpath = path.join(__dirname, ControllerPath);
                    filesList = [];
                    return [4 /*yield*/, (0, file_1.getAllFiles)(cpath, filesList)];
                case 1:
                    _a.sent();
                    filesList.forEach(function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                        var ori, oriCode, sourceFile, code, file;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    typeOptions = '';
                                    rootPath = '';
                                    methods = [];
                                    return [4 /*yield*/, (0, promises_1.readFile)(filePath + '.ts')];
                                case 1:
                                    ori = _a.sent();
                                    oriCode = ori.toString();
                                    sourceFile = ts.createSourceFile(filePath, oriCode, 99, true, 3);
                                    sourceFile.statements.forEach(function (statement) {
                                        switch (statement.kind) {
                                            case ts.SyntaxKind.ImportDeclaration:
                                                handleImportDeclaration(statement);
                                                break;
                                            case ts.SyntaxKind.ClassDeclaration:
                                                handleClassDeclaration(statement);
                                                break;
                                        }
                                    });
                                    code = generateCode(typeOptions, rootPath, methods);
                                    file = path.resolve(path.join(__dirname, '../../../frontend/src/api'), './test.ts');
                                    fs.writeFile(file, code, { encoding: 'utf8' }, function (err) { });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
})();
function handleImportDeclaration(statement) {
    var module = statement.moduleSpecifier.getText().slice(1, -1);
    if (module !== TYPE_MODULE)
        return;
    typeOptions = statement.getText();
}
function handleClassDeclaration(statement) {
    statement.decorators.forEach(function (decorator) { return handleClassDecorator(decorator); });
    statement.members.forEach(function (member) {
        if (member.kind === 167) {
            handleMethodDeclaration(member, methods);
        }
    });
}
function handleClassDecorator(_a) {
    var expression = _a.expression;
    if (expression.kind !== ts.SyntaxKind.CallExpression)
        return;
    var Ex = expression;
    if (Ex.expression.escapedText !== REQUEST_MAPPING)
        return;
    rootPath = Ex.arguments[0].getText().slice(1, -1);
}
function handleMethodDeclaration(statement, methods) {
    var obj = {
        method: '',
        path: '',
        name: '',
        params: [],
        returnType: ''
    };
    statement.decorators.forEach(function (decorator) { return handleMethodDecorator(decorator, obj); });
    obj.name = statement.name.getText();
    statement.parameters.forEach(function (param) { return handleMethodParameter(param, obj.params); });
    obj.returnType = statement.type.getText();
    methods.push(obj);
}
function handleMethodDecorator(_a, obj) {
    var expression = _a.expression;
    if (expression.kind !== ts.SyntaxKind.CallExpression)
        return;
    var Ex = expression;
    var methodStr = Ex.expression.getText();
    obj.method = MethodStrMapping[methodStr];
    obj.path = Ex.arguments[0].getText().slice(1, -1);
}
function handleMethodParameter(param, arr) {
    var obj = {
        name: '',
        type: '',
        kind: ''
    };
    obj.name = param.name.getText();
    obj.type = param.type.getText();
    obj.kind = param.decorators[0].expression.getText();
    arr.push(obj);
}
function generateCode(importStr, rootPath, methods) {
    var methodStr = [];
    methods.forEach(function (method) {
        var paramStr = [];
        var body = null;
        var params = null;
        method.params.forEach(function (param) {
            if (param.kind === 'RequestBody') {
                body = param;
            }
            else if (param.kind === 'RequestParam') {
                params = param;
            }
            paramStr.push(param.name + ": " + param.type);
        });
        methodStr.push("export async function " + method.name + "(" + paramStr.join(', ') + "):" + method.returnType + "{\n    return axios.request({\n        method: '" + method.method + "',\n        url: '" + (rootPath + method.path) + "',\n        " + (params ? "params: " + params.name + "," : '/* params */') + "\n        " + (body ? "data: " + body.name + "," : '/* body */') + "\n    });\n}");
    });
    return importStr + "\nimport axios from '../utils/axios'\n\n" + methodStr.join('\n\n');
}
