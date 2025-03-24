<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const route = useRoute();
const book = ref<Book | null>(null);

const fetchBook = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/books/${route.params.id}`);

    book.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error);
  }
};

onMounted(fetchBook);
</script>

<template>
  <div v-if="book">
    <h1>{{ book.title }}</h1>
    <p><strong>Autor:</strong> {{ book.author }}</p>
    <p><strong>Descrição:</strong> {{ book.description }}</p>
  </div>
  <p v-else>Carregando detalhes do livro...</p>
</template>

<style scoped>
p {
  margin: 5px 0;
}
</style>
