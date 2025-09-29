<template>
    <div>
        <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-left">
                <a class="uk-navbar-item uk-logo" href="#">
                    TP ElectronJS
                </a>
            </div>
            <div class="uk-navbar-center">
                <ul uk-tab>
                    <li class="uk-active">
                        <router-link to="/articles">Articles</router-link>
                    </li>
                    <li>
                        <!-- <router-link to="/">Page Two</router-link> -->
                    </li>
                </ul>
            </div>
            <div class="uk-navbar-right">
                <div class="uk-navbar-item">
                    <router-link to="/">Se déconnecter</router-link>
                </div>
            </div>
        </nav>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>