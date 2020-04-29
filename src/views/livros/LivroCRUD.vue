<template>
    <v-data-table
        :headers="headers"
        :items="livros"
        class="elevation-1"
    >
        <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Livros</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            >
            </v-divider>    
            <div class="flex-grow-1"></div>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Novo Livro</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="livro.Titulo" label="Título"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="livro.Autor" label="Autor(a)"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="livro.Editora" label="Editora"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field type="number" v-model.number="livro.QntPaginas" label="Páginas"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field type="number" v-model.number="livro.Edicao" label="Edição"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-switch v-model="livro.LivroEmprestado" label="Livro está emprestado?"></v-switch>                               
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" text @click="close()">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="salvarLivro()">Salvar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="ml-4 mr-4"
            @keyup="pesquisarLivro()"
        ></v-text-field>
        </template>
        <template v-slot:item.livroEmprestado="{ item }">
            {{ item.LivroEmprestado ? 'Sim' : 'Não' }}
        </template>
        <template v-slot:item.action="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
            mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deletarLivro(item)"
        >
            mdi-delete
        </v-icon>
        </template>
        <template v-slot:no-data>
        <v-btn color="primary" @click="carregarLivros()">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
import api from '../../services/api'
export default {
    data: () => ({
        dialog: false,
        headers: [
            { text: 'Título', value: 'Titulo' },
            { text: 'Autor', value: 'Autor' },
            { text: 'Editora', value: 'Editora' },
            { text: 'Páginas', value: 'QntPaginas' },
            { text: 'Edição', value: 'Edicao' },
            { text: 'Livro Emprestado', value: 'livroEmprestado' },
            { text: 'Actions', value: 'action', sortable: false },
        ],
        livros: [],
        livro: {Titulo: null, Autor: null, Editora: null, QntPaginas: 0, Edicao: 0, LivroEmpresatado: false},
        livroDefault: {Titulo: null, Autor: null, Editora: null, QntPaginas: 0, Edicao: 0, LivroEmpresatado: false},
        livroIndex: -1,
        search: ''
    }),
    computed: {
        formTitle () {
            return this.livroIndex === -1 ? 'Novo Livro' : 'Editar Livro'
        },
    },
    created () {
        this.carregarLivros()
    },
    methods: {
        carregarLivros(){
            api(`api/livros/GetLivros`)
            .then(res => {
                this.livros = res.data
            })
            .catch(err => {
                alert(err)
            })
        },
        salvarLivro() {
            if (this.livroIndex > -1) {
                api.put(`api/livros/${this.livro.id}`,this.livro)
                .then(() => {
                    this.carregarLivros()
                    this.close()
                })
                .catch(err => {
                    alert(err)
                })
            }else {
                api.post(`api/livros`,this.livro)
                .then(() => {
                    this.carregarLivros()
                    this.close()
                })
                .catch(err => {
                    alert(err)
                })
            }
        },
        deletarLivro(item) {
            api.delete(`api/livros/${item.id}`)
            .then(() => {
                this.carregarLivros()
            })
            .catch(err => {
                alert(err)
            })
        },
        pesquisarLivro() {
            if(this.search){
                api(`api/livros/GetLivrosByTitulo?titulo=${this.search}`)
                .then(res => {
                    this.livros = res.data
                })
                .catch(err => {
                    alert(err)
                })
            } else this.carregarLivros()
        },
        editItem(item) {
            this.livroIndex = this.livros.indexOf(item)
            this.livro = Object.assign({}, item)
            this.dialog = true
        },
        close() {
            this.dialog = false
            this.livro = Object.assign({}, this.livroDefault)
            this.livroIndex = -1
        },
        
    },
}
</script>