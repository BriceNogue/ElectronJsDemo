<template>
    <div class="page-one">
        <!-- <h1>{{ message }}</h1> -->
        <h4>Liste des articles</h4>
        <div uk-grid uk-height-match="target: > div > .uk-card">
            <div class="uk-width-1-3@m" v-for="article in articles" :key="article.id">
                <div class="uk-card uk-card-default uk-card-hover uk-card-body">
                    <h3 class="uk-card-title">{{ article.title }}</h3>
                    <p>{{ article.author }}</p>
                    <button class="uk-button uk-button-primary" @click="goToDetails(article.id)">Détails</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageOne',

    data() {
        return {
            message: 'Liste des articles',
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