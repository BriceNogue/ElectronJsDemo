<template>
    <div class="register-container">
        <h2>Créer un compte</h2>
        <form @submit.prevent="register">
            <div>
                <label for="name">Nom</label>
                <input type="text" id="name" class="uk-input" v-model="form.name" required />
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" class="uk-input" v-model="form.email" required />
            </div>
            <div>
                <label for="password">Mot de passe</label>
                <input type="password" id="password" class="uk-input" v-model="form.password" required />
            </div>
            <div>
                <label for="confirmPassword">Confirmer le mot de passe</label>
                <input type="password" id="confirmPassword" class="uk-input" v-model="form.confirmPassword" required />
            </div>
            <button type="submit">Créer un compte</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            error: ''
        }
    },
    methods: {
        register() {
            this.error = '';
            if (this.form.password !== this.form.confirmPassword) {
                this.error = "Les mots de passe ne correspondent pas.";
                return;
            }
            alert('Compte créé avec succès !');
        }
    }
}
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 24px;
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
    font-weight: 500;
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
    font-size: 16px;
}
.error {
    color: #d32f2f;
    margin-top: 12px;
}
</style>