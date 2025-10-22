# 📚 Índice da Documentação - Trabalho LFTC 2025

## 🏠 Visão Geral

Este projeto implementa um simulador web para **Linguagens Formais e Teoria da Computação**, incluindo validação de expressões regulares, simulação de autômatos finitos, derivação de gramáticas regulares, e **conversões completas entre os três formalismos**.

---

## 📖 Guias de Documentação

### 🚀 Para Usuários

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[README.md](README.md)** | Visão geral do projeto | Primeira leitura |
| **[COMO_USAR.md](COMO_USAR.md)** | Guia completo de uso | Aprender a usar todas as funcionalidades |
| **[GUIA_RAPIDO_CONVERSOES.md](GUIA_RAPIDO_CONVERSOES.md)** | Início rápido com conversões | Usar conversões pela primeira vez |
| **[EXEMPLOS_TESTE.md](EXEMPLOS_TESTE.md)** | Casos de teste detalhados | Validar funcionalidades |

### 🔧 Para Desenvolvedores

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[CONVERSOES.md](CONVERSOES.md)** | Teoria e algoritmos de conversão | Entender implementação técnica |
| **[RESUMO_IMPLEMENTACAO.md](RESUMO_IMPLEMENTACAO.md)** | Resumo completo da implementação | Visão técnica geral |
| **[test_conversions.js](test_conversions.js)** | Testes automatizados | Validar código |

### 🚀 Para Deploy

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[INSTRUCOES_RAPIDAS.md](INSTRUCOES_RAPIDAS.md)** | Deploy rápido no Firebase | Deploy em 5 passos |
| **[DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md)** | Instruções detalhadas de deploy | Deploy completo e troubleshooting |

---

## 🎯 Leitura Recomendada por Perfil

### 👨‍🎓 Estudante de LFTC
**Objetivo:** Aprender e usar o simulador

1. ✅ **[README.md](README.md)** - Entenda o que o projeto faz
2. ✅ **[COMO_USAR.md](COMO_USAR.md)** - Aprenda a usar todas as funcionalidades
3. ✅ **[GUIA_RAPIDO_CONVERSOES.md](GUIA_RAPIDO_CONVERSOES.md)** - Use as conversões
4. ✅ **[EXEMPLOS_TESTE.md](EXEMPLOS_TESTE.md)** - Teste com exemplos práticos
5. ✅ **[CONVERSOES.md](CONVERSOES.md)** - Entenda a teoria por trás

### 👨‍💻 Desenvolvedor
**Objetivo:** Entender e modificar o código

1. ✅ **[README.md](README.md)** - Visão geral do projeto
2. ✅ **[RESUMO_IMPLEMENTACAO.md](RESUMO_IMPLEMENTACAO.md)** - Entenda a arquitetura
3. ✅ **[CONVERSOES.md](CONVERSOES.md)** - Algoritmos implementados
4. ✅ **[script.js](script.js)** - Código-fonte principal
5. ✅ **[test_conversions.js](test_conversions.js)** - Execute testes

### 👨‍🏫 Professor
**Objetivo:** Avaliar e usar em aula

1. ✅ **[README.md](README.md)** - Visão geral
2. ✅ **[CONVERSOES.md](CONVERSOES.md)** - Verifique fundamentos teóricos
3. ✅ **[RESUMO_IMPLEMENTACAO.md](RESUMO_IMPLEMENTACAO.md)** - Avalie implementação
4. ✅ **[EXEMPLOS_TESTE.md](EXEMPLOS_TESTE.md)** - Use em demonstrações
5. ✅ **[DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md)** - Hospede para a turma

### 🚀 DevOps / Deploy
**Objetivo:** Colocar online rapidamente

1. ✅ **[INSTRUCOES_RAPIDAS.md](INSTRUCOES_RAPIDAS.md)** - Deploy em 5 minutos
2. ✅ **[DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md)** - Instruções completas
3. ✅ **[README.md](README.md)** - Informações gerais

