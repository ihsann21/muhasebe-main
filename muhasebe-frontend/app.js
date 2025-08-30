// Menu and Dropdown Management
class MenuManager {
    constructor() {
        this.megaDropdown = document.querySelector('.mega-dropdown');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.submenus = document.querySelectorAll('.submenu');
        this.closeTimeout = null;
        this.isMobile = window.innerWidth < 1024;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.setupMobileHandling();
    }

    setupEventListeners() {
        // Desktop hover events
        this.menuItems.forEach(item => {
            const menuType = item.dataset.menu;
            
            if (this.isMobile) {
                // Mobile: click to toggle
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSubmenu(menuType);
                });
            } else {
                // Desktop: hover to show, delay to hide
                item.addEventListener('mouseenter', () => {
                    this.showSubmenu(menuType);
                });

                item.addEventListener('focusin', () => {
                    this.showSubmenu(menuType);
                });

                item.addEventListener('mouseleave', (e) => {
                    // İmleç dropdown'a geçiyorsa kapatma
                    const relatedTarget = e.relatedTarget;
                    if (relatedTarget && relatedTarget.closest('.mega-dropdown')) {
                        return;
                    }
                    this.scheduleClose();
                });

                item.addEventListener('focusout', (e) => {
                    // Check if focus is moving to another menu item
                    const relatedTarget = e.relatedTarget;
                    if (!relatedTarget || !relatedTarget.closest('.main-menu')) {
                        this.scheduleClose();
                    }
                });
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-menu') && !e.target.closest('.mega-dropdown')) {
                this.closeDropdown();
            }
        });

        // Keep dropdown open when hovering over it
        this.megaDropdown.addEventListener('mouseenter', () => {
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null;
            }
        });

        this.megaDropdown.addEventListener('mouseleave', () => {
            this.scheduleClose();
        });

        // Close dropdown when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth < 1024;
            
            if (wasMobile !== this.isMobile) {
                this.closeDropdown();
                this.setupEventListeners();
            }
        });
    }

    showSubmenu(menuType) {
        // Clear any pending close
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = null;
        }

        // Close all submenus first
        this.submenus.forEach(submenu => {
            submenu.classList.remove('active');
        });

        // Show the target submenu
        const targetSubmenu = document.getElementById(`submenu-${menuType}`);
        if (targetSubmenu) {
            targetSubmenu.classList.add('active');
            this.megaDropdown.setAttribute('data-open', 'true');
        }

        // Update active menu item
        this.menuItems.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-expanded', 'false');
        });

        const activeMenuItem = document.querySelector(`[data-menu="${menuType}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
            activeMenuItem.setAttribute('aria-expanded', 'true');
        }
    }

    toggleSubmenu(menuType) {
        const targetSubmenu = document.getElementById(`submenu-${menuType}`);
        const isCurrentlyOpen = targetSubmenu.classList.contains('active');
        
        if (isCurrentlyOpen) {
            this.closeDropdown();
        } else {
            this.showSubmenu(menuType);
        }
    }

    scheduleClose() {
        this.closeTimeout = setTimeout(() => {
            this.closeDropdown();
        }, 200);
    }

    closeDropdown() {
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = null;
        }

        this.megaDropdown.setAttribute('data-open', 'false');
        this.submenus.forEach(submenu => {
            submenu.classList.remove('active');
        });

        this.menuItems.forEach(item => {
            item.setAttribute('aria-expanded', 'false');
        });
    }

    setupKeyboardNavigation() {
        // Tab navigation for menu items
        this.menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        const menuType = item.dataset.menu;
                        if (this.isMobile) {
                            this.toggleSubmenu(menuType);
                        } else {
                            this.showSubmenu(menuType);
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        const nextItem = this.menuItems[index + 1] || this.menuItems[0];
                        nextItem.focus();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        const prevItem = this.menuItems[index - 1] || this.menuItems[this.menuItems.length - 1];
                        prevItem.focus();
                        break;
                }
            });
        });

        // Keyboard navigation for submenu items
        this.submenus.forEach(submenu => {
            const submenuItems = submenu.querySelectorAll('.submenu-item');
            submenuItems.forEach((item, index) => {
                item.addEventListener('keydown', (e) => {
                    switch (e.key) {
                        case 'Enter':
                        case ' ':
                            e.preventDefault();
                            // Handle submenu item click
                            console.log('Submenu item clicked:', item.querySelector('h3').textContent);
                            break;
                        case 'ArrowRight':
                            e.preventDefault();
                            const nextSubItem = submenuItems[index + 1] || submenuItems[0];
                            nextSubItem.focus();
                            break;
                        case 'ArrowLeft':
                            e.preventDefault();
                            const prevSubItem = submenuItems[index - 1] || submenuItems[submenuItems.length - 1];
                            prevSubItem.focus();
                            break;
                        case 'Escape':
                            e.preventDefault();
                            this.closeDropdown();
                            // Focus back to the parent menu item
                            const menuType = submenu.id.replace('submenu-', '');
                            const parentMenuItem = document.querySelector(`[data-menu="${menuType}"]`);
                            if (parentMenuItem) {
                                parentMenuItem.focus();
                            }
                            break;
                    }
                });
            });
        });
    }

    setupMobileHandling() {
        // Prevent body scroll when dropdown is open on mobile
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-open') {
                    const isOpen = this.megaDropdown.getAttribute('data-open') === 'true';
                    if (this.isMobile && isOpen) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        observer.observe(this.megaDropdown, {
            attributes: true,
            attributeFilter: ['data-open']
        });
    }
}

// Toolbar Management
class ToolbarManager {
    constructor() {
        this.toolbarItems = document.querySelectorAll('.toolbar-item');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.toolbarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const label = item.querySelector('span').textContent;
                console.log('Toolbar item clicked:', label);
                // Handle toolbar item click
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });
    }
}

// Button Management
class ButtonManager {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const text = button.textContent.trim();
                console.log('Button clicked:', text);
                // Handle button click
            });

            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }
}

// Log Card Management
class LogCardManager {
    constructor() {
        this.logCards = document.querySelectorAll('.log-card');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.logCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const title = card.querySelector('h3').textContent;
                console.log('Log card clicked:', title);
                // Handle log card click
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });

            // Make cards focusable
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
        });
    }
}

// Accessibility Enhancements
class AccessibilityManager {
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

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
    new ToolbarManager();
    new ButtonManager();
    new LogCardManager();
    new AccessibilityManager();

    // Set initial active state for "Hareketler" menu
    const hareketlerMenu = document.querySelector('[data-menu="hareketler"]');
    if (hareketlerMenu) {
        hareketlerMenu.classList.add('active');
        hareketlerMenu.setAttribute('aria-expanded', 'true');
    }
});

// Utility functions
function announceToScreenReader(message) {
    const liveRegion = document.querySelector('[aria-live="polite"]');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// Handle window focus events for better UX
window.addEventListener('focus', () => {
    // Ensure proper focus management when window regains focus
    const activeElement = document.activeElement;
    if (!activeElement || !document.contains(activeElement)) {
        document.body.focus();
    }
});
