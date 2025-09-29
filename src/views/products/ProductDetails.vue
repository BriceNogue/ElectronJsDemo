<template>
    <div class="page-two">
        <h4>Détails</h4>
        <div v-if="product">
            <img :src="product.imgPath" alt="Image du produit" />
            <h3>{{ product.title }}</h3>
            <p>Auteur: {{ product.author }}</p>
            <p>Description: {{ product.desc }}</p>
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