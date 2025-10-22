# Guia Rápido: Conversões entre Regex, Autômatos e Gramáticas

## 🚀 Início Rápido

### 1. Abrir a Aplicação
```bash
# Abra o arquivo index.html no seu navegador
# Recomendado: Chrome, Firefox, Edge
```

---

## 📝 Exemplos Rápidos

### Exemplo 1: Converter Regex para Autômato (30 segundos)

1. **Abra a página "Regex"** (menu superior)
2. Digite a regex: `ab*`
3. Clique em **"Converter para Autômato"**
4. ✅ Veja o autômato resultante!
5. (Opcional) Clique em **"Usar este Autômato"** para visualizá-lo graficamente

**O que você verá:**
- Estados gerados (q0, q1, q2...)
- Alfabeto extraído (a, b)
- Transições (incluindo ε-transições)

---

### Exemplo 2: Converter Autômato para Gramática (1 minuto)

1. **Abra a página "Autômatos"**
2. Use o exemplo pré-carregado ou preencha:
   - Estados: `q0,q1,q2`
   - Alfabeto: `a,b`
   - Estado Inicial: `q0`
   - Estados Finais: `q2`
   - Transições: `q0,a,q1` (uma por linha)
                `q1,b,q2`
3. Clique em **"Criar Autômato"**
4. Role até "🔄 Conversões"
5. Clique em **"Converter para Gramática"**
6. ✅ Veja as produções da gramática!

**O que você verá:**
- Variáveis (S, A, B...)
- Terminais (a, b)
- Produções right-linear (S → aA, A → b, etc.)

---

### Exemplo 3: Converter Gramática para Autômato (1 minuto)

1. **Abra a página "Gramáticas"**
2. Use o exemplo pré-carregado ou preencha:
   - Variáveis: `S,A`
   - Terminais: `a,b`
   - Símbolo Inicial: `S`
   - Produções:
     ```
     S → aA | a
     A → bS | b
     ```
3. Clique em **"Criar Gramática"**
4. Na seção "🔄 Conversões"
5. Clique em **"Converter para Autômato"**
6. ✅ Veja o autômato resultante!

---

## 🔄 Todas as Conversões Disponíveis

### Partindo de REGEX:
- **Regex → Autômato**: Construção de Thompson (cria NFA)
- **Regex → Gramática**: Cria gramática right-linear equivalente

### Partindo de AUTÔMATO:
- **Autômato → Regex**: Extrai expressão regular equivalente
- **Autômato → Gramática**: Cria gramática right-linear

### Partindo de GRAMÁTICA:
- **Gramática → Autômato**: Cria autômato finito equivalente
- **Gramática → Regex**: Extrai expressão regular

---

## 🎯 Casos de Uso Práticos

### Caso 1: "Quero ver o autômato de uma regex"
1. Página Regex → Digite a regex
2. Converter para Autômato
3. Usar este Autômato → Visualização gráfica!

### Caso 2: "Quero a gramática de um autômato"
1. Página Autômatos → Crie o autômato
2. Converter para Gramática
3. Veja as produções

### Caso 3: "Quero a regex de uma gramática"
1. Página Gramáticas → Crie a gramática
2. Converter para Regex
3. Use a regex na página Regex para testar

### Caso 4: "Ciclo completo de conversões"
1. Regex → Autômato
2. Autômato → Gramática
3. Gramática → Regex
4. Compare as regexes inicial e final!

---

## 💡 Dicas Importantes

### ✅ O que funciona:
- Regex simples: `a`, `ab`, `abc`
- Kleene star: `a*`, `(ab)*`
- Um ou mais: `a+`, `(a|b)+`
- União: `a|b`, `a|b|c`
- Concatenação: `abc`, `a(bc)*`
- Agrupamento: `(a|b)*c`

### ⚠️ Limitações:
- Regex muito complexas podem gerar autômatos grandes
- Conversão Autômato → Regex é simplificada
- Gramáticas devem ser right-linear (formato suportado)

