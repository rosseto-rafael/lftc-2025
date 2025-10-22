// Global variables
let currentAutomaton = null;
let currentGrammar = null;
let network = null;

// ===================================================================
// PAGE ACCESS CONTROL - Configure here which pages are accessible
// ===================================================================
// 
// INSTRUCTIONS:
// - Set to 'true' to ENABLE access to a page
// - Set to 'false' to DISABLE access to a page
// 
// When disabled:
// - Navigation button becomes grayed out and unclickable
// - Card on home page becomes grayed out and unclickable  
// - Direct access attempts show an alert message
// - Users are redirected to home if currently on disabled page
//
// EXAMPLES:
// regex: false,       // Disables Regex page completely
// automaton: true,    // Enables Automaton page (default)
// grammar: false,     // Disables Grammar page completely
//
let pageAccess = {
    regex: true,        // Expressões Regulares - TERCEIRA ENTREGA (PROJETO COMPLETO)
    automaton: true,    // Autômatos Finitos - TERCEIRA ENTREGA (PROJETO COMPLETO)
    grammar: true       // Gramáticas Regulares - TERCEIRA ENTREGA (PROJETO COMPLETO)
};

// EXAMPLE: To disable specific pages, uncomment the lines below:
// pageAccess.regex = false;      // Disables Regex page
// pageAccess.automaton = false;  // Disables Automaton page  
// pageAccess.grammar = false;    // Disables Grammar page

// Apply page access settings (called on initialization)
function applyPageAccessSettings() {
    Object.keys(pageAccess).forEach(pageId => {
        const navButton = document.getElementById(`nav-${pageId}`);
        const card = document.getElementById(`card-${pageId}`);
        
        if (!pageAccess[pageId]) {
            // Disable access
            if (navButton) navButton.classList.add('nav-disabled');
            if (card) card.classList.add('disabled');
        } else {
            // Enable access (default state)
            if (navButton) navButton.classList.remove('nav-disabled');
            if (card) card.classList.remove('disabled');
        }
    });
}

// Page routing
function showPage(pageId, event = null) {
    // Check if page access is enabled (except for home)
    if (pageId !== 'home' && !pageAccess[pageId]) {
        alert(`Acesso à página "${getPageDisplayName(pageId)}" está desabilitado. Habilite nas configurações da página inicial.`);
        return;
    }
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page
    document.getElementById(pageId + '-page').classList.remove('hidden');
    
    // Update navigation - reset all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-blue-600', 'font-semibold');
        btn.classList.add('text-gray-600');
    });
    
    // Highlight current nav button based on pageId
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        const btnText = btn.textContent.trim().toLowerCase();
        const pageMap = {
            'início': 'home',
            'regex': 'regex',
            'autômatos': 'automaton',
            'gramáticas': 'grammar'
        };
        
        if (pageMap[btnText] === pageId) {
            btn.classList.remove('text-gray-600');
            btn.classList.add('text-blue-600', 'font-semibold');
        }
    });
}

function getPageDisplayName(pageId) {
    const names = {
        'regex': 'Expressões Regulares',
        'automaton': 'Autômatos Finitos',
        'grammar': 'Gramáticas Regulares'
    };
    return names[pageId] || pageId;
}

// =================================
// CONVERSION ALGORITHMS
// =================================

// ===== REGEX TO AUTOMATON (Thompson's Construction) =====
class RegexToAutomaton {
    constructor() {
        this.stateCounter = 0;
    }
    
    newState() {
        return `q${this.stateCounter++}`;
    }
    
    // Parse simple regex (supports: *, +, |, (), concatenation, basic chars)
    parse(regex) {
        this.stateCounter = 0;
        const postfix = this.infixToPostfix(regex);
        const nfa = this.postfixToNFA(postfix);
        return this.nfaToFiniteAutomaton(nfa);
    }
    
    infixToPostfix(regex) {
        const precedence = { '|': 1, '.': 2, '*': 3, '+': 3 };
        const output = [];
        const operators = [];
        
        // Add explicit concatenation operators
        let processed = '';
        for (let i = 0; i < regex.length; i++) {
            const c = regex[i];
            processed += c;
            
            if (i + 1 < regex.length) {
                const next = regex[i + 1];
                const needsConcat = 
                    (c !== '(' && c !== '|' && next !== ')' && next !== '|' && next !== '*' && next !== '+') ||
                    (c === ')' && next === '(') ||
                    (c === '*' && next === '(') ||
                    (c === '+' && next === '(') ||
                    (c === ')' && /[a-zA-Z0-9]/.test(next)) ||
                    ((c === '*' || c === '+') && /[a-zA-Z0-9]/.test(next));
                
                if (needsConcat) {
                    processed += '.';
                }
            }
        }
        
        for (const c of processed) {
            if (/[a-zA-Z0-9]/.test(c)) {
                output.push(c);
            } else if (c === '(') {
                operators.push(c);
            } else if (c === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                operators.pop(); // Remove '('
            } else if (c === '*' || c === '+' || c === '|' || c === '.') {
                while (operators.length > 0 && 
                       operators[operators.length - 1] !== '(' &&
                       precedence[operators[operators.length - 1]] >= precedence[c]) {
                    output.push(operators.pop());
                }
                operators.push(c);
            }
        }
        
        while (operators.length > 0) {
            output.push(operators.pop());
        }
        
        return output.join('');
    }
    
