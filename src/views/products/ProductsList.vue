<template>
    <div class="page-one">
        <template v-if="showAddDialog">
            <div class="uk-modal uk-open" style="display: block;">
                <div class="uk-modal-dialog uk-modal-body">
                    <h4 class="uk-modal-title">Ajouter un article</h4>
                    <form @submit.prevent="addArticle">
                        <div class="uk-margin">
                            <input class="uk-input" v-model="newArticle.title" placeholder="Titre" required>
                        </div>
                        <div class="uk-margin">
                            <textarea class="uk-input" v-model="newArticle.desc" placeholder="Description" required></textarea>
                        </div>
                        <div class="uk-margin">
                            <input class="uk-input" v-model="newArticle.author" placeholder="Auteur" required>
                        </div>
                        <div class="uk-margin">
                            <input class="uk-input" v-model="newArticle.imgPath" placeholder="Url de l'image">
                        </div>
                        <div class="uk-margin">
                            <button class="uk-button uk-button-primary" type="submit">Ajouter</button>
                            <button class="uk-button uk-button-default" type="button" @click="showAddDialog = false">Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="uk-modal-overlay" style="display: block;" @click="showAddDialog = false"></div>
        </template>

        <dialog ref="messageDialog">
            <div>
                {{ message }}
            </div>
            <div>
                <button type="button" class="uk-button uk-button-default" @click="closeMessageDialog">Ok</button>
            </div>
        </dialog>

        <!-- <h1>{{ message }}</h1> -->
        <div v-if="articles.length > 0">
            <div class="uk-flex uk-flex-between uk-margin-bottom">
                <h4>Liste des articles</h4>
                <button class="uk-button uk-button-success" @click="showAddDialog = true">
                    Ajouter un article
                </button>
            </div>
            <div class="uk-child-width-expand@s uk-text-center">
                <div uk-grid uk-height-match="target: > div > .uk-card" class="uk-grid-small uk-grid-match">
                    <div class="uk-width-1-3@m" v-for="article in articles" :key="article.id">
                        <div class="uk-card uk-card-default uk-card-hover uk-card-body">
                            <h3 class="uk-card-title">{{ article.title }}</h3>
                            <p>{{ article.author }}</p>
                            <button class="uk-button uk-button-primary" @click="goToDetails(article.id)">Détails</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="uk-text-center">Aucun article trouvé;</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageOne',

    data() {
        return {
            message: 'Liste des articles',
            showAddDialog: false,
            newArticle: { title: '', desc: '', imgPath: '', author: '' },
            articles: [],
        };
    },

    async mounted() {
        await this.callApi();
    },

    methods: {
        async callApi() {
            console.log('the component is now mounted.');
            try {
                const res = await fetch('http://127.0.0.1:3000/articles/');

                let jsonResponse = await res.json();

                this.articles = jsonResponse.data;

            console.log(this.movies); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async addArticle() {
            try {
                if(this.newArticle.imgPath.trim() === '') {
                    this.newArticle.imgPath = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
                }
                const res = await fetch('http://127.0.0.1:3000/articles/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newArticle)
                });
                const jsonResponse = await res.json();
                if (jsonResponse.code === "200") {
                    this.openMessageDialog('Article ajouté avec succès.');
                    this.showAddDialog = false;
                    this.newArticle = { title: '', desc: '', imgPath: '', author: '' };
                    await this.callApi();
                } else {
                    this.openMessageDialog('Erreur lors de l\'ajout de l\'article.');
                }
            } catch (error) {
                console.error('Error adding article:', error);
                this.openMessageDialog('Erreur lors de l\'ajout de l\'article.');
            }
        },

        openMessageDialog(msg) {
            this.message = msg;
            this.$refs.messageDialog.showModal();
        },

        closeMessageDialog() {
            this.$refs.messageDialog.close();
        },

        goToDetails(id) {
            this.$router.push(`/product-details/${id}`);
        }
    },
}
</script>

<style scoped>
.page-one {
    padding: 2rem;
    text-align: center;
}
</style>