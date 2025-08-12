// Global variables (Regex + Automatos na SEGUNDA ENTREGA)
let currentAutomaton = null;
let network = null;

// =================================
// PAGE ROUTING - SEGUNDA ENTREGA (Regex + Automatos)
// =================================

// Page routing
function showPage(pageId, event = null) {
    // Na segunda entrega, apenas home, regex e automaton são permitidas
    if (pageId !== 'home' && pageId !== 'regex' && pageId !== 'automaton') {
        alert(`Funcionalidade "${getPageDisplayName(pageId)}" não implementada nesta versão.`);
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
            'autômatos': 'automaton'
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
// REGEX VALIDATOR - SEGUNDA ENTREGA
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
// FINITE AUTOMATON SIMULATOR - SEGUNDA ENTREGA
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
// INITIALIZATION - SEGUNDA ENTREGA
// =================================

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show home page
    showPage('home');
    
    // Add example data for quick testing
    setTimeout(() => {
        // Regex example
        document.getElementById('regex-input').value = 'a*b+';
        document.getElementById('test-strings').value = 'b\nbb\nab\naab\naaabb\na\nba\naba\n';
        
        // Automaton example
        document.getElementById('states-input').value = 'q0,q1,q2';
        document.getElementById('alphabet-input').value = 'a,b';
        document.getElementById('initial-state').value = 'q0';
        document.getElementById('accepting-states').value = 'q2';
        document.getElementById('transitions-input').value = 'q0,a,q1\nq1,b,q2\nq2,a,q0\nq2,b,q1';
        document.getElementById('test-string-automaton').value = 'ab';
    }, 100);
});

// Handle navigation clicks on title
document.addEventListener('click', function(event) {
    if (event.target.textContent === 'Trabalho LFTC') {
        showPage('home');
    }
});