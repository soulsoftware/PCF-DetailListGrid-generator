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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const yosay_1 = __importDefault(require("yosay"));
const Generator = require("yeoman-generator");
const GENERATOR_NAME = 'generator-pcf-detaillist';
class SimpleGenerator extends Generator {
    constructor(args, options) {
        super(args, options);
        this._config = {};
        this.log(yosay_1.default(`Welcome to the ${chalk_1.default.red(GENERATOR_NAME)} generator!`));
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            // Have Yeoman greet the user.
            const prompts = [
                {
                    type: 'input',
                    name: 'componentName',
                    message: 'Give Me Component Name',
                }
            ];
            return this.prompt(prompts).then((props) => {
                // To access props later use this.props.someAnswer;
                console.log(props.componentName);
                this._config = props;
            });
        });
    }
    /**
     *
     */
    writing() {
        this.fs.copy(this.templatePath('DetailListGridTemplate'), this.destinationPath(this._config.componentName)
        // this.templatePath('dummyfile.txt'),
        // this.destinationPath('dummyfile.txt')
        );
    }
    install() {
        this.destinationRoot(this._config.componentName);
        this.installDependencies({ npm: true, bower: false });
    }
    end() {
    }
}
exports.default = SimpleGenerator;
;