    postfixToNFA(postfix) {
        const stack = [];
        
        for (const c of postfix) {
            if (/[a-zA-Z0-9]/.test(c)) {
                // Basic symbol
                const start = this.newState();
                const end = this.newState();
                stack.push({
                    start,
                    end,
                    transitions: [[start, c, end]]
                });
            } else if (c === '.') {
                // Concatenation
                const nfa2 = stack.pop();
                const nfa1 = stack.pop();
                stack.push({
                    start: nfa1.start,
                    end: nfa2.end,
                    transitions: [
                        ...nfa1.transitions,
                        ...nfa2.transitions,
                        [nfa1.end, 'ε', nfa2.start]
                    ]
                });
            } else if (c === '|') {
                // Union
                const nfa2 = stack.pop();
                const nfa1 = stack.pop();
                const start = this.newState();
                const end = this.newState();
                stack.push({
                    start,
                    end,
                    transitions: [
                        ...nfa1.transitions,
                        ...nfa2.transitions,
                        [start, 'ε', nfa1.start],
                        [start, 'ε', nfa2.start],
                        [nfa1.end, 'ε', end],
                        [nfa2.end, 'ε', end]
                    ]
                });
            } else if (c === '*') {
                // Kleene star
                const nfa = stack.pop();
                const start = this.newState();
                const end = this.newState();
                stack.push({
                    start,
                    end,
                    transitions: [
                        ...nfa.transitions,
                        [start, 'ε', nfa.start],
                        [start, 'ε', end],
                        [nfa.end, 'ε', nfa.start],
                        [nfa.end, 'ε', end]
                    ]
                });
            } else if (c === '+') {
                // One or more (a+ = aa*)
                const nfa = stack.pop();
                const start = this.newState();
                const end = this.newState();
                stack.push({
                    start,
                    end,
                    transitions: [
                        ...nfa.transitions,
                        [start, 'ε', nfa.start],
                        [nfa.end, 'ε', nfa.start],
                        [nfa.end, 'ε', end]
                    ]
                });
            }
        }
        
        return stack[0];
    }
    
    nfaToFiniteAutomaton(nfa) {
        // Extract alphabet
        const alphabet = new Set();
        nfa.transitions.forEach(([_, symbol, __]) => {
            if (symbol !== 'ε') alphabet.add(symbol);
        });
        
        // Get all states
        const states = new Set([nfa.start, nfa.end]);
        nfa.transitions.forEach(([from, _, to]) => {
            states.add(from);
            states.add(to);
        });
        
        return new FiniteAutomaton(
            Array.from(states),
            Array.from(alphabet),
            nfa.start,
            [nfa.end],
            nfa.transitions
        );
    }
}

// ===== REGEX TO GRAMMAR =====
function regexToGrammar(regex) {
    // First convert regex to automaton
    const converter = new RegexToAutomaton();
    const automaton = converter.parse(regex);
    
    // Then convert automaton to grammar
    return automatonToGrammar(automaton);
}

// ===== AUTOMATON TO GRAMMAR =====
function automatonToGrammar(automaton) {
    const variables = new Set();
    const terminals = automaton.alphabet;
    const productions = new Map();
    
    // Create variable for each state
    const stateToVar = new Map();
    Array.from(automaton.states).forEach((state, index) => {
        const varName = index === 0 ? 'S' : String.fromCharCode(65 + index); // S, A, B, C...
        stateToVar.set(state, varName);
        variables.add(varName);
    });
    
    const startSymbol = stateToVar.get(automaton.initialState);
    
    // Create productions from transitions
    automaton.transitions.forEach((toStates, key) => {
        const [from, symbol] = key.split(',');
        const fromVar = stateToVar.get(from);
        
        if (!productions.has(fromVar)) {
            productions.set(fromVar, []);
        }
        
        toStates.forEach(to => {
            const toVar = stateToVar.get(to);
            
            if (symbol === 'ε') {
                // Epsilon transition
                if (automaton.acceptingStates.has(to)) {
                    productions.get(fromVar).push('ε');
                }
            } else {
                // Regular transition: A → aB (right-linear)
                const production = symbol + toVar;
                productions.get(fromVar).push(production);
                
                // If target is accepting state, also add A → a
                if (automaton.acceptingStates.has(to)) {
                    productions.get(fromVar).push(symbol);
                }
            }
        });
    });
    
    // Add epsilon production if initial state is accepting
    if (automaton.acceptingStates.has(automaton.initialState)) {
        if (!productions.has(startSymbol)) {
            productions.set(startSymbol, []);
        }
        productions.get(startSymbol).push('ε');
    }
    
    return new RegularGrammar(
        Array.from(variables),
        Array.from(terminals),
        startSymbol,
        Array.from(productions.entries()).map(([left, rights]) => 
            `${left} → ${rights.join(' | ')}`
        )
    );
}

// ===== GRAMMAR TO AUTOMATON =====
function grammarToAutomaton(grammar) {
    const states = new Set();
    const alphabet = grammar.terminals;
    const transitions = [];
    
    // Create state for each variable
    const varToState = new Map();
    Array.from(grammar.variables).forEach(v => {
        const stateName = `q${v}`;
        varToState.set(v, stateName);
        states.add(stateName);
    });
    
    // Add final state
    const finalState = 'qF';
    states.add(finalState);
    
    const initialState = varToState.get(grammar.startSymbol);
    const acceptingStates = [finalState];
    
    // Parse productions and create transitions
    grammar.productions.forEach((rights, left) => {
        const fromState = varToState.get(left);
        
        rights.forEach(production => {
            if (production === '' || production === 'ε') {
                // A → ε: transition to final state
                transitions.push([fromState, 'ε', finalState]);
            } else if (production.length === 1 && alphabet.has(production)) {
                // A → a: transition to final state
                transitions.push([fromState, production, finalState]);
            } else if (production.length === 2) {
                // A → aB: regular right-linear production
                const terminal = production[0];
                const variable = production[1];
                
                if (alphabet.has(terminal) && grammar.variables.has(variable)) {
                    const toState = varToState.get(variable);
                    transitions.push([fromState, terminal, toState]);
                }
            }
        });
    });
    
    return new FiniteAutomaton(
        Array.from(states),
        Array.from(alphabet),
        initialState,
        acceptingStates,
        transitions
    );
}

