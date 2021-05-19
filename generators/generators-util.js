"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonGenerator = exports.componentPrompts = exports.GENERATOR_NAME = void 0;
const yo = require("yeoman-generator");
const path = __importStar(require("path"));
const assert_1 = __importDefault(require("assert"));
exports.GENERATOR_NAME = 'generator-pcf-fluentui';
const validateName = (minLenght = 1) => {
    return (input) => {
        const len = input.trim().length;
        if (len >= minLenght)
            return true;
        return (len == 0) ?
            'please provide a name!' :
            `value must be at least of ${minLenght} chars`;
    };
};
exports.componentPrompts = [
    {
        name: 'PCF.Namespace',
        message: 'Component namespace:',
        validate: validateName(),
        default: 'PCFNamespace'
    },
    {
        name: 'PCF.Name',
        message: 'Component name:',
        validate: validateName()
    },
    {
        name: 'PCF.Description',
        message: 'Component description:',
        default: (answers) => `The ${answers.PCF.Name} Component`
    },
    {
        name: 'PCF.Publisher.UniqueName',
        message: 'Solution Publisher:',
        validate: validateName(4),
        default: 'Development'
    },
    {
        name: 'PCF.Publisher.Prefix',
        message: 'Solution Publisher Prefix:',
        validate: validateName(3),
        default: (answers) => `${answers.PCF.Publisher.UniqueName.substr(0, 3)}`
    },
    {
        name: 'PCF.Publisher.Description',
        message: 'Solution Publisher description:',
        default: (answers) => `The ${answers.PCF.Publisher.UniqueName} Publisher`
    },
];
class CommonGenerator extends yo {
    copyTemplateFromRoot(pcfconfig) {
        assert_1.default.ok(pcfconfig.Constructor && pcfconfig.Constructor.trim().length > 0, 'PCF.Constructor not set!');
        if (!pcfconfig.Version || pcfconfig.Version.trim().length == 0) {
            pcfconfig.Version = '1.0.0';
        }
        const root = this.sourceRoot();
        this.sourceRoot(path.join(root, '..', '..', 'app', 'templates'));
        const solutionTpl = path.join('Solution', 'Other', 'Solution.xml');
        this.fs.copyTpl(this.templatePath(solutionTpl), this.destinationPath(path.join(pcfconfig.Name, solutionTpl)), pcfconfig);
        const manifestTpl = path.join('src', 'ControlManifest.Input.xml');
        this.fs.copyTpl(this.templatePath(manifestTpl), this.destinationPath(path.join(pcfconfig.Name, manifestTpl)), pcfconfig);
        this.sourceRoot(root);
    }
}
exports.CommonGenerator = CommonGenerator;
