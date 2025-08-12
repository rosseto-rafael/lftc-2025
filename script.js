// Global variables (apenas para regex na PRIMEIRA ENTREGA)

// =================================
// PAGE ROUTING - PRIMEIRA ENTREGA (apenas Regex)
// =================================

// Page routing
function showPage(pageId, event = null) {
    // Na primeira entrega, apenas home e regex são permitidas
    if (pageId !== 'home' && pageId !== 'regex') {
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
            'regex': 'regex'
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
// REGEX VALIDATOR - PRIMEIRA ENTREGA
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
// INITIALIZATION - PRIMEIRA ENTREGA
// =================================

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show home page
    showPage('home');
    
    // Pre-load example regex for quick testing
    setTimeout(() => {
        document.getElementById('regex-input').value = 'a*b+';
        document.getElementById('test-strings').value = 'b\nbb\nab\naab\naaabb\na\nba\naba\n';
    }, 100);
});

// Handle navigation clicks on title
document.addEventListener('click', function(event) {
    if (event.target.textContent === 'Trabalho LFTC') {
        showPage('home');
    }
});