// ===== AUTOMATON TO REGEX (State Elimination Method) =====
function automatonToRegex(automaton) {
    // Create GNFA (Generalized NFA) with regex labels
    const gnfa = {
        states: new Set(automaton.states),
        transitions: new Map()
    };
    
    // Initialize transitions with symbols
    automaton.transitions.forEach((toStates, key) => {
        const [from, symbol] = key.split(',');
        toStates.forEach(to => {
            const transKey = `${from}->${to}`;
            if (!gnfa.transitions.has(transKey)) {
                gnfa.transitions.set(transKey, []);
            }
            gnfa.transitions.get(transKey).push(symbol);
        });
    });
    
    // Simplify: merge multiple transitions between same states
    const simplified = new Map();
    gnfa.transitions.forEach((symbols, key) => {
        simplified.set(key, symbols.length === 1 ? symbols[0] : `(${symbols.join('|')})`);
    });
    
    // Simple conversion for basic cases
    let regex = '';
    const paths = [];
    
    // Find paths from initial to accepting states
    automaton.acceptingStates.forEach(acceptState => {
        const path = findSimplePath(automaton, automaton.initialState, acceptState);
        if (path) paths.push(path);
    });
    
    if (paths.length === 0) return 'ø'; // Empty language
    if (paths.length === 1) return paths[0];
    return `(${paths.join('|')})`;
}

function findSimplePath(automaton, start, end, visited = new Set()) {
    if (start === end) return 'ε';
    if (visited.has(start)) return null;
    
    visited.add(start);
    const paths = [];
    
    automaton.transitions.forEach((toStates, key) => {
        const [from, symbol] = key.split(',');
        if (from === start && symbol !== 'ε') {
            toStates.forEach(to => {
                const subPath = findSimplePath(automaton, to, end, new Set(visited));
                if (subPath) {
                    paths.push(subPath === 'ε' ? symbol : `${symbol}${subPath}`);
                }
            });
        }
    });
    
    return paths.length > 0 ? (paths.length === 1 ? paths[0] : `(${paths.join('|')})`) : null;
}

// ===== GRAMMAR TO REGEX =====
function grammarToRegex(grammar) {
    // Convert grammar to automaton first
    const automaton = grammarToAutomaton(grammar);
    
    // Then convert automaton to regex
    return automatonToRegex(automaton);
}

// =================================
// REGEX VALIDATOR
// =================================

function fillRegexExample(type) {
    const examples = {
        email: {
            regex: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            testStrings: [
                'usuario@exemplo.com',
                'test@email.com.br',
                'nome.sobrenome@dominio.org',
                'invalido@',
                '@invalido.com',
                'sem-arroba.com',
                'usuario@dominio'
            ]
        },
        phone: {
            regex: '\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}',
            testStrings: [
                '(11) 1234-5678',
                '(21) 99999-8888',
                '(85) 3456-7890',
                '11 1234-5678',
                '(11)1234-5678',
                '(11) 123-4567',
                '(11) 123456789'
            ]
        },
        cpf: {
            regex: '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}',
            testStrings: [
                '123.456.789-00',
                '987.654.321-99',
                '111.222.333-44',
                '12345678900',
                '123.456.789',
                '123.456.789-0',
                'abc.def.ghi-jk'
            ]
        },
        numbers: {
            regex: '\\d+',
            testStrings: [
                '123',
                '0',
                '9999',
                '42',
                'abc',
                '123abc',
                'texto123',
                ''
            ]
        },
        words: {
            regex: '\\b[A-Za-z]+\\b',
            testStrings: [
                'palavra',
                'Hello',
                'MAIUSCULA',
                'palavra123',
                '123palavra',
                'duas palavras',
                'com-hífen',
                'número 42'
            ]
        },
        basic: {
            regex: 'a*b+',
            testStrings: [
                'b',
                'bb',
                'ab',
                'aab',
                'aaabb',
                'a',
                'ba',
                'aba',
                ''
            ]
        }
    };
    
    const example = examples[type];
    if (example) {
        // Preenche o campo de regex
        document.getElementById('regex-input').value = example.regex;
        
        // Preenche as cadeias de teste
        document.getElementById('test-strings').value = example.testStrings.join('\n');
        
        // Limpa resultados anteriores
        document.getElementById('regex-results').classList.add('hidden');
        
        // Scroll suave para o formulário
        document.getElementById('regex-input').scrollIntoView({ behavior: 'smooth' });
        
        // Foca no campo de regex
        setTimeout(() => {
            document.getElementById('regex-input').focus();
        }, 300);
    }
}

function validateRegex() {
    const regexInput = document.getElementById('regex-input').value.trim();
    const testStrings = document.getElementById('test-strings').value.trim().split('\n').filter(s => s.trim());
    
    if (!regexInput) {
        alert('Por favor, insira uma expressão regular');
        return;
    }
    
    if (testStrings.length === 0) {
        alert('Por favor, insira pelo menos uma cadeia de teste');
        return;
    }
    
    try {
        const regex = new RegExp('^' + regexInput + '$');
        const results = testStrings.map(str => {
            const trimmedStr = str.trim();
            const matches = regex.test(trimmedStr);
            return { string: trimmedStr, matches };
        });
        
        displayRegexResults(results, regexInput);
    } catch (error) {
        alert('Expressão regular inválida: ' + error.message);
    }
}

function displayRegexResults(results, regex) {
    const resultsDiv = document.getElementById('regex-results');
    const contentDiv = document.getElementById('regex-results-content');
    
    let html = `<p class="mb-4"><strong>Expressão Regular:</strong> <code class="bg-gray-100 px-2 py-1 rounded">${regex}</code></p>`;
    html += '<div class="space-y-2">';
    
    results.forEach(result => {
        const statusClass = result.matches ? 'result-accepted' : 'result-rejected';
        const statusText = result.matches ? '✓ Aceita' : '✗ Rejeitada';
        
        html += `
            <div class="flex items-center justify-between p-3 rounded-md ${statusClass}">
                <code class="font-mono">"${result.string}"</code>
                <span class="font-semibold">${statusText}</span>
            </div>
        `;
    });
    
    html += '</div>';
    contentDiv.innerHTML = html;
    resultsDiv.classList.remove('hidden');
}

// =================================
// FINITE AUTOMATON SIMULATOR
// =================================

