# ⚡ Instruções Rápidas - Deploy Firebase

## 🚀 **5 Passos para colocar no ar:**

### 1. **Instalar Firebase CLI**
```bash
npm install -g firebase-tools
```

### 2. **Login no Firebase**
```bash
firebase login
```

### 3. **Criar projeto**
- Acesse: https://console.firebase.google.com/
- Clique "Criar um projeto"
- Nomeie (ex: `jflap-web-app`)
- Desabilite Analytics
- Clique "Criar projeto"

### 4. **Configurar localmente**
```bash
firebase init hosting
```
**Respostas:**
- Use existing project → **Sim**
- Select project → **Escolha seu projeto**
- Public directory → **`.`** (ponto)
- Single-page app → **y**
- GitHub deploys → **n**
- Overwrite index.html → **N**

### 5. **Deploy!**
```bash
firebase deploy
```

## 🌐 **Pronto!**
Sua aplicação estará em: `https://seu-projeto.web.app`

---

**📄 Para instruções detalhadas, veja `DEPLOY_FIREBASE.md`**