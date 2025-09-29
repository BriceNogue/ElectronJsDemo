<template>
    <div>
        <ul uk-tab>
            <li class="uk-active">
                <router-link to="/">Page One</router-link>
            </li>
            <li>
                <router-link to="/page-two">Page Two</router-link>
            </li>
        </ul>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>