function fillAutomatonExample(type) {
    const examples = {
        'binary-even': {
            states: 'q0,q1',
            alphabet: '0,1',
            initialState: 'q0',
            acceptingStates: 'q0',
            transitions: 'q0,0,q0\nq0,1,q1\nq1,0,q0\nq1,1,q1',
            testString: '1010',
            description: 'Aceita números binários pares (terminam em 0)'
        },
        'contains-ab': {
            states: 'q0,q1,q2',
            alphabet: 'a,b',
            initialState: 'q0',
            acceptingStates: 'q2',
            transitions: 'q0,a,q1\nq0,b,q0\nq1,a,q1\nq1,b,q2\nq2,a,q2\nq2,b,q2',
            testString: 'aab',
            description: 'Aceita cadeias que contêm a subcadeia "ab"'
        },
        'starts-ends-same': {
            states: 'q0,qa,qb,qaa,qab,qba,qbb',
            alphabet: 'a,b',
            initialState: 'q0',
            acceptingStates: 'qaa,qbb',
            transitions: 'q0,a,qa\nq0,b,qb\nqa,a,qaa\nqa,b,qab\nqb,a,qba\nqb,b,qbb\nqaa,a,qaa\nqaa,b,qab\nqab,a,qaa\nqab,b,qbb\nqba,a,qaa\nqba,b,qbb\nqbb,a,qab\nqbb,b,qbb',
            testString: 'aba',
            description: 'Aceita cadeias que começam e terminam com o mesmo símbolo'
        },
        'odd-length': {
            states: 'q0,q1',
            alphabet: 'a,b',
            initialState: 'q0',
            acceptingStates: 'q1',
            transitions: 'q0,a,q1\nq0,b,q1\nq1,a,q0\nq1,b,q0',
            testString: 'aba',
            description: 'Aceita cadeias de comprimento ímpar'
        },
        'ends-with-ba': {
            states: 'q0,q1,q2',
            alphabet: 'a,b',
            initialState: 'q0',
            acceptingStates: 'q2',
            transitions: 'q0,a,q0\nq0,b,q1\nq1,a,q2\nq1,b,q1\nq2,a,q0\nq2,b,q1',
            testString: 'abba',
            description: 'Aceita cadeias que terminam com "ba"'
        },
        'basic': {
            states: 'q0,q1,q2',
            alphabet: 'a,b',
            initialState: 'q0',
            acceptingStates: 'q2',
            transitions: 'q0,a,q1\nq1,b,q2\nq2,a,q0\nq2,b,q1',
            testString: 'ab',
            description: 'Exemplo básico para aprendizado'
        }
    };
    
    const example = examples[type];
    if (example) {
        // Preenche os campos do autômato
        document.getElementById('states-input').value = example.states;
        document.getElementById('alphabet-input').value = example.alphabet;
        document.getElementById('initial-state').value = example.initialState;
        document.getElementById('accepting-states').value = example.acceptingStates;
        document.getElementById('transitions-input').value = example.transitions;
        document.getElementById('test-string-automaton').value = example.testString;
        
        // Limpa visualização anterior
        if (network) {
            network.destroy();
            network = null;
        }
        currentAutomaton = null;
        document.getElementById('automaton-simulation').classList.add('hidden');
        
        // Scroll suave para o formulário
        document.getElementById('states-input').scrollIntoView({ behavior: 'smooth' });
        
        // Foca no primeiro campo
        setTimeout(() => {
            document.getElementById('states-input').focus();
        }, 300);
    }
}

class FiniteAutomaton {
    constructor(states, alphabet, initialState, acceptingStates, transitions) {
        this.states = new Set(states);
        this.alphabet = new Set(alphabet);
        this.initialState = initialState;
        this.acceptingStates = new Set(acceptingStates);
        this.transitions = new Map();
        
        // Build transition table
        transitions.forEach(([from, symbol, to]) => {
            const key = `${from},${symbol}`;
            if (!this.transitions.has(key)) {
                this.transitions.set(key, []);
            }
            this.transitions.get(key).push(to);
        });
    }
    
    getTransitions(state, symbol) {
        const key = `${state},${symbol}`;
        return this.transitions.get(key) || [];
    }
    
    simulate(input) {
        const steps = [];
        let currentStates = [this.initialState];
        
        steps.push({
            step: 0,
            input: input,
            position: 0,
            currentStates: [...currentStates],
            symbol: null,
            description: `Estado inicial: {${currentStates.join(', ')}}`
        });
        
        for (let i = 0; i < input.length; i++) {
            const symbol = input[i];
            const nextStates = [];
            
            currentStates.forEach(state => {
                const transitions = this.getTransitions(state, symbol);
                nextStates.push(...transitions);
            });
            
            if (nextStates.length === 0) {
                steps.push({
                    step: i + 1,
                    input: input,
                    position: i,
                    currentStates: [],
                    symbol: symbol,
                    description: `Lendo '${symbol}': Não há transições válidas. Cadeia rejeitada.`
                });
                return { accepted: false, steps };
            }
            
            currentStates = [...new Set(nextStates)]; // Remove duplicates
            steps.push({
                step: i + 1,
                input: input,
                position: i,
                currentStates: [...currentStates],
                symbol: symbol,
                description: `Lendo '${symbol}': Transição para {${currentStates.join(', ')}}`
            });
        }
        
        const hasAcceptingState = currentStates.some(state => this.acceptingStates.has(state));
        const finalDescription = hasAcceptingState 
            ? `Cadeia aceita! Estados finais: {${currentStates.filter(s => this.acceptingStates.has(s)).join(', ')}}`
            : `Cadeia rejeitada. Nenhum estado final alcançado.`;
            
        steps.push({
            step: steps.length,
            input: input,
            position: input.length,
            currentStates: [...currentStates],
            symbol: null,
            description: finalDescription
        });
        
        return { accepted: hasAcceptingState, steps };
    }
}

