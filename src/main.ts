import { setupApp } from './app';
import { setupHome } from './home';

// Keep previously shared index.html?id=… links working.
if (new URLSearchParams(window.location.search).has('id')) setupApp();
else setupHome();
