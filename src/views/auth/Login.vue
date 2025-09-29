<template>
    <div class="login-container">
        <h2>Connexion</h2>
        <p v-if="message" class="error">{{ message }}</p>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" class="form-input" required />
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" id="password" class="form-input" required />
            </div>
            <button type="submit">Se connecter</button>
            <router-link to="/register">Mot de passe oublié ?</router-link>
            <p>Pas de compte ? <router-link to="/register">S'inscrire</router-link></p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            message: ''
        };
    },
    methods: {
        async login() {
            try{
                const requestBody = {
                    email: this.email,
                    password: this.password
                };

                const res = await fetch('http://127.0.0.1:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                const jsonResponse = await res.json();
                if (jsonResponse.code != 200) {      
                    this.message = jsonResponse.message || "Identifiants invalides.";
                } else {
                    const Token = jsonResponse.data;
                    this.$router.push('/articles');
                }
            }
            catch(error){
                this.error = "Erreur de connexion.";
                console.error('Login error:', error);
            }
        }
    }
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 60px auto;
    padding: 32px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
}
.form-group {
    margin-bottom: 16px;
}
label {
    display: block;
    margin-bottom: 6px;
}
input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
button {
    width: 100%;
    padding: 10px;
    background: #1976d2;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.error {
    color: #d32f2f;
    margin-top: 12px;
    text-align: center;
}
</style>