function createAutomaton() {
    const statesInput = document.getElementById('states-input').value.trim();
    const alphabetInput = document.getElementById('alphabet-input').value.trim();
    const initialState = document.getElementById('initial-state').value.trim();
    const acceptingStatesInput = document.getElementById('accepting-states').value.trim();
    const transitionsInput = document.getElementById('transitions-input').value.trim();
    
    if (!statesInput || !alphabetInput || !initialState || !transitionsInput) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
    }
    
    try {
        const states = statesInput.split(',').map(s => s.trim());
        const alphabet = alphabetInput.split(',').map(s => s.trim());
        const acceptingStates = acceptingStatesInput ? acceptingStatesInput.split(',').map(s => s.trim()) : [];
        
        const transitions = transitionsInput.split('\n')
            .filter(line => line.trim())
            .map(line => {
                const parts = line.trim().split(',').map(s => s.trim());
                if (parts.length !== 3) {
                    throw new Error(`Formato inválido na transição: ${line}`);
                }
                return parts;
            });
        
        currentAutomaton = new FiniteAutomaton(states, alphabet, initialState, acceptingStates, transitions);
        visualizeAutomaton(currentAutomaton);
        
        alert('Autômato criado com sucesso!');
    } catch (error) {
        alert('Erro ao criar autômato: ' + error.message);
    }
}

function visualizeAutomaton(automaton) {
    const container = document.getElementById('automaton-network');
    
    // Create nodes
    const nodes = Array.from(automaton.states).map(state => ({
        id: state,
        label: state,
        color: {
            background: automaton.acceptingStates.has(state) ? '#dcfce7' : '#f3f4f6',
            border: state === automaton.initialState ? '#3b82f6' : '#9ca3af'
        },
        borderWidth: state === automaton.initialState ? 3 : 1,
        font: { color: '#374151' }
    }));
    
    // Create edges
    const edges = [];
    const edgeMap = new Map();
    
    automaton.transitions.forEach((toStates, key) => {
        const [from, symbol] = key.split(',');
        toStates.forEach(to => {
            const edgeKey = `${from}-${to}`;
            if (!edgeMap.has(edgeKey)) {
                edgeMap.set(edgeKey, []);
            }
            edgeMap.get(edgeKey).push(symbol);
        });
    });
    
    edgeMap.forEach((symbols, edgeKey) => {
        const [from, to] = edgeKey.split('-');
        edges.push({
            from: from,
            to: to,
            label: symbols.join(','),
            arrows: 'to',
            font: { size: 12 }
        });
    });
    
    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    const options = {
        physics: {
            enabled: true,
            stabilization: { iterations: 100 }
        },
        nodes: {
            shape: 'circle',
            size: 25
        },
        edges: {
            smooth: { type: 'curvedCW', roundness: 0.2 }
        }
    };
    
    network = new vis.Network(container, data, options);
}

function simulateAutomaton() {
    if (!currentAutomaton) {
        alert('Por favor, crie um autômato primeiro');
        return;
    }
    
    const testString = document.getElementById('test-string-automaton').value.trim();
    const result = currentAutomaton.simulate(testString);
    
    displayAutomatonSimulation(result);
}

function displayAutomatonSimulation(result) {
    const simulationDiv = document.getElementById('automaton-simulation');
    const stepsDiv = document.getElementById('simulation-steps');
    const resultDiv = document.getElementById('simulation-result');
    
    let stepsHtml = '<div class="space-y-2">';
    result.steps.forEach((step, index) => {
        const isLast = index === result.steps.length - 1;
        const stepClass = isLast ? 'step-highlight' : '';
        
        stepsHtml += `
            <div class="p-3 border rounded-md ${stepClass}">
                <div class="flex justify-between items-center mb-1">
                    <strong>Passo ${step.step}:</strong>
                    <span class="text-sm text-gray-600">Estados: {${step.currentStates.join(', ')}}</span>
                </div>
                <p class="text-sm">${step.description}</p>
                ${step.position < step.input.length ? 
                    `<div class="mt-2 font-mono text-sm">
                        ${step.input.substring(0, step.position)}<span class="bg-yellow-200">${step.input[step.position] || ''}</span>${step.input.substring(step.position + 1)}
                    </div>` : ''}
            </div>
        `;
    });
    stepsHtml += '</div>';
    
    const resultClass = result.accepted ? 'result-accepted' : 'result-rejected';
    const resultText = result.accepted ? '✓ Cadeia Aceita' : '✗ Cadeia Rejeitada';
    
    stepsDiv.innerHTML = stepsHtml;
    resultDiv.innerHTML = `
        <div class="p-4 rounded-md ${resultClass} text-center">
            <h4 class="text-lg font-semibold">${resultText}</h4>
        </div>
    `;
    
    simulationDiv.classList.remove('hidden');
}

// =================================
// REGULAR GRAMMAR SIMULATOR
// =================================

function fillGrammarExample(type) {
    const examples = {
        'alternating': {
            variables: 'S,A',
            terminals: 'a,b',
            startSymbol: 'S',
            productions: 'S → aA | a\nA → bS | b',
            testString: 'ab',
            description: 'Gera cadeias alternando a e b'
        },
        'even-as': {
            variables: 'S,A',
            terminals: 'a,b',
            startSymbol: 'S',
            productions: 'S → bS | aA | ε\nA → bA | aS',
            testString: 'aabb',
            description: 'Aceita cadeias com número par de a'
        },
        'starts-a-ends-b': {
            variables: 'S,A',
            terminals: 'a,b',
            startSymbol: 'S',
            productions: 'S → aA\nA → aA | bA | b',
            testString: 'aabb',
            description: 'Cadeias que começam com a e terminam com b'
        },
        'palindromes': {
            variables: 'S',
            terminals: 'a,b',
            startSymbol: 'S',
            productions: 'S → aSa | bSb | a | b | ε',
            testString: 'aba',
            description: 'Gera palíndromos simples'
        },
        'binary-numbers': {
            variables: 'S,A',
            terminals: '0,1',
            startSymbol: 'S',
            productions: 'S → 1A | 1\nA → 0A | 1A | 0 | 1',
            testString: '101',
            description: 'Gera números binários válidos (não começam com 0)'
        },
        'basic': {
            variables: 'S,A',
            terminals: 'a,b',
            startSymbol: 'S',
            productions: 'S → aA | a\nA → bS | b',
            testString: 'ab',
            description: 'Gramática básica para aprendizado'
        }
    };
    
    const example = examples[type];
    if (example) {
        // Preenche os campos da gramática
        document.getElementById('variables-input').value = example.variables;
        document.getElementById('terminals-input').value = example.terminals;
        document.getElementById('start-symbol').value = example.startSymbol;
        document.getElementById('productions-input').value = example.productions;
        document.getElementById('test-string-grammar').value = example.testString;
        
        // Limpa resultados anteriores
        currentGrammar = null;
        document.getElementById('grammar-test').classList.add('hidden');
        document.getElementById('grammar-derivation').classList.add('hidden');
        
        // Scroll suave para o formulário
        document.getElementById('variables-input').scrollIntoView({ behavior: 'smooth' });
        
        // Foca no primeiro campo
        setTimeout(() => {
            document.getElementById('variables-input').focus();
        }, 300);
    }
}

