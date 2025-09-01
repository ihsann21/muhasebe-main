// Acil Destek Module
export class AcilDestekModule {
    constructor() {
        this.name = 'Acil Destek';
        this.supportTeam = [
            {
                name: 'Ahmet Yılmaz',
                title: 'Teknik Destek Müdürü',
                phone: '+90 242 511 11 11',
                avatar: 'A'
            },
            {
                name: 'Mehmet Kaya',
                title: 'Muhasebe Uzmanı',
                phone: '+90 242 511 22 22',
                avatar: 'M'
            },
            {
                name: 'Fatma Demir',
                title: 'Sistem Uzmanı',
                phone: '+90 242 511 33 33',
                avatar: 'F'
            }
        ];
        this.emergencyNumber = '+90 532 400 00 00';
    }

    show() {
        // Modal HTML'ini oluştur
        const modalHtml = `
            <div class="modal-overlay" id="acilDestekModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2><i class="fa-solid fa-phone"></i> Acil Destek</h2>
                        <button class="modal-close" onclick="window.acilDestekModule.close()">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <p class="support-info">7/24 teknik destek ekibimizle iletişime geçin:</p>
                        
                        <div class="support-team">
                            ${this.supportTeam.map(member => `
                                <div class="contact-card">
                                    <div class="contact-avatar">
                                        <div class="avatar">${member.avatar}</div>
                                    </div>
                                    <div class="contact-info">
                                        <h4>${member.name}</h4>
                                        <p class="title">${member.title}</p>
                                        <p class="phone">
                                            <i class="fa-solid fa-phone"></i>
                                            <span>${member.phone}</span>
                                        </p>
                                    </div>
                                    <button class="btn btn-success call-btn" onclick="window.acilDestekModule.call('${member.phone}')">
                                        <i class="fa-solid fa-phone"></i>
                                        Ara
                                    </button>
                                </div>
                            `).join('')}
                        </div>

                        <div class="emergency-section">
                            <div class="emergency-header">
                                <i class="fa-solid fa-exclamation-triangle"></i>
                                Acil Durum
                            </div>
                            <p class="emergency-info">Kritik sistem sorunları için:</p>
                            <a href="tel:${this.emergencyNumber}" class="emergency-number">
                                <i class="fa-solid fa-phone"></i>
                                ${this.emergencyNumber}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Mevcut modalı kaldır (varsa)
        const existingModal = document.getElementById('acilDestekModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Yeni modalı ekle
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Stilleri ekle
        this.addStyles();

        // Event listener'ları ekle
        this.setupEventListeners();

        // Modalı göster
        requestAnimationFrame(() => {
            const modal = document.getElementById('acilDestekModal');
            modal.classList.add('show');
        });

        // Global referans
        window.acilDestekModule = this;
    }

    close() {
        const modal = document.getElementById('acilDestekModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    }

    call(phone) {
        window.location.href = `tel:${phone}`;
    }

    setupEventListeners() {
        // Modal dışına tıklandığında kapat
        const modal = document.getElementById('acilDestekModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });

        // ESC tuşuna basıldığında kapat
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    addStyles() {
        const existingStyles = document.getElementById('acil-destek-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'acil-destek-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }

            .modal-overlay.show {
                opacity: 1;
                visibility: visible;
            }

            .modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                transform: translateY(-20px);
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }

            .modal-overlay.show .modal-content {
                transform: translateY(0);
            }

            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .modal-header h2 {
                margin: 0;
                font-size: 20px;
                color: #1f2937;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .modal-close {
                background: none;
                border: none;
                color: #6b7280;
                cursor: pointer;
                width: 32px;
                height: 32px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .modal-close:hover {
                background: #f3f4f6;
                color: #ef4444;
            }

            .modal-body {
                padding: 20px;
            }

            .support-info {
                margin: 0 0 20px 0;
                color: #6b7280;
                font-size: 15px;
            }

            .support-team {
                display: flex;
                flex-direction: column;
                gap: 16px;
                margin-bottom: 24px;
            }

            .contact-card {
                display: flex;
                align-items: center;
                padding: 16px;
                background: #f8f9fa;
                border-radius: 12px;
                gap: 16px;
            }

            .contact-avatar {
                flex-shrink: 0;
            }

            .avatar {
                width: 48px;
                height: 48px;
                background: #2e7d32;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                font-weight: 600;
            }

            .contact-info {
                flex: 1;
                min-width: 0;
            }

            .contact-info h4 {
                margin: 0 0 4px 0;
                font-size: 16px;
                color: #1f2937;
            }

            .contact-info .title {
                margin: 0 0 4px 0;
                font-size: 14px;
                color: #6b7280;
            }

            .contact-info .phone {
                margin: 0;
                font-size: 14px;
                color: #2e7d32;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .call-btn {
                flex-shrink: 0;
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .emergency-section {
                background: #fef2f2;
                border: 1px solid #fee2e2;
                border-radius: 12px;
                padding: 16px;
                margin-top: 24px;
            }

            .emergency-header {
                color: #dc2626;
                font-weight: 600;
                font-size: 16px;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .emergency-info {
                margin: 0 0 8px 0;
                color: #991b1b;
                font-size: 14px;
            }

            .emergency-number {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #dc2626;
                font-size: 18px;
                font-weight: 600;
                text-decoration: none;
                padding: 8px 16px;
                background: #fee2e2;
                border-radius: 8px;
                width: fit-content;
            }

            .emergency-number:hover {
                background: #fecaca;
            }

            /* Responsive */
            @media (max-width: 640px) {
                .modal-content {
                    width: 95%;
                }

                .contact-card {
                    flex-direction: column;
                    text-align: center;
                }

                .contact-info .phone {
                    justify-content: center;
                }

                .call-btn {
                    width: 100%;
                    justify-content: center;
                }

                .emergency-number {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
