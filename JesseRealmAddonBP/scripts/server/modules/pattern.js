import { Server } from './../../library/Minecraft.js';
import { printLocation, placeBlock } from '../util.js';
import { Token } from './extern/tokenizr.js';
import { tokenize, throwTokenError, mergeTokens, parseBlock, parseBlockStates, processOps } from './parser.js';
export class Pattern {
    constructor(pattern = '') {
        this.stringObj = '';
        if (pattern) {
            const obj = Pattern.parseArgs([pattern]).result;
            this.block = obj.block;
            this.stringObj = obj.stringObj;
        }
    }
    setBlock(loc, dimension) {
        return this.block.setBlock(loc, dimension);
    }
    clear() {
        this.block = null;
        this.stringObj = '';
    }
    empty() {
        return this.block == null;
    }
    addBlock(block) {
        const states = new Map();
        block.getAllProperties().forEach(state => {
            if (!state.name.startsWith('wall_connection_type') && !state.name.startsWith('liquid_depth')) {
                states.set(state.name, state.value);
            }
        });
        if (this.block == null) {
            this.block = new ChainPattern(null);
        }
        this.block.nodes.push(new BlockPattern(null, {
            id: block.type.id,
            data: -1,
            states: states
        }));
        this.stringObj = '(picked)';
    }
    getBlockSummary() {
        let text = '';
        let blockMap = new Map();
        for (const pattern of this.block.nodes) {
            let sub = pattern.block.id.replace('minecraft:', '');
            for (const state of pattern.block.states) {
                const val = state[1];
                if (typeof val == 'string' && val != 'x' && val != 'y' && val != 'z') {
                    sub += `(${val})`;
                    break;
                }
            }
            if (blockMap.has(sub)) {
                blockMap.set(sub, blockMap.get(sub) + 1);
            }
            else {
                blockMap.set(sub, 1);
            }
        }
        let i = 0;
        for (const block of blockMap) {
            if (block[1] > 1) {
                text += `${block[1]}x ${block[0]}`;
            }
            else {
                text += block[0];
            }
            if (i < blockMap.size - 1)
                text += ', ';
            i++;
        }
        return text;
    }
    static parseArgs(args, index = 0) {
        const input = args[index];
        if (!input) {
            return { result: new Pattern(), argIndex: index + 1 };
        }
        const tokens = tokenize(input);
        let token;
        function processTokens(inBracket) {
            let ops = [];
            let out = [];
            const start = tokens.curr();
            function nodeToken() {
                return mergeTokens(token, tokens.curr(), input);
            }
            while (token = tokens.next()) {
                if (token.type == 'id') {
                    let block = parseBlock(tokens);
                    out.push(new BlockPattern(nodeToken(), block));
                }
                else if (token.type == 'number') {
                    const num = token;
                    const t = tokens.next();
                    if (t.type == 'percent') {
                        processOps(out, ops, new PercentPattern(nodeToken(), num.value));
                    }
                    else {
                        throwTokenError(t);
                    }
                }
                else if (token.type == 'comma') {
                    processOps(out, ops, new ChainPattern(token));
                }
                else if (token.type == 'caret') {
                    const t = tokens.next();
                    if (t.type == 'id') {
                        processOps(out, ops, new TypePattern(nodeToken(), t.value));
                    }
                    else if (t.value == '[') {
                        const states = parseBlockStates(tokens);
                        processOps(out, ops, new StatePattern(nodeToken(), states));
                    }
                    else {
                        throwTokenError(t);
                    }
                }
                else if (token.type == 'star') {
                    const t = tokens.next();
                    if (t.type != 'id') {
                        throwTokenError(t);
                    }
                    processOps(out, ops, new RandStatePattern(nodeToken(), t.value));
                }
                else if (token.type == 'bracket') {
                    if (token.value == '(') {
                        out.push(processTokens(true));
                    }
                    else if (token.value == ')') {
                        if (!inBracket) {
                            throwTokenError(token);
                        }
                        else {
                            processOps(out, ops);
                            break;
                        }
                    }
                    else {
                        throwTokenError(token);
                    }
                }
                else if (token.type == 'EOF') {
                    if (inBracket) {
                        throwTokenError(token);
                    }
                    else {
                        processOps(out, ops);
                    }
                }
                else {
                    throwTokenError(token);
                }
            }
            if (out.length > 1) {
                throwTokenError(out.slice(-1)[0].token);
            }
            else if (!out.length) {
                throwTokenError(start);
            }
            else if (ops.length) {
                const op = ops.slice(-1)[0];
                throwTokenError(op instanceof Token ? op : op.token);
            }
            return out[0];
        }
        let out;
        try {
            out = processTokens(false);
            out.postProcess();
        }
        catch (error) {
            if (error.pos != undefined) {
                const err = {
                    isSyntaxError: true,
                    idx: index,
                    start: error.pos,
                    end: error.pos + 1,
                    stack: error.stack
                };
                throw err;
            }
            throw error;
        }
        const pattern = new Pattern();
        pattern.stringObj = args[index];
        pattern.block = out;
        return { result: pattern, argIndex: index + 1 };
    }
    static clone(original) {
        const pattern = new Pattern();
        pattern.block = original.block;
        pattern.stringObj = original.stringObj;
        return pattern;
    }
    toString() {
        return `[pattern: ${this.stringObj}]`;
    }
}
class PatternNode {
    constructor(token) {
        this.token = token;
        this.nodes = [];
    }
    postProcess() { }
}
class BlockPattern extends PatternNode {
    constructor(token, block) {
        super(token);
        this.block = block;
        this.prec = -1;
        this.opCount = 0;
    }
    setBlock(loc, dim) {
        return placeBlock(this.block, loc, dim);
    }
}
class TypePattern extends PatternNode {
    constructor(token, type) {
        super(token);
        this.type = type;
        this.prec = -1;
        this.opCount = 0;
    }
    setBlock(loc, dim) {
        const block = dim.getBlock(loc);
        const states = new Map();
        block.permutation.getAllProperties().forEach(state => {
            states.set(state.name, state.value);
        });
        return placeBlock({
            id: this.type,
            data: -1,
            states: states
        }, loc, dim);
    }
}
class StatePattern extends PatternNode {
    constructor(token, states) {
        super(token);
        this.states = states;
        this.prec = -1;
        this.opCount = 0;
    }
    setBlock(loc, dim) {
        const block = dim.getBlock(loc);
        const states = new Map();
        block.permutation.getAllProperties().forEach(state => {
            states.set(state.name, this.states.has(state.name) ? this.states.get(state.name) : state.value);
        });
        return placeBlock({
            id: block.type.id,
            data: -1,
            states: states
        }, loc, dim);
    }
}
class RandStatePattern extends PatternNode {
    constructor(token, block) {
        super(token);
        this.block = block;
        this.prec = -1;
        this.opCount = 0;
    }
    setBlock(loc, dim) {
        Server.runCommand(`setblock ${printLocation(loc, false)} ${this.block}`, dim);
        const block = dim.getBlock(loc);
        const states = new Map();
        block.permutation.getAllProperties().forEach(state => {
            states.set(state.name, state.validValues[Math.floor(Math.random() * state.validValues.length)] ?? state.value);
        });
        return placeBlock({
            id: block.type.id,
            data: -1,
            states: states
        }, loc, dim);
    }
}
class PercentPattern extends PatternNode {
    constructor(token, percent) {
        super(token);
        this.percent = percent;
        this.prec = 2;
        this.opCount = 1;
    }
    setBlock(loc, dim) {
        return true;
    }
}
class ChainPattern extends PatternNode {
    constructor() {
        super(...arguments);
        this.prec = 1;
        this.opCount = 2;
        this.evenDistribution = true;
        this.cumWeights = [];
    }
    setBlock(loc, dim) {
        let pattern = this.nodes[0];
        if (this.evenDistribution) {
            pattern = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        }
        else {
            const rand = this.weightTotal * Math.random();
            for (let i = 0; i < this.nodes.length; i++) {
                if (this.cumWeights[i] >= rand) {
                    pattern = this.nodes[i];
                    break;
                }
            }
        }
        return pattern.setBlock(loc, dim);
    }
    postProcess() {
        super.postProcess();
        const defaultPercent = 100 / this.nodes.length;
        let totalPercent = 0;
        const patterns = this.nodes;
        const weights = [];
        this.nodes = [];
        while (patterns.length) {
            const pattern = patterns.shift();
            if (pattern instanceof ChainPattern) {
                const sub = pattern.nodes.reverse();
                for (const child of sub) {
                    patterns.unshift(child);
                }
            }
            else if (pattern instanceof PercentPattern) {
                this.evenDistribution = false;
                this.nodes.push(pattern.nodes[0]);
                weights.push(pattern.percent);
                pattern.nodes[0].postProcess();
                totalPercent += pattern.percent;
            }
            else {
                this.nodes.push(pattern);
                weights.push(defaultPercent);
                pattern.postProcess();
                totalPercent += defaultPercent;
            }
        }
        weights.map(value => {
            // printDebug(value / totalPercent);
            return value / totalPercent;
        });
        if (!this.evenDistribution) {
            for (let i = 0; i < weights.length; i += 1) {
                this.cumWeights.push(weights[i] + (this.cumWeights[i - 1] || 0));
            }
            this.weightTotal = this.cumWeights[this.cumWeights.length - 1];
        }
    }
}