class RegularGrammar {
    constructor(variables, terminals, startSymbol, productions) {
        this.variables = new Set(variables);
        this.terminals = new Set(terminals);
        this.startSymbol = startSymbol;
        this.productions = new Map();
        
        // Parse productions
        productions.forEach(prod => {
            const [left, right] = prod.split('→').map(s => s.trim());
            if (!this.productions.has(left)) {
                this.productions.set(left, []);
            }
            
            const alternatives = right.split('|').map(s => s.trim());
            alternatives.forEach(alt => {
                this.productions.get(left).push(alt === 'ε' ? '' : alt);
            });
        });
    }
    
    derive(targetString) {
        const derivations = [];
        const queue = [{ current: this.startSymbol, steps: [this.startSymbol] }];
        const visited = new Set();
        const maxSteps = 20; // Prevent infinite loops
        
        while (queue.length > 0 && derivations.length < maxSteps) {
            const { current, steps } = queue.shift();
            
            if (visited.has(current) || steps.length > maxSteps) continue;
            visited.add(current);
            
            if (current === targetString) {
                return { success: true, steps };
            }
            
            // Find leftmost non-terminal
            let nonTerminalIndex = -1;
            for (let i = 0; i < current.length; i++) {
                if (this.variables.has(current[i])) {
                    nonTerminalIndex = i;
                    break;
                }
            }
            
            if (nonTerminalIndex === -1) {
                // No more variables to expand
                if (current === targetString) {
                    return { success: true, steps };
                }
                continue;
            }
            
            const variable = current[nonTerminalIndex];
            const productions = this.productions.get(variable) || [];
            
            productions.forEach(production => {
                const newString = current.substring(0, nonTerminalIndex) + 
                                production + 
                                current.substring(nonTerminalIndex + 1);
                
                const newSteps = [...steps, newString];
                queue.push({ current: newString, steps: newSteps });
            });
        }
        
        return { success: false, steps: [] };
    }
}

function createGrammar() {
    const variablesInput = document.getElementById('variables-input').value.trim();
    const terminalsInput = document.getElementById('terminals-input').value.trim();
    const startSymbol = document.getElementById('start-symbol').value.trim();
    const productionsInput = document.getElementById('productions-input').value.trim();
    
    if (!variablesInput || !terminalsInput || !startSymbol || !productionsInput) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    try {
        const variables = variablesInput.split(',').map(s => s.trim());
        const terminals = terminalsInput.split(',').map(s => s.trim());
        const productions = productionsInput.split('\n').filter(line => line.trim());
        
        currentGrammar = new RegularGrammar(variables, terminals, startSymbol, productions);
        
        document.getElementById('grammar-test').classList.remove('hidden');
        alert('Gramática criada com sucesso!');
    } catch (error) {
        alert('Erro ao criar gramática: ' + error.message);
    }
}

function testGrammar() {
    if (!currentGrammar) {
        alert('Por favor, crie uma gramática primeiro');
        return;
    }
    
    const testString = document.getElementById('test-string-grammar').value.trim();
    const result = currentGrammar.derive(testString);
    
    displayGrammarDerivation(result, testString);
}

function displayGrammarDerivation(result, targetString) {
    const derivationDiv = document.getElementById('grammar-derivation');
    const stepsDiv = document.getElementById('derivation-steps');
    const resultDiv = document.getElementById('derivation-result');
    
    if (result.success) {
        let stepsHtml = '<div class="space-y-2">';
        result.steps.forEach((step, index) => {
            const isLast = index === result.steps.length - 1;
            const stepClass = isLast ? 'step-highlight' : '';
            
            stepsHtml += `
                <div class="p-2 border rounded ${stepClass}">
                    <code class="font-mono">${step || 'ε'}</code>
                    ${index < result.steps.length - 1 ? ' ⇒' : ''}
                </div>
            `;
        });
        stepsHtml += '</div>';
        
        stepsDiv.innerHTML = stepsHtml;
        resultDiv.innerHTML = `
            <div class="p-4 rounded-md result-accepted text-center">
                <h4 class="text-lg font-semibold">✓ Cadeia pode ser derivada!</h4>
            </div>
        `;
    } else {
        stepsDiv.innerHTML = '<p class="text-gray-600">Não foi possível encontrar uma derivação.</p>';
        resultDiv.innerHTML = `
            <div class="p-4 rounded-md result-rejected text-center">
                <h4 class="text-lg font-semibold">✗ Cadeia não pode ser derivada</h4>
            </div>
        `;
    }
    
    derivationDiv.classList.remove('hidden');
}

// =================================
// CONVERSION UI HANDLERS
// =================================

