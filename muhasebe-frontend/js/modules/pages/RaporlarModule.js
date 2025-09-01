// Raporlar Module
export class RaporlarModule {
    constructor() {
        this.name = 'Raporlar';
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Raporlar - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="empty-content">
                </div>
            `;
            
            this.initFunctionality();
        }
    }

    hideWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    initFunctionality() {
        this.addStyles();
    }

    addStyles() {
        const existingStyles = document.getElementById('raporlar-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'raporlar-styles';
        style.textContent = `
            .empty-content {
                width: 100%;
                height: calc(100vh - 200px);
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
    }
}
