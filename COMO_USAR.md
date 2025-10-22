# 📖 Como Usar - Trabalho LFTC

## 🎯 Início Rápido

### Abrir a Aplicação
```bash
# Método 1: Abrir diretamente
Dê duplo clique em: index.html

# Método 2: Linha de comando
start index.html        # Windows
open index.html         # Mac
xdg-open index.html     # Linux
```

---

## 📚 Funcionalidades Principais

### 1️⃣ Expressões Regulares

**Validar cadeias com regex:**
1. Vá para a página "Regex"
2. Digite uma expressão regular (ex: `a*b+`)
3. Digite cadeias de teste (uma por linha)
4. Clique "Validar"
5. Veja quais cadeias são aceitas ✓ ou rejeitadas ✗

**Operadores suportados:**
- `*` - Zero ou mais repetições
- `+` - Uma ou mais repetições
- `|` - Alternativa (ou)
- `()` - Agrupamento

**Exemplos:**
- `ab` - Aceita apenas "ab"
- `a*` - Aceita "", "a", "aa", "aaa", ...
- `a|b` - Aceita "a" ou "b"
- `(a|b)*` - Aceita qualquer combinação de a e b

---

### 2️⃣ Autômatos Finitos

**Criar e simular autômatos:**
1. Vá para a página "Autômatos"
2. Preencha:
   - **Estados**: separados por vírgula (ex: `q0,q1,q2`)
   - **Alfabeto**: símbolos separados por vírgula (ex: `a,b`)
   - **Estado Inicial**: um estado (ex: `q0`)
   - **Estados Finais**: separados por vírgula (ex: `q2`)
   - **Transições**: formato `estado,símbolo,próximo_estado`
     ```
     q0,a,q1
     q1,b,q2
     q2,a,q0
     ```
3. Clique "Criar Autômato"
4. Veja a visualização gráfica
5. Digite uma cadeia de teste
6. Clique "Simular"
7. Veja a execução passo a passo

**Recursos:**
- Visualização gráfica interativa
- Simulação passo a passo
- Suporte a NFAs (não-determinísticos)
- Transições epsilon (ε)

---

### 3️⃣ Gramáticas Regulares

**Criar e testar gramáticas:**
1. Vá para a página "Gramáticas"
2. Preencha:
   - **Variáveis**: não-terminais (ex: `S,A,B`)
   - **Terminais**: símbolos (ex: `a,b`)
   - **Símbolo Inicial**: variável inicial (ex: `S`)
   - **Produções**: formato `A → αB | β`
     ```
     S → aA | a
     A → bS | b
     ```
3. Clique "Criar Gramática"
4. Digite uma cadeia para derivar
5. Clique "Testar Derivação"
6. Veja os passos da derivação

**Formato das Produções:**
- `→` - Símbolo de produção
- `|` - Alternativas
- `ε` - String vazia

**Tipo de Gramática:**
- **Right-Linear** (à direita)
- Formato: `A → aB` ou `A → a` ou `A → ε`

---

## 🔄 Conversões (NOVO!)

### Regex → Autômato
**Uso:**
1. Digite uma regex
2. Clique "Converter para Autômato"
3. Veja o NFA gerado
4. (Opcional) Clique "Usar este Autômato"

**Algoritmo:** Construção de Thompson

---

### Regex → Gramática
**Uso:**
1. Digite uma regex
2. Clique "Converter para Gramática"
3. Veja a gramática right-linear gerada
4. (Opcional) Clique "Usar esta Gramática"

---

### Autômato → Regex
**Uso:**
1. Crie um autômato
2. Clique "Converter para Regex"
3. Veja a expressão regular equivalente
4. (Opcional) Clique "Usar esta Regex"

**Algoritmo:** Eliminação de Estados (simplificado)

---

### Autômato → Gramática
**Uso:**
1. Crie um autômato
2. Clique "Converter para Gramática"
3. Veja as produções geradas
4. (Opcional) Clique "Usar esta Gramática"

---

### Gramática → Autômato
**Uso:**
1. Crie uma gramática
2. Clique "Converter para Autômato"
3. Veja o autômato equivalente
4. (Opcional) Clique "Usar este Autômato"

---

### Gramática → Regex
**Uso:**
1. Crie uma gramática
2. Clique "Converter para Regex"
3. Veja a expressão regular equivalente
4. (Opcional) Clique "Usar esta Regex"

---

## 🎓 Exemplos Passo a Passo

### Exemplo Completo 1: Validar Regex

**Objetivo:** Validar que `a*b` aceita "b", "ab", "aab"

1. Página Regex
2. Digite regex: `a*b`
3. Digite cadeias de teste:
   ```
   b
   ab
   aab
   aaab
   a
   ba
   ```
4. Clique "Validar"
5. **Resultado esperado:**
   - ✓ b
   - ✓ ab
   - ✓ aab
   - ✓ aaab
   - ✗ a
   - ✗ ba

---

### Exemplo Completo 2: Simular Autômato

**Objetivo:** Criar autômato que aceita cadeias terminando em 'b'

1. Página Autômatos
2. Preencha:
   ```
   Estados: q0,q1
   Alfabeto: a,b
   Estado Inicial: q0
   Estados Finais: q1
   Transições:
   q0,a,q0
   q0,b,q1
   q1,a,q0
   q1,b,q1
   ```
3. Criar Autômato
4. Testar cadeias:
   - `b` → ✓ aceita
   - `ab` → ✓ aceita
   - `abb` → ✓ aceita
   - `a` → ✗ rejeita
   - `ba` → ✗ rejeita

---

### Exemplo Completo 3: Derivar com Gramática

**Objetivo:** Derivar "abab" com gramática alternando a,b

