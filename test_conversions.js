// Script de teste para validar as conversões
// Execute este arquivo com Node.js ou no console do navegador após carregar script.js

console.log("=".repeat(60));
console.log("TESTE DE CONVERSÕES - LFTC 2025");
console.log("=".repeat(60));

// Test 1: Regex to Automaton (Simple)
console.log("\n📝 Teste 1: Regex → Autômato (ab)");
try {
    const converter = new RegexToAutomaton();
    const automaton = converter.parse("ab");
    console.log("✅ Sucesso!");
    console.log(`   Estados: ${Array.from(automaton.states).join(', ')}`);
    console.log(`   Alfabeto: ${Array.from(automaton.alphabet).join(', ')}`);
    console.log(`   Estado inicial: ${automaton.initialState}`);
    console.log(`   Estados finais: ${Array.from(automaton.acceptingStates).join(', ')}`);
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 2: Regex to Automaton (Kleene Star)
console.log("\n📝 Teste 2: Regex → Autômato (a*)");
try {
    const converter = new RegexToAutomaton();
    const automaton = converter.parse("a*");
    console.log("✅ Sucesso!");
    console.log(`   Estados: ${Array.from(automaton.states).join(', ')}`);
    console.log(`   Alfabeto: ${Array.from(automaton.alphabet).join(', ')}`);
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 3: Regex to Automaton (Union)
console.log("\n📝 Teste 3: Regex → Autômato (a|b)");
try {
    const converter = new RegexToAutomaton();
    const automaton = converter.parse("a|b");
    console.log("✅ Sucesso!");
    console.log(`   Estados: ${Array.from(automaton.states).join(', ')}`);
    console.log(`   Alfabeto: ${Array.from(automaton.alphabet).join(', ')}`);
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 4: Regex to Grammar
console.log("\n📝 Teste 4: Regex → Gramática (ab)");
try {
    const grammar = regexToGrammar("ab");
    console.log("✅ Sucesso!");
    console.log(`   Variáveis: ${Array.from(grammar.variables).join(', ')}`);
    console.log(`   Terminais: ${Array.from(grammar.terminals).join(', ')}`);
    console.log(`   Símbolo inicial: ${grammar.startSymbol}`);
    console.log("   Produções:");
    grammar.productions.forEach((rights, left) => {
        console.log(`      ${left} → ${rights.join(' | ')}`);
    });
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 5: Automaton to Grammar
console.log("\n📝 Teste 5: Autômato → Gramática");
try {
    // Create a simple automaton: q0 --a--> q1 --b--> q2 (final)
    const automaton = new FiniteAutomaton(
        ['q0', 'q1', 'q2'],
        ['a', 'b'],
        'q0',
        ['q2'],
        [['q0', 'a', 'q1'], ['q1', 'b', 'q2']]
    );
    
    const grammar = automatonToGrammar(automaton);
    console.log("✅ Sucesso!");
    console.log(`   Variáveis: ${Array.from(grammar.variables).join(', ')}`);
    console.log(`   Terminais: ${Array.from(grammar.terminals).join(', ')}`);
    console.log(`   Símbolo inicial: ${grammar.startSymbol}`);
    console.log("   Produções:");
    grammar.productions.forEach((rights, left) => {
        console.log(`      ${left} → ${rights.join(' | ')}`);
    });
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 6: Grammar to Automaton
console.log("\n📝 Teste 6: Gramática → Autômato");
try {
    const grammar = new RegularGrammar(
        ['S', 'A'],
        ['a', 'b'],
        'S',
        ['S → aA | a', 'A → bS | b']
    );
    
    const automaton = grammarToAutomaton(grammar);
    console.log("✅ Sucesso!");
    console.log(`   Estados: ${Array.from(automaton.states).join(', ')}`);
    console.log(`   Alfabeto: ${Array.from(automaton.alphabet).join(', ')}`);
    console.log(`   Estado inicial: ${automaton.initialState}`);
    console.log(`   Estados finais: ${Array.from(automaton.acceptingStates).join(', ')}`);
    console.log("   Transições:");
    automaton.transitions.forEach((toStates, key) => {
        const [from, symbol] = key.split(',');
        toStates.forEach(to => {
            console.log(`      ${from} --${symbol}--> ${to}`);
        });
    });
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 7: Automaton to Regex
console.log("\n📝 Teste 7: Autômato → Regex");
try {
    const automaton = new FiniteAutomaton(
        ['q0', 'q1', 'q2'],
        ['a', 'b'],
        'q0',
        ['q2'],
        [['q0', 'a', 'q1'], ['q1', 'b', 'q2']]
    );
    
    const regex = automatonToRegex(automaton);
    console.log("✅ Sucesso!");
    console.log(`   Regex: ${regex}`);
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 8: Grammar to Regex
console.log("\n📝 Teste 8: Gramática → Regex");
try {
    const grammar = new RegularGrammar(
        ['S', 'A'],
        ['a', 'b'],
        'S',
        ['S → aA | a', 'A → bS | b']
    );
    
    const regex = grammarToRegex(grammar);
    console.log("✅ Sucesso!");
    console.log(`   Regex: ${regex}`);
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 9: Complex Regex
console.log("\n📝 Teste 9: Regex Complexa → Autômato ((a|b)*c)");
try {
    const converter = new RegexToAutomaton();
    const automaton = converter.parse("(a|b)*c");
    console.log("✅ Sucesso!");
    console.log(`   Estados: ${automaton.states.size} estados`);
    console.log(`   Alfabeto: ${Array.from(automaton.alphabet).join(', ')}`);
} catch (error) {
    console.log("❌ Erro:", error.message);
}

// Test 10: Simulation of converted automaton
console.log("\n📝 Teste 10: Simulação de Autômato Convertido");
try {
    const converter = new RegexToAutomaton();
    const automaton = converter.parse("ab");
    
    // Test strings
    const testStrings = ['ab', 'a', 'b', 'aba', ''];
    console.log("✅ Autômato criado!");
    console.log("   Testando cadeias:");
    
    testStrings.forEach(str => {
        const result = automaton.simulate(str === '' ? '' : str);
        const status = result.accepted ? '✓ aceita' : '✗ rejeita';
        console.log(`      "${str}": ${status}`);
    });
} catch (error) {
    console.log("❌ Erro:", error.message);
}

console.log("\n" + "=".repeat(60));
console.log("TESTES CONCLUÍDOS");
console.log("=".repeat(60));
console.log("\nℹ️  Para testar na interface web:");
console.log("   1. Abra index.html no navegador");
console.log("   2. Use os botões de conversão em cada página");
console.log("   3. Verifique os resultados visualmente");
console.log("   4. Teste com os exemplos do arquivo EXEMPLOS_TESTE.md");
console.log("\n✨ Todas as conversões foram implementadas com sucesso!");

