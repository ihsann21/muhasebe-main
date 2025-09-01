// Menu and Dropdown Management
export class MenuManager {
    constructor() {
        this.megaDropdown = document.querySelector('.mega-dropdown');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.submenus = document.querySelectorAll('.submenu');
        this.closeTimeout = null;
        this.autoCloseTimeout = null;
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
            
            // All devices: click to toggle (no hover)
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSubmenu(menuType);
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleSubmenu(menuType);
                }
            });

            // Pause timer when hovering over menu item
            item.addEventListener('mouseenter', () => {
                this.pauseAutoClose();
            });

            // Resume timer when leaving menu item
            item.addEventListener('mouseleave', () => {
                this.resumeAutoClose();
            });
        });

        // Add click event listeners to submenu items
        this.submenus.forEach(submenu => {
            const submenuItems = submenu.querySelectorAll('.submenu-item');
            submenuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const title = item.querySelector('h3').textContent;
                    this.handleSubmenuItemClick(title);
                });
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-menu') && !e.target.closest('.mega-dropdown')) {
                this.closeDropdown();
            }
        });

        // Close dropdown when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });

        // Pause timer when hovering over dropdown content
        this.megaDropdown.addEventListener('mouseenter', () => {
            this.pauseAutoClose();
        });

        // Resume timer when leaving dropdown content
        this.megaDropdown.addEventListener('mouseleave', () => {
            this.resumeAutoClose();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth < 1024;
            
            if (wasMobile !== this.isMobile) {
                this.closeDropdown();
            }
        });
    }

    toggleSubmenu(menuType) {
        const targetSubmenu = document.getElementById(`submenu-${menuType}`);
        const isCurrentlyOpen = targetSubmenu.classList.contains('active');
        
        // Close all submenus first
        this.submenus.forEach(submenu => {
            submenu.classList.remove('active');
        });

        // Remove active class from all menu items
        this.menuItems.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-expanded', 'false');
        });

        if (!isCurrentlyOpen) {
            // Show the target submenu
            if (targetSubmenu) {
                targetSubmenu.classList.add('active');
                this.megaDropdown.setAttribute('data-open', 'true');
            }

            // Update active menu item
            const activeMenuItem = document.querySelector(`[data-menu="${menuType}"]`);
            if (activeMenuItem) {
                activeMenuItem.classList.add('active');
                activeMenuItem.setAttribute('aria-expanded', 'true');
            }

            // Scroll to top to show the dropdown
            this.scrollToShowDropdown();

            // Auto-close after 5 seconds
            this.autoCloseTimeout = setTimeout(() => {
                this.closeDropdown();
            }, 5000);
        } else {
            // Close dropdown
            this.closeDropdown();
        }
    }

    closeDropdown() {
        // Clear the auto-close timeout if it exists
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
            this.autoCloseTimeout = null;
        }

        this.megaDropdown.setAttribute('data-open', 'false');
        this.submenus.forEach(submenu => {
            submenu.classList.remove('active');
        });

        this.menuItems.forEach(item => {
            item.setAttribute('aria-expanded', 'false');
        });
    }

    pauseAutoClose() {
        // Clear the current timer to pause it
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
            this.autoCloseTimeout = null;
        }
    }

    resumeAutoClose() {
        // Only resume if dropdown is open and no timer is currently running
        if (this.megaDropdown.getAttribute('data-open') === 'true' && !this.autoCloseTimeout) {
            this.autoCloseTimeout = setTimeout(() => {
                this.closeDropdown();
            }, 5000);
        }
    }

    scrollToShowDropdown() {
        // Get the mega dropdown element
        const megaDropdown = document.querySelector('.mega-dropdown');
        if (megaDropdown) {
            // Calculate the position to scroll to (top of the dropdown)
            const dropdownTop = megaDropdown.offsetTop;
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only scroll if the dropdown is not fully visible
            if (currentScrollTop > dropdownTop - 100) {
                // Smooth scroll to show the dropdown
                window.scrollTo({
                    top: Math.max(0, dropdownTop - 100),
                    behavior: 'smooth'
                });
            }
        }
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
                        this.toggleSubmenu(menuType);
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

    handleSubmenuItemClick(title) {
        console.log('Submenu item clicked:', title);
        
        // Close the dropdown
        this.closeDropdown();
        
        // Handle specific submenu items
        console.log('Submenu item clicked:', title);
    }
}
