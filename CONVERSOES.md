# Conversões entre Regex, Autômatos e Gramáticas

Este documento descreve as funcionalidades de conversão implementadas no projeto.

## 📋 Conversões Disponíveis

### 1. **Regex → Autômato**
Converte uma expressão regular para um autômato finito não-determinístico (NFA).

**Algoritmo**: Construção de Thompson
- Suporta: concatenação, união (|), Kleene star (*), um ou mais (+)
- Cria estados e transições epsilon (ε) para cada operador
- Gera um NFA equivalente à regex

**Exemplo**:
- Regex: `ab*`
- Resultado: Autômato com transições para aceitar "a", "ab", "abb", "abbb", etc.

### 2. **Regex → Gramática**
Converte uma expressão regular para uma gramática regular unitária à direita.

**Processo**:
1. Converte regex para autômato (Thompson)
2. Converte autômato para gramática

**Exemplo**:
- Regex: `ab*`
- Gramática resultante:
  ```
  S → aA
  A → bA | ε
  ```

### 3. **Autômato → Regex**
Converte um autômato finito para uma expressão regular equivalente.

**Algoritmo**: Eliminação de Estados (simplificado)
- Combina transições entre estados
- Encontra caminhos do estado inicial para estados finais
- Gera expressão regular que representa todos os caminhos aceitos

**Exemplo**:
- Autômato: q0 --a--> q1 --b--> q2 (q2 é final)
- Regex resultante: `ab`

### 4. **Autômato → Gramática**
Converte um autômato finito para uma gramática regular unitária à direita.

**Processo**:
1. Cada estado vira uma variável (S, A, B, C...)
2. Estado inicial vira símbolo inicial
3. Cada transição `q --a--> p` vira produção `Q → aP`
4. Estados finais geram produções com ε ou terminais isolados

**Formato**: Gramática Regular à Direita (Right-Linear)
- Produções: `A → aB` ou `A → a` ou `A → ε`

**Exemplo**:
- Autômato com transições:
  ```
  q0 --a--> q1
  q1 --b--> q2 (final)
  ```
- Gramática resultante:
  ```
  S → aA
  A → bB
  B → ε
  ```

### 5. **Gramática → Autômato**
Converte uma gramática regular à direita para um autômato finito.

**Processo**:
1. Cada variável vira um estado (qS, qA, qB...)
2. Adiciona estado final especial (qF)
3. Produções `A → aB` viram transições `qA --a--> qB`
4. Produções `A → a` viram transições `qA --a--> qF`
5. Produções `A → ε` viram transições `qA --ε--> qF`

**Exemplo**:
- Gramática:
  ```
  S → aA | a
  A → bS | b
  ```
- Autômato resultante:
  ```
  qS --a--> qA
  qS --a--> qF (final)
  qA --b--> qS
  qA --b--> qF (final)
  ```

### 6. **Gramática → Regex**
Converte uma gramática regular para uma expressão regular.

**Processo**:
1. Converte gramática para autômato
2. Converte autômato para regex

**Exemplo**:
- Gramática:
  ```
  S → aA | a
  A → bS | b
  ```
- Regex resultante: `(ab)*a(b)?` (aproximado)

## 🎯 Como Usar

### Na Interface Web:

1. **Página de Regex**:
   - Digite uma expressão regular
   - Clique em "Converter para Autômato" ou "Converter para Gramática"
   - Visualize o resultado
   - Opcionalmente clique em "Usar" para carregar na página correspondente

2. **Página de Autômatos**:
   - Crie um autômato preenchendo estados, alfabeto e transições
   - Clique em "Criar Autômato"
   - Clique em "Converter para Regex" ou "Converter para Gramática"
   - Visualize o resultado

3. **Página de Gramáticas**:
   - Crie uma gramática preenchendo variáveis, terminais e produções
   - Clique em "Criar Gramática"
   - Na seção de conversões, clique em "Converter para Autômato" ou "Converter para Regex"
   - Visualize o resultado

## 📚 Exemplos de Teste

### Teste 1: Regex Simples → Autômato → Gramática

**Entrada**: `a*b`

