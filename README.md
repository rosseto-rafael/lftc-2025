# TRABALHO LFTC

Uma aplicação web minimalista para estudar e experimentar com expressões regulares, autômatos finitos e gramáticas regulares.

## 🚀 Como usar

### 📱 **Uso Local:**
1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Navegue entre as diferentes funcionalidades usando o menu superior

### 🌐 **Deploy Online (Firebase Hosting):**
1. Siga as instruções detalhadas no arquivo `DEPLOY_FIREBASE.md`
2. Hospede gratuitamente no Firebase e acesse de qualquer lugar

## 📋 Funcionalidades

### 🔹 Validador de Expressões Regulares
- Insira uma expressão regular usando operadores básicos: `*`, `+`, `|`, `()`
- Teste múltiplas cadeias de entrada
- Visualize quais cadeias são aceitas ou rejeitadas

### 🔹 Simulador de Autômatos Finitos (não desenvolvido)
- Defina estados, alfabeto, estado inicial e estados de aceitação
- Especifique transições no formato: `estado,símbolo,próximo_estado`
- Visualize o autômato graficamente
- Simule a execução passo a passo com qualquer cadeia de entrada

### 🔹 Simulador de Gramáticas Regulares (não desenvolvido)
- Defina variáveis (não-terminais) e terminais
- Especifique produções usando `→` e `|` para alternativas
- Use `ε` para representar a string vazia
- Teste derivações passo a passo

## 🎯 Exemplos Pré-carregados

A aplicação vem com exemplos pré-carregados para facilitar o teste:

- **Regex**: `a*b+` (zero ou mais 'a' seguidos de um ou mais 'b')
- **Autômato**: Aceita cadeias que terminam com 'b' após uma sequência de 'a' e 'b'
- **Gramática**: Gera cadeias alternando 'a' e 'b'

## 💻 Tecnologias Utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3 + Tailwind CSS** - Estilização responsiva
- **JavaScript (Vanilla)** - Lógica da aplicação
- **Vis.js Network** - Visualização gráfica dos autômatos

## 🎓 Uso Educacional

Esta aplicação foi desenvolvida para fins educacionais, especialmente para estudantes de:
- Teoria da Computação
- Linguagens Formais e Autômatos
- Compiladores
- Ciência da Computação

## 📱 Responsividade

A interface é totalmente responsiva e funciona em dispositivos móveis, tablets e desktops.

---

**Desenvolvido para estudos de Linguagens Formais e Teoria da Computação**