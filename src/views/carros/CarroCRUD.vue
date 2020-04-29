<template>
    <v-data-table
        :headers="headers"
        :items="carros"
        class="elevation-1"
    >
        <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Carros</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            >
            </v-divider>    
            <div class="flex-grow-1"></div>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Novo Carro</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="carro.Modelo" label="Modelo"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="carro.Marca" label="Marca"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="carro.Cor" label="Cor"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field type="number" v-model.number="carro.Ano" label="Ano"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field type="number" v-model.number="carro.Valor" label="Valor (R$)"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" text @click="close()">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="salvarCarro()">Salvar</v-btn>
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
            @keyup="pesquisarCarro()"
        ></v-text-field>
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
            @click="deletarCarro(item)"
        >
            mdi-delete
        </v-icon>
        </template>
        <template v-slot:no-data>
        <v-btn color="primary" @click="carregarCarros()">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
import api from '../../services/api'
export default {
    data: () => ({
        dialog: false,
        headers: [
            { text: 'Modelo', value: 'Modelo' },
            { text: 'Marca', value: 'Marca' },
            { text: 'Cor', value: 'Cor' },
            { text: 'Ano', value: 'Ano' },
            { text: 'Valor (R$)', value: 'Valor' },
            { text: 'Actions', value: 'action', sortable: false },
        ],
        carros: [],
        carro: {Marca: null, Modelo: null, Cor: null, Ano: 0, Valor: 0},
        carroDefault: {Marca: null, Modelo: null, Cor: null, Ano: 0, Valor: 0},
        carroIndex: -1,
        search: ''
    }),
    computed: {
        formTitle () {
            return this.carroIndex === -1 ? 'Novo Carro' : 'Editar Carro'
        },
    },
    created () {
        this.carregarCarros()
    },
    methods: {
        carregarCarros(){
            api(`api/carros/GetCarros`)
            .then(res => {
                this.carros = res.data
            })
            .catch(err => {
                alert(err)
            })
        },
        salvarCarro() {
            if (this.carroIndex > -1) {
                api.put(`api/carros/${this.carro.id}`,this.carro)
                .then(() => {
                    this.carregarCarros()
                    this.close()
                })
                .catch(err => {
                    alert(err)
                })
            }else {
                api.post(`api/carros`,this.carro)
                .then(() => {
                    this.carregarCarros()
                    this.close()
                })
                .catch(err => {
                    alert(err)
                })
            }
        },
        deletarCarro(item) {
            api.delete(`api/carros/${item.id}`)
            .then(() => {
                this.carregarCarros()
            })
            .catch(err => {
                alert(err)
            })
        },
        pesquisarCarro() {
            if(this.search){
                api(`api/carros/GetCarrosByModelo?modelo=${this.search}`)
                .then(res => {
                    this.carros = res.data
                })
                .catch(err => {
                    alert(err)
                })
            } else this.carregarCarros()
        },
        editItem(item) {
            this.carroIndex = this.carros.indexOf(item)
            this.carro = Object.assign({}, item)
            this.dialog = true
        },
        close() {
            this.dialog = false
            this.carro = Object.assign({}, this.carroDefault)
            this.carroIndex = -1
        },
        
    },
}
</script>