---

## 📋 Documentação por Tópico

### 🔄 Conversões

**Documentação Principal:**
- **[CONVERSOES.md](CONVERSOES.md)** - Teoria completa e algoritmos
- **[GUIA_RAPIDO_CONVERSOES.md](GUIA_RAPIDO_CONVERSOES.md)** - Guia prático de uso

**Conversões Implementadas:**
1. ✅ Regex → Autômato (Thompson's Construction)
2. ✅ Regex → Gramática (via autômato)
3. ✅ Autômato → Regex (State Elimination)
4. ✅ Autômato → Gramática (mapeamento direto)
5. ✅ Gramática → Autômato (mapeamento direto)
6. ✅ Gramática → Regex (via autômato)

### 📝 Expressões Regulares

**Onde Aprender:**
- **[COMO_USAR.md](COMO_USAR.md)** - Seção "Expressões Regulares"
- **[GUIA_RAPIDO_CONVERSOES.md](GUIA_RAPIDO_CONVERSOES.md)** - Conversões de/para regex

**Operadores Suportados:**
- `*` (Kleene star)
- `+` (um ou mais)
- `|` (união)
- `()` (agrupamento)

### 🔄 Autômatos Finitos

**Onde Aprender:**
- **[COMO_USAR.md](COMO_USAR.md)** - Seção "Autômatos Finitos"
- **[CONVERSOES.md](CONVERSOES.md)** - Conversões com autômatos

**Recursos:**
- Visualização gráfica (vis.js)
- Simulação passo a passo
- Suporte a NFA com ε-transições
- Conversões bidirecional com regex e gramáticas

### 📚 Gramáticas Regulares

**Onde Aprender:**
- **[COMO_USAR.md](COMO_USAR.md)** - Seção "Gramáticas Regulares"
- **[CONVERSOES.md](CONVERSOES.md)** - Seção sobre gramáticas

**Tipo Implementado:**
- Gramáticas **Regulares Unitárias à Direita** (Right-Linear)
- Formato: `A → aB | a | ε`

### 🧪 Testes

**Documentação de Testes:**
- **[EXEMPLOS_TESTE.md](EXEMPLOS_TESTE.md)** - Casos de teste manuais
- **[test_conversions.js](test_conversions.js)** - Testes automatizados
- **[GUIA_RAPIDO_CONVERSOES.md](GUIA_RAPIDO_CONVERSOES.md)** - Testes rápidos

**Tipos de Teste:**
- Testes unitários de conversão
- Testes de ciclo completo
- Validação de equivalência
- Casos edge

---

## 🎓 Recursos Educacionais

### Teoria da Computação

**Conceitos Abordados:**
- ✅ Linguagens Regulares
- ✅ Autômatos Finitos Determinísticos (DFA)
- ✅ Autômatos Finitos Não-Determinísticos (NFA)
- ✅ Transições Epsilon (ε-NFA)
- ✅ Gramáticas Regulares (Right-Linear)
- ✅ Expressões Regulares
- ✅ Teorema de Kleene

**Onde Estudar:**
- **[CONVERSOES.md](CONVERSOES.md)** - Seção "Teoria: Equivalência dos Formalismos"
- **[README.md](README.md)** - Seção "Conceitos Abordados"

### Algoritmos Implementados

1. **Construção de Thompson**
   - Arquivo: `script.js` (classe `RegexToAutomaton`)
   - Documentação: **[CONVERSOES.md](CONVERSOES.md)** seção "Regex → Autômato"

2. **Eliminação de Estados**
   - Arquivo: `script.js` (função `automatonToRegex`)
   - Documentação: **[CONVERSOES.md](CONVERSOES.md)** seção "Autômato → Regex"

3. **Mapeamento Autômato ↔ Gramática**
   - Arquivo: `script.js` (funções `automatonToGrammar` e `grammarToAutomaton`)
   - Documentação: **[CONVERSOES.md](CONVERSOES.md)** seções correspondentes

---

## 📁 Estrutura de Arquivos do Projeto

### Arquivos Principais
```
trabalho/
├── index.html                    # ⭐ Aplicação web principal
├── script.js                     # ⭐ Lógica e algoritmos
└── firebase.json                 # Configuração Firebase
```

### Documentação para Usuários
```
trabalho/
├── README.md                     # 📖 Visão geral
├── COMO_USAR.md                  # 📖 Guia completo de uso
├── GUIA_RAPIDO_CONVERSOES.md    # 📖 Guia rápido de conversões
└── EXEMPLOS_TESTE.md            # 📖 Casos de teste
```

### Documentação Técnica
```
trabalho/
├── CONVERSOES.md                 # 🔧 Teoria e algoritmos
├── RESUMO_IMPLEMENTACAO.md      # 🔧 Resumo técnico
└── test_conversions.js          # 🔧 Testes automatizados
```

### Documentação de Deploy
```
trabalho/
├── INSTRUCOES_RAPIDAS.md        # 🚀 Deploy rápido
├── DEPLOY_FIREBASE.md           # 🚀 Deploy detalhado
├── deploy.sh                    # 🚀 Script Linux/Mac
└── deploy.bat                   # 🚀 Script Windows
```

### Índices
```
trabalho/
└── INDICE_DOCUMENTACAO.md       # 📚 Este arquivo
```

---

## 🔍 Encontrar Informação Rapidamente

### "Como faço para..."

| Pergunta | Resposta em |
|----------|-------------|
| ...usar a aplicação? | **[COMO_USAR.md](COMO_USAR.md)** |
| ...converter regex para autômato? | **[GUIA_RAPIDO_CONVERSOES.md](GUIA_RAPIDO_CONVERSOES.md)** seção "Exemplo 1" |
| ...fazer deploy? | **[INSTRUCOES_RAPIDAS.md](INSTRUCOES_RAPIDAS.md)** |
| ...entender os algoritmos? | **[CONVERSOES.md](CONVERSOES.md)** |
| ...testar as conversões? | **[EXEMPLOS_TESTE.md](EXEMPLOS_TESTE.md)** |
| ...ver o código? | **[script.js](script.js)** linhas 103-482 (conversões) |
| ...criar um autômato? | **[COMO_USAR.md](COMO_USAR.md)** seção "Autômatos Finitos" |
| ...criar uma gramática? | **[COMO_USAR.md](COMO_USAR.md)** seção "Gramáticas Regulares" |

### "Onde está..."

| Procurando | Localização |
|------------|-------------|
| ...classe RegexToAutomaton? | **script.js** linhas 107-281 |
| ...função automatonToGrammar? | **script.js** linhas 294-355 |
| ...função grammarToAutomaton? | **script.js** linhas 358-409 |
| ...handlers de UI? | **script.js** linhas 1189-1506 |
| ...botões de conversão? | **index.html** linhas 209-233, 364-388, 507-531 |
| ...exemplos de teste? | **[EXEMPLOS_TESTE.md](EXEMPLOS_TESTE.md)** |
| ...instruções de deploy? | **[DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md)** |

---

## 🏆 Checklist de Recursos

### Funcionalidades Principais
- ✅ Validação de Expressões Regulares
- ✅ Simulação de Autômatos Finitos
- ✅ Derivação de Gramáticas Regulares
- ✅ Visualização gráfica de autômatos
- ✅ Simulação passo a passo

### Conversões (NOVO! 2025)
- ✅ Regex → Autômato
- ✅ Regex → Gramática
- ✅ Autômato → Regex
- ✅ Autômato → Gramática
- ✅ Gramática → Autômato
- ✅ Gramática → Regex

### Documentação
- ✅ README geral
- ✅ Guia de uso completo
- ✅ Guia rápido de conversões
- ✅ Casos de teste
- ✅ Teoria das conversões
- ✅ Resumo de implementação
- ✅ Instruções de deploy
- ✅ Índice de documentação (este arquivo)

### Testes
- ✅ Testes manuais documentados
- ✅ Testes automatizados (script)
- ✅ Exemplos pré-carregados na interface

---

## 📞 Suporte e Contato

### Reportar Problemas
1. Verifique a seção "Problemas Comuns" em **[COMO_USAR.md](COMO_USAR.md)**
2. Revise os exemplos em **[EXEMPLOS_TESTE.md](EXEMPLOS_TESTE.md)**
3. Consulte a teoria em **[CONVERSOES.md](CONVERSOES.md)**

### Dúvidas sobre Uso
- Leia: **[COMO_USAR.md](COMO_USAR.md)**
- Veja: **[GUIA_RAPIDO_CONVERSOES.md](GUIA_RAPIDO_CONVERSOES.md)**

### Dúvidas Técnicas
- Leia: **[CONVERSOES.md](CONVERSOES.md)**
- Veja: **[RESUMO_IMPLEMENTACAO.md](RESUMO_IMPLEMENTACAO.md)**
- Código: **[script.js](script.js)**

### Deploy
- Rápido: **[INSTRUCOES_RAPIDAS.md](INSTRUCOES_RAPIDAS.md)**
- Completo: **[DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md)**

---

## 🎯 Próximos Passos

### 1. Para Começar
1. ✅ Leia **[README.md](README.md)**
2. ✅ Abra `index.html` no navegador
3. ✅ Siga **[COMO_USAR.md](COMO_USAR.md)**

### 2. Para Aprender
1. ✅ Use os exemplos pré-carregados
2. ✅ Teste as conversões com **[GUIA_RAPIDO_CONVERSOES.md](GUIA_RAPIDO_CONVERSOES.md)**
3. ✅ Estude a teoria em **[CONVERSOES.md](CONVERSOES.md)**

### 3. Para Desenvolver
1. ✅ Leia **[RESUMO_IMPLEMENTACAO.md](RESUMO_IMPLEMENTACAO.md)**
2. ✅ Estude o código em **[script.js](script.js)**
3. ✅ Execute **[test_conversions.js](test_conversions.js)**

### 4. Para Deploy
1. ✅ Siga **[INSTRUCOES_RAPIDAS.md](INSTRUCOES_RAPIDAS.md)**
2. ✅ Ou **[DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md)** para detalhes

---

## ✨ Destaques do Projeto

### 🏆 Completo e Funcional
- 3 formalismos implementados
- 6 conversões bidirecionais
- Interface web responsiva
- Visualização gráfica
- Simulação interativa

### 📚 Bem Documentado
- 8+ arquivos de documentação
- Exemplos práticos
- Teoria fundamentada
- Testes completos

### 🎓 Educacional
- Interface intuitiva
- Exemplos pré-carregados
- Passo a passo visual
- Teoria integrada

### 🚀 Pronto para Produção
- Deploy simples (Firebase)
- Código limpo
- Zero dependências npm
- Funciona offline

---

## 📊 Estatísticas do Projeto

- **Linhas de Código**: ~1500 linhas (JavaScript + HTML)
- **Documentação**: ~3000 linhas (Markdown)
- **Arquivos de Documentação**: 8 arquivos
- **Conversões Implementadas**: 6 conversões
- **Testes**: 10+ casos de teste
- **Exemplos**: 15+ exemplos pré-carregados

---

## 🎓 Créditos

**Desenvolvido para**: LFTC - Linguagens Formais e Teoria da Computação  
**Instituição**: UNESP - Universidade Estadual Paulista  
**Ano**: 2025

**Equipe**:
- Bruno Augusto Furquim
- Luiz Henrique Cruz dos Santos
- Rafael Bassi Rosseto

---

## 📖 Licença

Este projeto é de código aberto para fins educacionais.

---

**🎉 Obrigado por usar o Simulador LFTC!**

Para começar, abra **[README.md](README.md)** ou **[COMO_USAR.md](COMO_USAR.md)**.

