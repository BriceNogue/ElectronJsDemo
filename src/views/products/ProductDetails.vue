<template>
    <dialog ref="editDialog">
        <form @submit.prevent="submitEdit">
            <h4>Modifier l'article</h4>
            <div class="uk-margin">
                <label for="title">Titre:</label>
                <input class="uk-input" id="title" v-model="editForm.title" required />
            </div>
            <div class="uk-margin">
                <label for="author">Auteur:</label>
                <input class="uk-input" id="author" v-model="editForm.author" required />
            </div>
            <div class="uk-margin">
                <label for="desc">Description:</label>
                <textarea class="uk-input" id="desc" v-model="editForm.desc" required></textarea>
            </div>
            <div class="uk-margin">
                <label for="imgPath">Image URL:</label>
                <input class="uk-input" id="imgPath" v-model="editForm.imgPath" />
            </div>
            <div class="uk-margin">
                <button type="submit" class="uk-button uk-button-primary">Enregistrer</button>
                <button type="button" class="uk-button uk-button-default" @click="closeEditDialog">Annuler</button>
            </div>
        </form>
    </dialog>
    <dialog ref="messageDialog">
        <div>
            {{ message }}
        </div>
        <div>
            <button type="button" class="uk-button uk-button-default" @click="closeMessageDialog">Ok</button>
        </div>
    </dialog>
    <div class="page-two">
        <h4>Détails</h4>
        <div v-if="product" class="uk-width-1-3@m">
            <div class="uk-card uk-card-default uk-card-hover uk-card-body">
                <img :src="product.imgPath" alt="Image du produit" />
                <h3>{{ product.title }}</h3>
                <p>Auteur: {{ product.author }}</p>
                <p>Description: {{ product.desc }}</p>
                <div>
                    <button class="uk-button uk-button-primary" @click="$router.push('/articles')">Retour à la liste</button>
                    <button class="uk-button uk-button-default" @click="openEditDialog">Modifier</button>
                    <button class="uk-button uk-button-danger" @click="deleteProduct">Supprimer</button>
                </div>
            </div>
        </div>
        <div v-else>
            <div uk-spinner></div>
            <p>Loading product details...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageTwo',
    data() {
        return {
            message: '',
            product: null,
            editForm: {
                id: null,
                title: '',
                author: '',
                desc: '',
                imgPath: ''
            },

        };
    },

    mounted() {
        this.getDetails();
    },

    methods: {
        async getDetails() {
            const id = this.$route.params.id;
            console.log('Recuperation des details ID:', id);
            try {
                const res = await fetch(`http://127.0.0.1:3000/articles/${id}`);
                const jsonResponse = await res.json();
                this.product = jsonResponse.data;
                console.log('Product details:', this.product);
            } catch (error) {
                console.error('Error fetching product details:', error);
                this.product = null;
            }
        },

        openEditDialog() {
            this.editForm = { ...this.product };
            this.$refs.editDialog.showModal();
        },

        closeEditDialog() {
            this.$refs.editDialog.close();
        },

        openMessageDialog(msg) {
            this.message = msg;
            this.$refs.messageDialog.showModal();
        },

        closeMessageDialog() {
            this.$refs.messageDialog.close();
        },

        async submitEdit() {
            try {
                const res = await fetch(`http://127.0.0.1:3000/articles/save`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.editForm)
                });
                const jsonResponse = await res.json();
                if (jsonResponse.code === "200") {
                    this.openMessageDialog('Article mis à jour avec succès.');
                    this.product = { ...this.editForm };
                    this.closeEditDialog();
                } else {
                    this.openMessageDialog('Erreur lors de la mise à jour de l\'article.');
                }
            } catch (error) {
                console.error('Error updating product:', error);
                this.openMessageDialog('Erreur lors de la mise à jour de l\'article.');
            }
        },

        async deleteProduct() {
            const id = this.$route.params.id;
            if (confirm('Voulez-vous vraiment supprimer cette article ?')) {
                try {
                    const res = await fetch(`http://127.0.0.1:3000/articles/${id}`, {
                        method: 'DELETE',
                    });
                    const jsonResponse = await res.json();
                    if (jsonResponse.code === "200") {
                        this.openMessageDialog(jsonResponse.message || 'Article supprimé avec succès.');
                        this.$router.push('/articles');
                    } else {
                        this.openMessageDialog(jsonResponse.message || 'Erreur lors de la suppression de l\'article.');
                    }
                } catch (error) {
                    console.error('Erreur lors de la suppression de l\'article.', error);
                    this.openMessageDialog('Erreur lors de la suppression de l\'article.');
                }
            }
        }
    },
}
</script>

<style scoped>
.page-two {
    padding: 2rem;
    text-align: center;
}
</style>