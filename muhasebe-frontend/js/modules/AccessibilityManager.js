// Accessibility Enhancements
export class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSkipLinks();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }

    setupSkipLinks() {
        // Add skip link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Ana içeriğe geç';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--green);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupFocusManagement() {
        // Ensure focus is managed properly when dropdowns open/close
        document.addEventListener('focusin', (e) => {
            const target = e.target;
            
            // If focus is inside a submenu, ensure the dropdown is open
            const submenu = target.closest('.submenu');
            if (submenu) {
                const menuType = submenu.id.replace('submenu-', '');
                const menuItem = document.querySelector(`[data-menu="${menuType}"]`);
                if (menuItem && !menuItem.classList.contains('active')) {
                    menuItem.classList.add('active');
                    menuItem.setAttribute('aria-expanded', 'true');
                }
            }
        });
    }

    setupScreenReaderSupport() {
        // Add ARIA labels and descriptions
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
        }

        // Add live regions for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(liveRegion);
    }
}