// Regex Conversions
function convertRegexToAutomaton() {
    const regexInput = document.getElementById('regex-input').value.trim();
    
    if (!regexInput) {
        alert('Por favor, insira uma expressão regular primeiro');
        return;
    }
    
    try {
        const converter = new RegexToAutomaton();
        const automaton = converter.parse(regexInput);
        
        // Display result
        const resultDiv = document.getElementById('regex-conversion-result');
        const contentDiv = document.getElementById('regex-conversion-content');
        
        let html = '<div class="space-y-3">';
        html += '<p class="font-semibold text-green-700">✓ Autômato criado com sucesso!</p>';
        html += '<div class="grid grid-cols-2 gap-3 text-sm">';
        html += `<div><strong>Estados:</strong> ${Array.from(automaton.states).join(', ')}</div>`;
        html += `<div><strong>Alfabeto:</strong> ${Array.from(automaton.alphabet).join(', ')}</div>`;
        html += `<div><strong>Estado Inicial:</strong> ${automaton.initialState}</div>`;
        html += `<div><strong>Estados Finais:</strong> ${Array.from(automaton.acceptingStates).join(', ')}</div>`;
        html += '</div>';
        
        html += '<div class="mt-3"><strong>Transições:</strong><br><code class="text-xs">';
        const transitions = [];
        automaton.transitions.forEach((toStates, key) => {
            const [from, symbol] = key.split(',');
            toStates.forEach(to => {
                transitions.push(`${from} --${symbol}--> ${to}`);
            });
        });
        html += transitions.join('<br>');
        html += '</code></div>';
        
        html += '<div class="mt-4 flex gap-2">';
        html += '<button onclick="useConvertedAutomaton()" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">Usar este Autômato</button>';
        html += '</div>';
        html += '</div>';
        
        contentDiv.innerHTML = html;
        resultDiv.classList.remove('hidden');
        
        // Store for later use
        window.lastConvertedAutomaton = automaton;
        
    } catch (error) {
        alert('Erro ao converter: ' + error.message);
    }
}

function convertRegexToGrammar() {
    const regexInput = document.getElementById('regex-input').value.trim();
    
    if (!regexInput) {
        alert('Por favor, insira uma expressão regular primeiro');
        return;
    }
    
    try {
        const grammar = regexToGrammar(regexInput);
        
        // Display result
        const resultDiv = document.getElementById('regex-conversion-result');
        const contentDiv = document.getElementById('regex-conversion-content');
        
        let html = '<div class="space-y-3">';
        html += '<p class="font-semibold text-purple-700">✓ Gramática criada com sucesso!</p>';
        html += '<div class="grid grid-cols-2 gap-3 text-sm">';
        html += `<div><strong>Variáveis:</strong> ${Array.from(grammar.variables).join(', ')}</div>`;
        html += `<div><strong>Terminais:</strong> ${Array.from(grammar.terminals).join(', ')}</div>`;
        html += `<div><strong>Símbolo Inicial:</strong> ${grammar.startSymbol}</div>`;
        html += '</div>';
        
        html += '<div class="mt-3"><strong>Produções:</strong><br><code class="text-sm">';
        const productions = [];
        grammar.productions.forEach((rights, left) => {
            productions.push(`${left} → ${rights.join(' | ')}`);
        });
        html += productions.join('<br>');
        html += '</code></div>';
        
        html += '<div class="mt-4 flex gap-2">';
        html += '<button onclick="useConvertedGrammar()" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm">Usar esta Gramática</button>';
        html += '</div>';
        html += '</div>';
        
        contentDiv.innerHTML = html;
        resultDiv.classList.remove('hidden');
        
        // Store for later use
        window.lastConvertedGrammar = grammar;
        
    } catch (error) {
        alert('Erro ao converter: ' + error.message);
    }
}

// Automaton Conversions
function convertAutomatonToRegex() {
    if (!currentAutomaton) {
        alert('Por favor, crie um autômato primeiro');
        return;
    }
    
    try {
        const regex = automatonToRegex(currentAutomaton);
        
        // Display result
        const resultDiv = document.getElementById('automaton-conversion-result');
        const contentDiv = document.getElementById('automaton-conversion-content');
        
        let html = '<div class="space-y-3">';
        html += '<p class="font-semibold text-blue-700">✓ Regex criada com sucesso!</p>';
        html += `<div class="text-lg"><strong>Expressão Regular:</strong> <code class="bg-white px-3 py-2 rounded border">${regex}</code></div>`;
        html += '<div class="mt-4 flex gap-2">';
        html += '<button onclick="useConvertedRegex()" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">Usar esta Regex</button>';
        html += '</div>';
        html += '</div>';
        
        contentDiv.innerHTML = html;
        resultDiv.classList.remove('hidden');
        
        // Store for later use
        window.lastConvertedRegex = regex;
        
    } catch (error) {
        alert('Erro ao converter: ' + error.message);
    }
}

function convertAutomatonToGrammar() {
    if (!currentAutomaton) {
        alert('Por favor, crie um autômato primeiro');
        return;
    }
    
    try {
        const grammar = automatonToGrammar(currentAutomaton);
        
        // Display result
        const resultDiv = document.getElementById('automaton-conversion-result');
        const contentDiv = document.getElementById('automaton-conversion-content');
        
        let html = '<div class="space-y-3">';
        html += '<p class="font-semibold text-purple-700">✓ Gramática criada com sucesso!</p>';
        html += '<div class="grid grid-cols-2 gap-3 text-sm">';
        html += `<div><strong>Variáveis:</strong> ${Array.from(grammar.variables).join(', ')}</div>`;
        html += `<div><strong>Terminais:</strong> ${Array.from(grammar.terminals).join(', ')}</div>`;
        html += `<div><strong>Símbolo Inicial:</strong> ${grammar.startSymbol}</div>`;
        html += '</div>';
        
        html += '<div class="mt-3"><strong>Produções:</strong><br><code class="text-sm">';
        const productions = [];
        grammar.productions.forEach((rights, left) => {
            productions.push(`${left} → ${rights.join(' | ')}`);
        });
        html += productions.join('<br>');
        html += '</code></div>';
        
        html += '<div class="mt-4 flex gap-2">';
        html += '<button onclick="useConvertedGrammar()" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm">Usar esta Gramática</button>';
        html += '</div>';
        html += '</div>';
        
        contentDiv.innerHTML = html;
        resultDiv.classList.remove('hidden');
        
        // Store for later use
        window.lastConvertedGrammar = grammar;
        
    } catch (error) {
        alert('Erro ao converter: ' + error.message);
    }
}

