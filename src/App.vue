<template>
    <v-app id="inspire">
        <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        >
            <v-list dense>
                <v-list-item @click="navegarParaHome()">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="navegarParaCarros()">
                    <v-list-item-action>
                        <v-icon>mdi-car</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Carros</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="navegarParaLivros()">
                    <v-list-item-action>
                        <v-icon>mdi-book-open-page-variant</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Livros</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
        app
        clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>I Hackaton Ceres</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <Conteudo />
        </v-content>

        <v-footer app>
            <span>I Hackaton Ceres &copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
import Conteudo from './components/Conteudo.vue'
export default {
    components: { Conteudo },
    props: {
        source: String,
    },
    data: () => ({
        drawer: null,
    }),
    created () {
        this.$vuetify.theme.dark = true
    },
    methods: {
        navegarParaHome(){
            this.$router.push({path: '/'})
        },
        navegarParaCarros(){
            this.$router.push({path: '/carros'})
        },
        navegarParaLivros(){
            this.$router.push({path: '/livros'})
        }
    }
}
</script>