# 🚀 Deploy no Firebase Hosting - JFLAP Web

Este guia te ajudará a hospedar a aplicação JFLAP Web no Firebase Hosting de forma gratuita.

## 📋 Pré-requisitos

1. **Conta Google** - Para acessar o Firebase Console
2. **Node.js** instalado - [Download aqui](https://nodejs.org/)
3. **Firebase CLI** - Será instalado no processo

## 🛠️ Passo a Passo

### 1️⃣ **Instalar Firebase CLI**

Abra o terminal/prompt de comando e execute:

```bash
npm install -g firebase-tools
```

### 2️⃣ **Fazer login no Firebase**

```bash
firebase login
```

- Isso abrirá seu navegador para fazer login com sua conta Google
- Autorize o Firebase CLI a acessar sua conta

### 3️⃣ **Criar projeto no Firebase Console**

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Criar um projeto"**
3. Digite um nome para o projeto (ex: `jflap-web-app`)
4. **Desabilite** o Google Analytics (não é necessário para este projeto)
5. Clique em **"Criar projeto"**
6. Aguarde a criação e clique em **"Continuar"**

### 4️⃣ **Configurar o projeto localmente**

No terminal, navegue até a pasta do projeto e execute:

```bash
firebase init hosting
```

**Respostas para as perguntas:**

1. **"Please select an option:"** → Escolha **"Use an existing project"**
2. **"Select a default Firebase project:"** → Escolha o projeto que você criou
3. **"What do you want to use as your public directory?"** → Digite **`.`** (ponto)
4. **"Configure as a single-page app?"** → Digite **`y`** (yes)
5. **"Set up automatic builds and deploys with GitHub?"** → Digite **`n`** (no)
6. **"File index.html already exists. Overwrite?"** → Digite **`N`** (no)

### 5️⃣ **Fazer o deploy**

```bash
firebase deploy
```

Aguarde o processo finalizar. Você verá uma mensagem similar a:

```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/seu-projeto/overview
Hosting URL: https://seu-projeto.web.app
```

## 🌐 **Acessar a aplicação**

Sua aplicação estará disponível em:
- **URL principal:** `https://seu-projeto.web.app`
- **URL alternativa:** `https://seu-projeto.firebaseapp.com`

## 🔄 **Atualizações futuras**

Sempre que fizer alterações no código:

1. **Salve todas as alterações** nos arquivos
2. **Execute o deploy novamente:**
   ```bash
   firebase deploy
   ```
3. **Aguarde** a conclusão (geralmente 1-2 minutos)
4. **Acesse** a URL para ver as mudanças

## ⚙️ **Configurações importantes**

### **Controle de acesso às páginas:**

Para alterar quais páginas estão acessíveis, edite o arquivo `script.js` (linhas 25-29):

```javascript
let pageAccess = {
    regex: true,        // true = habilitado, false = desabilitado
    automaton: false,   // Atualmente desabilitado
    grammar: false      // Atualmente desabilitado
};
```

Após alterar, faça o deploy novamente com `firebase deploy`.

## 🆓 **Limites do plano gratuito**

O Firebase Hosting oferece generosamente:
- **10 GB** de armazenamento
- **360 MB/dia** de transferência de dados
- **SSL gratuito** (HTTPS automático)
- **CDN global** (carregamento rápido mundial)

Para uma aplicação como esta, o plano gratuito é mais que suficiente.

## 🔧 **Comandos úteis**

```bash
# Ver projetos disponíveis
firebase projects:list

# Ver informações do deploy atual
firebase hosting:sites:list

# Servir localmente para testes (opcional)
firebase serve

# Ver logs de deploy
firebase deploy --debug
```

## 🚨 **Resolução de problemas**

### **Erro: "Firebase CLI not found"**
```bash
npm install -g firebase-tools
```

### **Erro: "Not logged in"**
```bash
firebase login
```

### **Erro: "Permission denied"**
- Verifique se você tem permissões de administrador no projeto Firebase

### **Erro: "Project not found"**
- Verifique se o nome do projeto no `.firebaserc` está correto
- Execute `firebase use --add` para selecionar o projeto correto

## 📱 **Testando em dispositivos**

Após o deploy, você pode testar a aplicação em:
- **Desktop** - Qualquer navegador moderno
- **Mobile** - Funciona perfeitamente em smartphones
- **Tablet** - Interface responsiva se adapta automaticamente

## ✅ **Checklist final**

- [ ] Firebase CLI instalado
- [ ] Login feito no Firebase
- [ ] Projeto criado no Firebase Console
- [ ] `firebase init hosting` executado
- [ ] `firebase deploy` executado com sucesso
- [ ] Aplicação acessível na URL fornecida
- [ ] Testado em diferentes dispositivos

---

**🎉 Parabéns! Sua aplicação JFLAP Web está no ar!**

Compartilhe a URL com seus colegas e professores para que possam usar a ferramenta de estudos de Linguagens Formais.