// Grammar Conversions
function convertGrammarToAutomaton() {
    if (!currentGrammar) {
        alert('Por favor, crie uma gramática primeiro');
        return;
    }
    
    try {
        const automaton = grammarToAutomaton(currentGrammar);
        
        // Display result
        const resultDiv = document.getElementById('grammar-conversion-result');
        const contentDiv = document.getElementById('grammar-conversion-content');
        
        let html = '<div class="space-y-3">';
        html += '<p class="font-semibold text-green-700">✓ Autômato criado com sucesso!</p>';
        html += '<div class="grid grid-cols-2 gap-3 text-sm">';
        html += `<div><strong>Estados:</strong> ${Array.from(automaton.states).join(', ')}</div>`;
        html += `<div><strong>Alfabeto:</strong> ${Array.from(automaton.alphabet).join(', ')}</div>`;
        html += `<div><strong>Estado Inicial:</strong> ${automaton.initialState}</div>`;
        html += `<div><strong>Estados Finais:</strong> ${Array.from(automaton.acceptingStates).join(', ')}</div>`;
        html += '</div>';
        
        html += '<div class="mt-3"><strong>Transições:</strong><br><code class="text-xs">';
        const transitions = [];
        automaton.transitions.forEach((toStates, key) => {
            const [from, symbol] = key.split(',');
            toStates.forEach(to => {
                transitions.push(`${from} --${symbol}--> ${to}`);
            });
        });
        html += transitions.join('<br>');
        html += '</code></div>';
        
        html += '<div class="mt-4 flex gap-2">';
        html += '<button onclick="useConvertedAutomaton()" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">Usar este Autômato</button>';
        html += '</div>';
        html += '</div>';
        
        contentDiv.innerHTML = html;
        resultDiv.classList.remove('hidden');
        
        // Store for later use
        window.lastConvertedAutomaton = automaton;
        
    } catch (error) {
        alert('Erro ao converter: ' + error.message);
    }
}

function convertGrammarToRegex() {
    if (!currentGrammar) {
        alert('Por favor, crie uma gramática primeiro');
        return;
    }
    
    try {
        const regex = grammarToRegex(currentGrammar);
        
        // Display result
        const resultDiv = document.getElementById('grammar-conversion-result');
        const contentDiv = document.getElementById('grammar-conversion-content');
        
        let html = '<div class="space-y-3">';
        html += '<p class="font-semibold text-blue-700">✓ Regex criada com sucesso!</p>';
        html += `<div class="text-lg"><strong>Expressão Regular:</strong> <code class="bg-white px-3 py-2 rounded border">${regex}</code></div>`;
        html += '<div class="mt-4 flex gap-2">';
        html += '<button onclick="useConvertedRegex()" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">Usar esta Regex</button>';
        html += '</div>';
        html += '</div>';
        
        contentDiv.innerHTML = html;
        resultDiv.classList.remove('hidden');
        
        // Store for later use
        window.lastConvertedRegex = regex;
        
    } catch (error) {
        alert('Erro ao converter: ' + error.message);
    }
}

// Helper functions to use converted objects
function useConvertedAutomaton() {
    if (window.lastConvertedAutomaton) {
        showPage('automaton');
        setTimeout(() => {
            const automaton = window.lastConvertedAutomaton;
            document.getElementById('states-input').value = Array.from(automaton.states).join(',');
            document.getElementById('alphabet-input').value = Array.from(automaton.alphabet).join(',');
            document.getElementById('initial-state').value = automaton.initialState;
            document.getElementById('accepting-states').value = Array.from(automaton.acceptingStates).join(',');
            
            const transitions = [];
            automaton.transitions.forEach((toStates, key) => {
                const [from, symbol] = key.split(',');
                toStates.forEach(to => {
                    transitions.push(`${from},${symbol},${to}`);
                });
            });
            document.getElementById('transitions-input').value = transitions.join('\n');
            
            createAutomaton();
        }, 300);
    }
}

function useConvertedGrammar() {
    if (window.lastConvertedGrammar) {
        showPage('grammar');
        setTimeout(() => {
            const grammar = window.lastConvertedGrammar;
            document.getElementById('variables-input').value = Array.from(grammar.variables).join(',');
            document.getElementById('terminals-input').value = Array.from(grammar.terminals).join(',');
            document.getElementById('start-symbol').value = grammar.startSymbol;
            
            const productions = [];
            grammar.productions.forEach((rights, left) => {
                productions.push(`${left} → ${rights.join(' | ')}`);
            });
            document.getElementById('productions-input').value = productions.join('\n');
            
            createGrammar();
        }, 300);
    }
}

function useConvertedRegex() {
    if (window.lastConvertedRegex) {
        showPage('regex');
        setTimeout(() => {
            document.getElementById('regex-input').value = window.lastConvertedRegex;
            document.getElementById('regex-input').focus();
        }, 300);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Apply page access settings first
    applyPageAccessSettings();
    
    // Show home page
    showPage('home');
    
    // Add example data for quick testing (automaton and grammar only)
    setTimeout(() => {
        // Automaton example
        document.getElementById('states-input').value = 'q0,q1,q2';
        document.getElementById('alphabet-input').value = 'a,b';
        document.getElementById('initial-state').value = 'q0';
        document.getElementById('accepting-states').value = 'q2';
        document.getElementById('transitions-input').value = 'q0,a,q1\nq1,b,q2\nq2,a,q0\nq2,b,q1';
        document.getElementById('test-string-automaton').value = 'ab';
        
        // Grammar example
        document.getElementById('variables-input').value = 'S,A';
        document.getElementById('terminals-input').value = 'a,b';
        document.getElementById('start-symbol').value = 'S';
        document.getElementById('productions-input').value = 'S → aA | a\nA → bS | b';
        document.getElementById('test-string-grammar').value = 'ab';
    }, 100);
});

// Handle navigation clicks on title
document.addEventListener('click', function(event) {
    if (event.target.textContent === 'JFLAP Web') {
        showPage('home');
    }
});