1. Página Gramáticas
2. Preencha:
   ```
   Variáveis: S,A
   Terminais: a,b
   Símbolo Inicial: S
   Produções:
   S → aA | a
   A → bS | b
   ```
3. Criar Gramática
4. Testar derivação: `abab`
5. **Passos esperados:**
   ```
   S
   ⇒ aA
   ⇒ abS
   ⇒ abaA
   ⇒ abab
   ```

---

### Exemplo Completo 4: Ciclo de Conversões

**Objetivo:** Converter Regex → Autômato → Gramática → Regex

**Passo 1: Regex Original**
1. Página Regex
2. Digite: `ab`
3. Testar cadeias: `ab` (✓), `a` (✗), `b` (✗)

**Passo 2: Converter para Autômato**
1. Clique "Converter para Autômato"
2. Observe estados gerados
3. Clique "Usar este Autômato"

**Passo 3: Simular Autômato**
1. Agora na página Autômatos
2. Simular: `ab` → deve aceitar ✓

**Passo 4: Converter para Gramática**
1. Clique "Converter para Gramática"
2. Observe produções geradas
3. Clique "Usar esta Gramática"

**Passo 5: Testar Gramática**
1. Agora na página Gramáticas
2. Derivar: `ab` → deve ter sucesso ✓

**Passo 6: Converter para Regex**
1. Clique "Converter para Regex"
2. Compare com regex original
3. Deve ser equivalente!

---

## 💡 Dicas e Truques

### Dica 1: Use Exemplos Pré-carregados
Cada página tem botões com exemplos prontos:
- Clique em um exemplo
- Campos são preenchidos automaticamente
- Teste imediatamente!

### Dica 2: Botão "Usar"
Após converter, use o botão "Usar este ..." para:
- Carregar automaticamente na página correspondente
- Visualizar graficamente (autômatos)
- Testar simulações/derivações

### Dica 3: Validação Cruzada
Para verificar equivalência:
1. Crie um objeto (regex, autômato ou gramática)
2. Converta para outro formato
3. Teste as mesmas cadeias em ambos
4. Resultados devem ser idênticos!

### Dica 4: Começar Simples
- Teste primeiro com exemplos simples
- `a`, `ab`, `a|b`, `a*`
- Depois experimente expressões mais complexas

---

## 🆘 Problemas Comuns

### "Expressão regular inválida"
**Solução:**
- Verifique parênteses balanceados
- Use apenas operadores suportados: `*`, `+`, `|`, `()`
- Não use `\d`, `\w`, `[]` (não suportados)

### "Formato inválido na transição"
**Solução:**
- Use formato: `estado,símbolo,próximo_estado`
- Sem espaços extras
- Uma transição por linha

### "Não foi possível encontrar uma derivação"
**Solução:**
- Verifique se a cadeia é aceita pela gramática
- Gramática deve ser right-linear
- Algoritmo tem limite de passos (20)

### "Autômato não criado"
**Solução:**
- Preencha todos os campos obrigatórios
- Estados e alfabeto separados por vírgula
- Estado inicial deve existir na lista de estados

---

## 📁 Estrutura de Arquivos

```
trabalho/
├── index.html              # Aplicação principal
├── script.js               # Lógica e conversões
├── README.md               # Documentação geral
├── COMO_USAR.md           # Este arquivo
├── GUIA_RAPIDO_CONVERSOES.md  # Guia de conversões
├── CONVERSOES.md          # Teoria das conversões
├── EXEMPLOS_TESTE.md      # Casos de teste
├── RESUMO_IMPLEMENTACAO.md # Resumo técnico
├── test_conversions.js    # Testes automatizados
└── ... (outros arquivos)
```

---

## 🎓 Conceitos Teóricos

### Teorema de Kleene
As seguintes linguagens são equivalentes:
- Linguagens regulares (regex)
- Autômatos finitos (DFA/NFA)
- Gramáticas regulares (right/left-linear)

**Isso significa que você pode converter entre eles sem perder informação!**

### Gramáticas Right-Linear
Formato usado neste projeto:
- `A → aB` - Terminal seguido de variável
- `A → a` - Apenas terminal
- `A → ε` - String vazia

**Por que right-linear?**
- Corresponde diretamente a autômatos finitos
- Facilita conversões automáticas
- Padrão em teoria da computação

---

## 📚 Referências Rápidas

### Operadores de Regex
| Operador | Significado | Exemplo |
|----------|-------------|---------|
| `*` | Zero ou mais | `a*` = "", "a", "aa", ... |
| `+` | Um ou mais | `a+` = "a", "aa", "aaa", ... |
| `|` | Alternativa | `a|b` = "a" ou "b" |
| `()` | Agrupamento | `(ab)*` = "", "ab", "abab", ... |

### Símbolos Especiais
| Símbolo | Uso | Onde |
|---------|-----|------|
| `→` | Produção | Gramáticas |
| `|` | Alternativa | Gramáticas/Regex |
| `ε` | String vazia | Gramáticas |
| `,` | Separador | Transições |

---

## ✨ Próximos Passos

1. ✅ Teste cada funcionalidade básica
2. ✅ Experimente as conversões
3. ✅ Compare resultados equivalentes
4. ✅ Use em estudos de LFTC
5. 🚀 Faça deploy no Firebase! (veja `INSTRUCOES_RAPIDAS.md`)

---

## 📞 Mais Informações

- **Conversões**: Veja `GUIA_RAPIDO_CONVERSOES.md`
- **Teoria**: Veja `CONVERSOES.md`
- **Testes**: Veja `EXEMPLOS_TESTE.md`
- **Deploy**: Veja `INSTRUCOES_RAPIDAS.md`

---

**🎓 Desenvolvido para LFTC 2025 - UNESP**

