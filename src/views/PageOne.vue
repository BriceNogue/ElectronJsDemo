<template>
    <div class="page-one">
        <h1>{{ message }}</h1>
        <button class="uk-button uk-button-primary" @click="callApi">Call API</button>
        <div uk-grid uk-height-match="target: > div > .uk-card">
            <div class="uk-width-1-3@m" v-for="movie in movies" :key="movie.id">
                <div class="uk-card uk-card-default uk-card-hover uk-card-body">
                    <h3 class="uk-card-title">{{ movie.title }}</h3>
                    <p>{{ movie.description }}</p>
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
            message: 'Hello from Page One!',
            movies: [],
        };
    },

    async mounted() {
        await this.callApi();
    },

    methods: {
        async callApi() {
            console.log('the component is now mounted.');
            const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');

            this.movies = await res.json();

            console.log(this.movies);
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