### 🎓 Formato de Gramáticas:
Apenas gramáticas **regulares à direita** são suportadas:
- ✅ `S → aA` (terminal seguido de variável)
- ✅ `S → a` (apenas terminal)
- ✅ `S → ε` (string vazia)
- ❌ `S → Aa` (left-linear - não suportado)
- ❌ `S → aSb` (context-free - não regular)

---

## 🧪 Testando as Conversões

### Fluxo de Teste Completo:

**Passo 1: Regex Original**
- Regex: `a*b`
- Testar cadeias: `b`, `ab`, `aab`, `a` (deve rejeitar)

**Passo 2: Converter para Autômato**
- Clique em "Converter para Autômato"
- Use o autômato gerado
- Simule as mesmas cadeias
- ✅ Resultados devem ser idênticos!

**Passo 3: Converter Autômato para Gramática**
- Na página de Autômatos
- Clique em "Converter para Gramática"
- Use a gramática gerada

**Passo 4: Testar Derivações**
- Na página de Gramáticas
- Teste derivar: `b`, `ab`, `aab`
- ✅ Deve derivar as mesmas cadeias!

**Passo 5: Voltar para Regex**
- Clique em "Converter para Regex"
- Compare com a regex original
- ✅ Devem ser equivalentes (podem ter sintaxe diferente)

---

## 📊 Checklist Rápido

Teste cada conversão pelo menos uma vez:

- [ ] Regex → Autômato
- [ ] Regex → Gramática
- [ ] Autômato → Regex
- [ ] Autômato → Gramática
- [ ] Gramática → Autômato
- [ ] Gramática → Regex

Teste um ciclo completo:
- [ ] Regex → Autômato → Gramática → Autômato
- [ ] Regex → Autômato → Gramática → Regex

---

## 🎯 Exemplos Prontos para Teste

### Teste Rápido 1:
```
Regex: ab
Resultado Autômato: ~4 estados com transições a e b
Resultado Gramática: S → aA, A → b
```

### Teste Rápido 2:
```
Regex: a*
Resultado Autômato: ~3 estados com loop em a
Resultado Gramática: S → aS | ε
```

### Teste Rápido 3:
```
Regex: a|b
Resultado Autômato: ~5 estados com bifurcação
Resultado Gramática: S → a | b
```

### Teste Rápido 4:
```
Gramática: S → aA | a, A → bS | b
Resultado Autômato: 3 estados (qS, qA, qF)
Resultado Regex: Cadeias alternando a e b
```

---

## 🆘 Solução de Problemas

### Problema: "Não aparece o botão de conversão"
**Solução**: 
1. Certifique-se de ter criado o objeto primeiro
2. Para Regex: basta digitar a regex
3. Para Autômato: clique em "Criar Autômato"
4. Para Gramática: clique em "Criar Gramática"

### Problema: "Erro ao converter"
**Solução**:
1. Verifique se a entrada está correta
2. Regex: use apenas operadores suportados (*, +, |, ())
3. Autômato: verifique formato das transições
4. Gramática: use formato right-linear

### Problema: "Conversão gera resultado estranho"
**Solução**:
1. Isso é normal! Conversões podem gerar estruturas diferentes
2. O importante é que sejam equivalentes (aceitem as mesmas cadeias)
3. Teste simulando/derivando as mesmas cadeias

---

## 📚 Quer Saber Mais?

- **Teoria Detalhada**: Veja `CONVERSOES.md`
- **Casos de Teste**: Veja `EXEMPLOS_TESTE.md`
- **Resumo Completo**: Veja `RESUMO_IMPLEMENTACAO.md`
- **Testes Automatizados**: Execute `test_conversions.js`

---

## ✨ Pronto para Começar!

1. **Abra index.html no navegador**
2. **Escolha uma página** (Regex, Autômatos ou Gramáticas)
3. **Crie/Digite seu objeto**
4. **Clique em um botão de conversão**
5. **Veja o resultado!**

É simples assim! 🎉

---

**Desenvolvido para LFTC 2025 - UNESP**  
Linguagens Formais e Teoria da Computação

