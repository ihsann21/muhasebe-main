// Toolbar Management - Main Controller
import { HareketlerModule } from './pages/HareketlerModule.js';
import { TaseronModule } from './pages/TaseronModule.js';
import { TedarikciModule } from './pages/TedarikciModule.js';
import { CeklerModule } from './pages/CeklerModule.js';
import { EvrakModule } from './pages/EvrakModule.js';
import { EFaturaModule } from './pages/EFaturaModule.js';
import { RaporlarModule } from './pages/RaporlarModule.js';
import { YapSatModule } from './pages/YapSatModule.js';
import { IlerlemeModule } from './pages/IlerlemeModule.js';
import { PuantajModule } from './pages/PuantajModule.js';
import { AraclarModule } from './pages/AraclarModule.js';
import { UzaktanYardimModule } from './pages/UzaktanYardimModule.js';
import { PersonelModule } from './pages/PersonelModule.js';
import { MaasModule } from './pages/MaasModule.js';
import { SantiyeProjeModule } from './pages/SantiyeProjeModule.js';
import { KasaBankaModule } from './pages/KasaBankaModule.js';
import { TeklifModule } from './pages/TeklifModule.js';
import { MesajlarModule } from './pages/MesajlarModule.js';
import { AcilDestekModule } from './pages/AcilDestekModule.js';
import { ChatBotModule } from './pages/ChatBotModule.js';
import { KullaniciYonetimiModule } from './pages/KullaniciYonetimiModule.js';
import { ProgramAyarlariModule } from './pages/ProgramAyarlariModule.js';
import { FirmaBilgileriModule } from './pages/FirmaBilgileriModule.js';

export class ToolbarManager {
    constructor() {
        this.toolbarItems = document.querySelectorAll('.toolbar-item');
        this.modules = {};
        this.init();
    }

    init() {
        this.initializeModules();
        this.setupEventListeners();
        this.showDefaultPage();
    }

    initializeModules() {
        // Initialize all page modules
        this.modules.hareketler = new HareketlerModule();
        this.modules.taseron = new TaseronModule();
        this.modules.tedarikci = new TedarikciModule();
        this.modules.cekler = new CeklerModule();
        this.modules.evrak = new EvrakModule();
        this.modules.efatura = new EFaturaModule();
        this.modules.raporlar = new RaporlarModule();
        this.modules.yapsat = new YapSatModule();
        this.modules.ilerleme = new IlerlemeModule();
        this.modules.puantaj = new PuantajModule();
        this.modules.araclar = new AraclarModule();
        this.modules.uzaktanYardim = new UzaktanYardimModule();
        this.modules.personel = new PersonelModule();
        this.modules.maas = new MaasModule();
        this.modules.santiyeProje = new SantiyeProjeModule();
        this.modules.kasaBanka = new KasaBankaModule();
        this.modules.teklif = new TeklifModule();
        this.modules.mesajlar = new MesajlarModule();
        this.modules.acilDestek = new AcilDestekModule();
        this.modules.chatBot = new ChatBotModule();
        this.modules.kullaniciYonetimi = new KullaniciYonetimiModule();
        this.modules.programAyarlari = new ProgramAyarlariModule();
        this.modules.firmaBilgileri = new FirmaBilgileriModule();
        
        console.log('ToolbarManager modules initialized:', Object.keys(this.modules));
    }

    initSidebar() {
        // Sidebar functionality - placeholder for now
        console.log('Sidebar initialized');
    }

    showDefaultPage() {
        // Show Şantiye & Proje page by default on startup
        setTimeout(() => {
            if (this.modules.santiyeProje) {
                this.modules.santiyeProje.show();
            }
        }, 100);
    }

    hideWelcomeScreen() {
        // Hide welcome screen within module container
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
    }

    setupEventListeners() {
        this.toolbarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Close report page if open
                if (window.reportManager) {
                    window.reportManager.hideReportPage();
                }

                const label = item.querySelector('span').textContent;
                console.log('Toolbar item clicked:', label);
                
                // Handle specific toolbar item clicks
                this.handleToolbarClick(label);
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });

        // Setup main menu event listeners (for top navigation)
        this.setupMainMenuEventListeners();
    }

    handleToolbarClick(label) {
        switch (label) {
            case 'Taşeron':
                this.modules.taseron.show();
                break;
            case 'Tedarikçi':
                this.modules.tedarikci.show();
                break;
            case 'Puantaj':
                this.modules.puantaj.show();
                break;
            case 'Çekler':
                console.log('Çekler button clicked!');
                this.modules.cekler.show();
                break;
            case 'İlerleme':
                console.log('İlerleme button clicked!');
                this.modules.ilerleme.show();
                break;
            case 'YapSat':
                console.log('YapSat button clicked!');
                this.modules.yapsat.show();
                break;
            case 'Evrak':
                console.log('Evrak button clicked!');
                this.modules.evrak.show();
                break;
            case 'E-Fatura':
                console.log('E-Fatura button clicked!');
                this.modules.efatura.show();
                break;
            case 'Araçlar':
                console.log('Araçlar button clicked!');
                this.modules.araclar.show();
                break;
            case 'Uzaktan Yardım':
                console.log('Uzaktan Yardım button clicked!');
                this.modules.uzaktanYardim.show();
                break;
            case 'Personel':
                console.log('Personel button clicked!');
                this.modules.personel.show();
                break;
            case 'Maaş':
                console.log('Maaş button clicked!');
                this.modules.maas.show();
                break;
            case 'Şantiye & Proje':
                console.log('Şantiye & Proje button clicked!');
                this.modules.santiyeProje.show();
                break;
            case 'Kasa/Banka':
                console.log('Kasa/Banka button clicked!');
                this.modules.kasaBanka.show();
                break;
            case 'Teklif':
                console.log('Teklif button clicked!');
                this.modules.teklif.show();
                break;
            case 'Raporlar':
                console.log('Raporlar button clicked!');
                this.modules.raporlar.show();
                break;
            default:
                console.log('Unknown toolbar item:', label);
        }
    }

    setupMainMenuEventListeners() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const menuType = item.getAttribute('data-menu');
                const label = item.querySelector('span').textContent;
                console.log('Main menu item clicked:', label, 'Menu type:', menuType);
                
                // Handle different menu types
                switch (menuType) {
                    case 'hareketler':
                        this.modules.hareketler.show();
                        break;
                    case 'tanimlar':
                        this.showTanimlarModule();
                        break;
                    case 'raporlar':
                        this.modules.raporlar.show();
                        break;
                    case 'yardim':
                        this.showYardimModule();
                        break;
                    case 'mesajlar':
                        this.showMesajlarModule();
                        break;
                    case 'bilgiler':
                        this.showBilgilerModule();
                        break;
                    default:
                        console.log('Unknown menu type:', menuType);
                }
            });
        });
    }

    // Legacy methods for compatibility - these will be removed gradually
    showTanimlarModule() {
        console.log('Tanımlar module not implemented yet');
    }

    showYardimModule() {
        console.log('Yardım module not implemented yet');
    }

    showMesajlarModule() {
        console.log('Mesajlar module not implemented yet');
    }

    showBilgilerModule() {
        console.log('Bilgiler module not implemented yet');
    }

    // Utility methods
    showStatusMessage(message, type = 'info') {
        // Create notification container if it doesn't exist
        let notificationContainer = document.getElementById('notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
                z-index: 10000;
                max-width: 400px;
            `;
            document.body.appendChild(notificationContainer);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.textContent = message;
        notificationContainer.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        }
}
