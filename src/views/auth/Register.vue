<template>
    <div class="register-container">
        <h3 class="uk-text-center">Créer un compte</h3>
        <p v-if="message" class="error">{{ message }}</p>
        <form @submit.prevent="nextStep">
            <div class="progress-indicator">
                <span v-for="n in 3" :key="n"
                    :class="['step-dot', { active: step === n, completed: step > n }]">
                    {{ n }}
                </span>
            </div>
            <div v-if="step === 1">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="uk-input" v-model="user.email" required placeholder="nom@exemple.com" />
                </div>
                <div class="form-group">
                    <label for="pseudo">Pseudo</label>
                    <input type="text" id="pseudo" class="uk-input" v-model="user.pseudo" required />
                </div>
                <button type="button" @click="nextStep">Suivant</button>
            </div>
            <div v-else-if="step === 2">
                <div class="form-group">
                    <label for="cityCode">Code Postal</label>
                    <input type="text" id="cityCode" class="uk-input" v-model="user.cityCode" required />
                </div>
                <div class="form-group">
                    <label for="city">Ville</label>
                    <input type="text" id="city" class="uk-input" v-model="user.city" required />
                </div>
                <div class="form-group">
                    <button type="button" @click="prevStep" style="margin-bottom: 5px;">Précédent</button>
                    <button type="button" @click="nextStep">Suivant</button>
                </div>
            </div>
            <div v-else-if="step === 3">
                <div class="form-group">
                    <label for="phone">Téléphone</label>
                    <input type="text" id="phone" class="uk-input" v-model="user.phone" required />
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" class="uk-input" v-model="user.password" required />
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirmer le mot de passe</label>
                    <input type="password" id="confirmPassword" class="uk-input" v-model="user.passwordConfirm" required />
                </div>
                <div class="form-group">
                    <button type="button" @click="prevStep" style="margin-bottom: 5px;">Précédent</button>
                    <button type="submit">Créer un compte</button>
                </div>
            </div>
            <p>Déjà un compte ? <router-link to="/">Se connecter</router-link></p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            step: 1,
            user: {
                email: '',
                pseudo: '',
                cityCode: '',
                city: '',
                phone: '',
                password: '',
                passwordConfirm: '',
            },
            message: ''
        }
    },
    methods: {
        async nextStep() {
            if (this.step < 3) {
                this.step++;
            } else {
                await this.register();
            }
        },

        prevStep() {
            if (this.step > 1) {
                this.step--;
            }
        },

        async register() {
            if (this.user.password !== this.user.passwordConfirm) {
                this.message = "Les mots de passe ne correspondent pas.";
                return;
            }

            this.message = '';
            
            const requestBody = {
                email: this.user.email,
                pseudo: this.user.pseudo,
                cityCode: this.user.cityCode,
                city: this.user.city,
                phone: this.user.phone,
                password: this.user.password,
                passwordConfirm: this.user.passwordConfirm
            };

            const res = await fetch('http://127.0.0.1:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            const jsonResponse = await res.json();
            if (jsonResponse.code === "200") {      
                this.message = jsonResponse.message || "Compte créé avec succès !";
                this.$router.push('/');
            }
            else {
                this.message = jsonResponse.message || "Erreur lors de la création du compte.";
                return;
            }
        }
    }
}
</script>

<style scoped>
.progress-indicator {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    gap: 12px;
}

.step-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #e0e0e0;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    transition: background 0.2s, color 0.2s;
}

.step-dot.active {
    background: #1976d2;
    color: #fff;
    box-shadow: 0 0 0 2px #1976d233;
}

.step-dot.completed {
    background: #43a047;
    color: #fff;
}
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