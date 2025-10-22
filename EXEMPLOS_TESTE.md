# Exemplos de Teste para as Conversões

Este documento contém exemplos práticos para testar todas as conversões implementadas.

## 🧪 Testes de Conversão

### Teste 1: Regex → Autômato (Simples)

**Entrada (Regex)**:
```
ab
```

**Passos**:
1. Acesse a página "Regex"
2. Digite `ab` no campo de expressão regular
3. Clique em "Converter para Autômato"

**Resultado Esperado**:
- Autômato com aproximadamente 4 estados
- Estado inicial: q0
- Estado final: q3
- Transições:
  - q0 --a--> q1
  - q1 --ε--> q2
  - q2 --b--> q3

---

### Teste 2: Regex → Autômato (Kleene Star)

**Entrada (Regex)**:
```
a*
```

**Passos**:
1. Digite `a*` no campo de expressão regular
2. Clique em "Converter para Autômato"

**Resultado Esperado**:
- Autômato com estados e transições epsilon
- Aceita: ε, a, aa, aaa, ...

---

### Teste 3: Regex → Autômato (União)

**Entrada (Regex)**:
```
a|b
```

**Passos**:
1. Digite `a|b`
2. Clique em "Converter para Autômato"

**Resultado Esperado**:
- Autômato com estados para ambas alternativas
- Aceita: a, b
- Rejeita: ab, aa, bb

---

### Teste 4: Regex → Autômato (Combinado)

**Entrada (Regex)**:
```
(a|b)*c
```

**Passos**:
1. Digite `(a|b)*c`
2. Clique em "Converter para Autômato"

**Resultado Esperado**:
- Autômato complexo com múltiplos estados
- Aceita: c, ac, bc, aac, abc, bbc, aaac, ...
- Rejeita: a, b, ab, ca, cb

---

### Teste 5: Regex → Gramática

**Entrada (Regex)**:
```
ab*
```

**Passos**:
1. Digite `ab*`
2. Clique em "Converter para Gramática"

**Resultado Esperado**:
- Gramática regular à direita
- Exemplo de produções:
  ```
  S → aA
  A → bA | ε
  ```

**Validação**:
- Cadeias aceitas: a, ab, abb, abbb, ...
- Use a gramática na página de Gramáticas para testar derivações

---

### Teste 6: Autômato → Regex

**Entrada (Autômato)**:
```
Estados: q0,q1,q2
Alfabeto: a,b
Estado Inicial: q0
Estados Finais: q2
Transições:
q0,a,q1
q1,b,q2
```

**Passos**:
1. Acesse a página "Autômatos"
2. Preencha os campos conforme acima
3. Clique em "Criar Autômato"
4. Clique em "Converter para Regex"

**Resultado Esperado**:
- Regex: `ab`

**Validação**:
- Simule cadeias: ab (aceita), a (rejeita), b (rejeita), aba (rejeita)

---

### Teste 7: Autômato → Gramática

**Entrada (Autômato)**:
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

**Passos**:
1. Preencha os campos do autômato
2. Clique em "Criar Autômato"
3. Clique em "Converter para Gramática"

**Resultado Esperado**:
- Gramática regular à direita
- Exemplo de produções:
  ```
  S → aS | bA
  A → aS | bA | ε
  ```

**Validação**:
- Cadeias aceitas: cadeias que terminam com 'b'
- Use a gramática para derivar: b, ab, bb, aab, abb, etc.

---

### Teste 8: Gramática → Autômato

**Entrada (Gramática)**:
```
Variáveis: S,A
Terminais: a,b
Símbolo Inicial: S
Produções:
S → aA | a
A → bS | b
```

**Passos**:
1. Acesse a página "Gramáticas"
2. Preencha os campos conforme acima
3. Clique em "Criar Gramática"
4. Clique em "Converter para Autômato"

**Resultado Esperado**:
- Autômato com estados: qS, qA, qF
- Estado inicial: qS
- Estado final: qF
- Transições:
  - qS --a--> qA
  - qS --a--> qF
  - qA --b--> qS
  - qA --b--> qF

**Validação**:
- Use o autômato para simular: a (aceita), ab (aceita), aba (aceita), abab (aceita)
- Cadeias rejeitadas: b, aa, ba

---

### Teste 9: Gramática → Regex