**Passo 1**: Converter para autômato
- Estados: q0, q1, q2, q3, q4
- Transições com ε para implementar Kleene star
- Estado inicial: q0
- Estado final: q4

**Passo 2**: Converter autômato para gramática
- Variáveis: S, A, B, C, D
- Produções right-linear

### Teste 2: Gramática → Autômato → Regex

**Entrada**: Gramática
```
S → aA | a
A → bS | b
```

**Passo 1**: Converter para autômato
- Estados: qS, qA, qF
- Transições seguindo as produções

**Passo 2**: Converter autômato para regex
- Analisa caminhos e gera regex equivalente

### Teste 3: Autômato → Gramática → Autômato

**Entrada**: Autômato que aceita cadeias terminando em 'b'
```
Estados: q0, q1
Alfabeto: a, b
Inicial: q0
Finais: q1
Transições:
  q0,a,q0
  q0,b,q1
  q1,a,q0
  q1,b,q1
```

**Passo 1**: Converter para gramática
```
S → aS | bA
A → aS | bA | ε
```

**Passo 2**: Converter gramática de volta para autômato
- Deve gerar autômato equivalente (possivelmente com mais estados)

## 🔍 Verificação da Implementação de Gramáticas

✅ **Confirmado**: As gramáticas implementadas são **Regulares Unitárias à Direita (Right-Regular)**

**Formato das produções**:
- `A → aB` (terminal seguido de variável)
- `A → a` (apenas terminal)
- `A → ε` (string vazia)

**Exemplos no código**:
```javascript
// Exemplo 'alternating'
S → aA | a
A → bS | b

// Exemplo 'even-as'
S → bS | aA | ε
A → bA | aS

// Exemplo 'starts-a-ends-b'
S → aA
A → aA | bA | b
```

Todas seguem o padrão right-linear onde a variável (não-terminal) sempre aparece à direita da produção.

## 🎓 Teoria: Equivalência dos Formalismos

### Teorema de Kleene
Linguagens regulares podem ser definidas equivalentemente por:
1. Expressões regulares
2. Autômatos finitos (DFA/NFA)
3. Gramáticas regulares (linear à esquerda ou à direita)

### Propriedades das Conversões

**Regex ↔ Autômato**:
- Sempre possível (Teorema de Kleene)
- Thompson: regex → NFA em tempo O(n)
- Eliminação de estados: NFA → regex

**Autômato ↔ Gramática**:
- Conversão direta e biunívoca
- Gramáticas right-linear ≡ Autômatos finitos
- Cada transição corresponde a uma produção

**Transitividade**:
- Regex → Gramática via Autômato
- Gramática → Regex via Autômato

## 🚀 Tecnologias Utilizadas

- **JavaScript ES6+**: Classes, Maps, Sets
- **Thompson's Construction**: Construção de NFAs
- **State Elimination**: Conversão para regex (simplificada)
- **Direct Mapping**: Conversões entre autômatos e gramáticas

## 📝 Notas de Implementação

1. **Transições Epsilon**: Suportadas na representação interna dos autômatos
2. **NFAs vs DFAs**: As conversões podem gerar NFAs (mais simples)
3. **Simplificação**: O algoritmo de conversão autômato→regex é simplificado
4. **Gramáticas Complexas**: Palíndromos e estruturas não-regulares não são suportadas por autômatos/regex

## 🐛 Limitações Conhecidas

1. **Regex → Autômato**: Suporta operadores básicos (*, +, |, ()), não suporta classes de caracteres avançadas
2. **Autômato → Regex**: Algoritmo simplificado, pode gerar regexes longas para autômatos complexos
3. **Ciclos**: Autômatos com ciclos múltiplos podem gerar regexes complexas
4. **Otimização**: As conversões não otimizam o resultado final

## 📖 Referências

- **Hopcroft & Ullman**: "Introduction to Automata Theory, Languages, and Computation"
- **Thompson's Construction**: Ken Thompson (1968)
- **Kleene's Theorem**: Stephen Kleene (1956)
- **Linguagens Formais**: Teoria da Computação clássica

---

**Desenvolvido para LFTC 2025 - UNESP**