**Entrada (Gramática)**:
```
Variáveis: S,A
Terminais: a,b
Símbolo Inicial: S
Produções:
S → aA | a
A → bS | b
```

**Passos**:
1. Preencha os campos da gramática
2. Clique em "Criar Gramática"
3. Clique em "Converter para Regex"

**Resultado Esperado**:
- Regex que representa a linguagem: cadeias que alternam 'a' e 'b', começando com 'a'
- Possível resultado: `a(ba)*b?` ou similar

**Validação**:
- Use a regex na página de Regex para validar cadeias

---

### Teste 10: Ciclo Completo (Regex → Autômato → Gramática → Autômato)

**Entrada (Regex)**:
```
a+b*
```

**Passos**:
1. **Passo 1**: Regex → Autômato
   - Digite `a+b*`
   - Clique em "Converter para Autômato"
   - Clique em "Usar este Autômato"

2. **Passo 2**: Autômato → Gramática
   - Na página de Autômatos, clique em "Converter para Gramática"
   - Clique em "Usar esta Gramática"

3. **Passo 3**: Gramática → Autômato
   - Na página de Gramáticas, clique em "Converter para Autômato"
   - Compare com o autômato original

**Resultado Esperado**:
- Ambos autômatos devem aceitar as mesmas cadeias
- Teste cadeias: a (aceita), ab (aceita), abb (aceita), aab (aceita)
- Cadeias rejeitadas: ε, b, ba

---

## 🎯 Casos de Teste Específicos

### Caso 1: String Vazia

**Regex**: `a*` (aceita ε)

**Teste**:
1. Converter para autômato
2. Verificar se tem transição direta ao estado final ou produção S → ε

---

### Caso 2: Concatenação Múltipla

**Regex**: `abc`

**Teste**:
1. Converter para autômato
2. Verificar sequência de 3 transições
3. Converter para gramática
4. Verificar produções encadeadas: S → aA, A → bB, B → c

---

### Caso 3: União Múltipla

**Regex**: `a|b|c`

**Teste**:
1. Converter para autômato
2. Verificar 3 caminhos paralelos
3. Converter para gramática
4. Verificar produções: S → a | b | c

---

### Caso 4: Expressão Complexa

**Regex**: `(a|b)*c(d|e)+`

**Teste**:
1. Converter para autômato
2. Verificar complexidade do autômato
3. Testar simulação de cadeias
4. Converter para gramática

---

## 📊 Matriz de Compatibilidade

| Conversão | Status | Observações |
|-----------|--------|-------------|
| Regex → Autômato | ✅ | Thompson's Construction |
| Regex → Gramática | ✅ | Via autômato intermediário |
| Autômato → Regex | ✅ | State Elimination (simplificado) |
| Autômato → Gramática | ✅ | Mapeamento direto |
| Gramática → Autômato | ✅ | Mapeamento direto |
| Gramática → Regex | ✅ | Via autômato intermediário |

---

## 🔍 Verificações de Qualidade

### Para cada conversão, verifique:

1. **Correção**: A linguagem aceita é a mesma?
2. **Completude**: Todas as construções são suportadas?
3. **Visualização**: Os resultados são exibidos claramente?
4. **Usabilidade**: É fácil usar o objeto convertido?

### Testes de Validação:

Para cada exemplo, teste pelo menos 5 cadeias:
- 2 que devem ser aceitas
- 2 que devem ser rejeitadas
- 1 caso edge (ε, cadeia muito longa, etc.)

---

## 📝 Checklist de Teste

- [ ] Teste 1: Regex → Autômato (Simples)
- [ ] Teste 2: Regex → Autômato (Kleene Star)
- [ ] Teste 3: Regex → Autômato (União)
- [ ] Teste 4: Regex → Autômato (Combinado)
- [ ] Teste 5: Regex → Gramática
- [ ] Teste 6: Autômato → Regex
- [ ] Teste 7: Autômato → Gramática
- [ ] Teste 8: Gramática → Autômato
- [ ] Teste 9: Gramática → Regex
- [ ] Teste 10: Ciclo Completo
- [ ] Caso 1: String Vazia
- [ ] Caso 2: Concatenação Múltipla
- [ ] Caso 3: União Múltipla
- [ ] Caso 4: Expressão Complexa

---

**Status**: Implementação completa ✅
**Data**: 2025
**Projeto**: LFTC - UNESP

