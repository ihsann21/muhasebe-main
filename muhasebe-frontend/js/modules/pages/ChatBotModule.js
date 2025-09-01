// Chat Bot Module
export class ChatBotModule {
    constructor() {
        this.name = 'Muhasebe Chat Bot';
        this.messages = [];
        this.quickQuestions = [
            'Puantaj nasıl hesaplanır?',
            'E-Fatura nasıl gönderilir?',
            'Çek işlemleri nasıl yapılır?',
            'Rapor nasıl alınır?'
        ];
    }

    show() {
        // Modal HTML'ini oluştur
        const modalHtml = `
            <div class="chatbot-modal-overlay" id="chatBotModal">
                <div class="chatbot-modal-content">
                    <div class="chatbot-header">
                        <div class="chatbot-title">
                            <div class="chatbot-avatar">
                                <i class="fa-solid fa-robot"></i>
                            </div>
                            <span>Muhasebe Chat Bot</span>
                        </div>
                        <div class="chatbot-controls">
                            <button class="chatbot-expand" onclick="window.chatBotModule.toggleExpand()">
                                <i class="fa-solid fa-expand"></i>
                            </button>
                            <button class="chatbot-close" onclick="window.chatBotModule.close()">
                                <i class="fa-solid fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="chatbot-body">
                        <div class="chatbot-messages" id="chatBotMessages">
                            <div class="bot-message">
                                <div class="message-avatar">
                                    <i class="fa-solid fa-robot"></i>
                                </div>
                                <div class="message-content">
                                    <p>Merhaba! Ben Muhasebe Asistanınız. Size nasıl yardımcı olabilirim?</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="quick-questions">
                            ${this.quickQuestions.map(question => `
                                <button class="quick-question-btn" onclick="window.chatBotModule.selectQuestion('${question}')">
                                    ${question}
                                </button>
                            `).join('')}
                        </div>
                        
                        <div class="chatbot-input-container">
                            <button class="file-attach-btn" title="Dosya Ekle">
                                <i class="fa-solid fa-paperclip"></i>
                            </button>
                            <input type="text" placeholder="Sorunuzu yazın..." class="chatbot-input" id="chatBotInput">
                            <button class="send-btn" onclick="window.chatBotModule.sendMessage()">
                                <i class="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Mevcut modalı kaldır (varsa)
        const existingModal = document.getElementById('chatBotModal');
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
            const modal = document.getElementById('chatBotModal');
            modal.classList.add('show');
        });

        // Global referans
        window.chatBotModule = this;
    }

    close() {
        const modal = document.getElementById('chatBotModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    }

    toggleExpand() {
        const modal = document.getElementById('chatBotModal');
        const content = modal.querySelector('.chatbot-modal-content');
        const expandBtn = modal.querySelector('.chatbot-expand i');
        
        if (content.classList.contains('fullscreen')) {
            content.classList.remove('fullscreen');
            expandBtn.className = 'fa-solid fa-expand';
        } else {
            content.classList.add('fullscreen');
            expandBtn.className = 'fa-solid fa-compress';
        }
    }

    selectQuestion(question) {
        this.addUserMessage(question);
        setTimeout(() => {
            this.addBotResponse(this.getBotResponse(question));
        }, 500);
    }

    sendMessage() {
        const input = document.getElementById('chatBotInput');
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            input.value = '';
            
            setTimeout(() => {
                this.addBotResponse(this.getBotResponse(message));
            }, 500);
        }
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatBotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-avatar">
                <i class="fa-solid fa-user"></i>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotResponse(response) {
        const messagesContainer = document.getElementById('chatBotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${response}</p>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('puantaj') || lowerMessage.includes('hesapla')) {
            return 'Puantaj hesaplaması için şu adımları takip edin:<br>1. Puantaj modülüne gidin<br>2. Personel seçin<br>3. Ay ve yıl belirleyin<br>4. Günlük çalışma saatlerini girin<br>5. Sistem otomatik hesaplayacaktır.';
        } else if (lowerMessage.includes('e-fatura') || lowerMessage.includes('fatura')) {
            return 'E-Fatura göndermek için:<br>1. E-Fatura modülüne gidin<br>2. "Gönderme İşlemi" sekmesini seçin<br>3. Fatura bilgilerini doldurun<br>4. "Gönder" butonuna tıklayın.';
        } else if (lowerMessage.includes('çek') || lowerMessage.includes('cek')) {
            return 'Çek işlemleri için:<br>1. Çekler modülüne gidin<br>2. Gelen/Giden çekleri seçin<br>3. Çek bilgilerini girin<br>4. Vade tarihlerini belirleyin.';
        } else if (lowerMessage.includes('rapor') || lowerMessage.includes('rapor al')) {
            return 'Rapor almak için:<br>1. Raporlar menüsüne gidin<br>2. İstediğiniz rapor türünü seçin<br>3. Tarih aralığını belirleyin<br>4. "Rapor Al" butonuna tıklayın.';
        } else if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam')) {
            return 'Merhaba! Size nasıl yardımcı olabilirim? Puantaj, E-Fatura, Çek işlemleri veya raporlar hakkında soru sorabilirsiniz.';
        } else {
            return 'Bu konuda size yardımcı olmak için teknik destek ekibimizle iletişime geçmenizi öneririm. Acil Destek butonunu kullanabilirsiniz.';
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatBotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    setupEventListeners() {
        // Modal dışına tıklandığında kapat
        const modal = document.getElementById('chatBotModal');
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

        // Enter tuşu ile mesaj gönder
        document.getElementById('chatBotInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    addStyles() {
        const existingStyles = document.getElementById('chatbot-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'chatbot-styles';
        style.textContent = `
            .chatbot-modal-overlay {
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

            .chatbot-modal-overlay.show {
                opacity: 1;
                visibility: visible;
            }

            .chatbot-modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 500px;
                height: 600px;
                display: flex;
                flex-direction: column;
                transform: translateY(-20px);
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }

            .chatbot-modal-content.fullscreen {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100vw;
                height: 100vh;
                max-width: 100vw;
                max-height: 100vh;
                border-radius: 0;
                z-index: 1001;
            }

            .chatbot-modal-overlay.show .chatbot-modal-content {
                transform: translateY(0);
            }

            .chatbot-header {
                background: #2e7d32;
                color: white;
                padding: 16px 20px;
                border-radius: 12px 12px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chatbot-modal-content.fullscreen .chatbot-header {
                border-radius: 0;
            }

            .chatbot-modal-content.fullscreen .chatbot-input-container {
                border-radius: 0;
            }

            .chatbot-title {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 16px;
                font-weight: 600;
            }

            .chatbot-avatar {
                width: 32px;
                height: 32px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .chatbot-controls {
                display: flex;
                gap: 8px;
            }

            .chatbot-expand,
            .chatbot-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                width: 32px;
                height: 32px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .chatbot-expand:hover,
            .chatbot-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .chatbot-body {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .chatbot-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .bot-message,
            .user-message {
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }

            .user-message {
                flex-direction: row-reverse;
            }

            .message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                font-size: 14px;
            }

            .bot-message .message-avatar {
                background: #2e7d32;
                color: white;
            }

            .user-message .message-avatar {
                background: #1976d2;
                color: white;
            }

            .message-content {
                background: #f8f9fa;
                padding: 12px 16px;
                border-radius: 12px;
                max-width: 70%;
                line-height: 1.4;
            }

            .user-message .message-content {
                background: #e3f2fd;
            }

            .message-content p {
                margin: 0;
                color: #1f2937;
            }

            .quick-questions {
                padding: 0 20px 16px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .quick-question-btn {
                background: #e8f5e8;
                border: 1px solid #c8e6c9;
                color: #2e7d32;
                padding: 10px 16px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                text-align: left;
                transition: all 0.2s;
            }

            .quick-question-btn:hover {
                background: #c8e6c9;
                border-color: #2e7d32;
            }

            .chatbot-input-container {
                padding: 16px 20px;
                border-top: 1px solid #e5e7eb;
                display: flex;
                align-items: center;
                gap: 12px;
                background: #f8f9fa;
                border-radius: 0 0 12px 12px;
            }

            .file-attach-btn {
                background: none;
                border: 1px solid #e5e7eb;
                color: #6b7280;
                width: 40px;
                height: 40px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .file-attach-btn:hover {
                border-color: #2e7d32;
                color: #2e7d32;
            }

            .chatbot-input {
                flex: 1;
                padding: 10px 16px;
                border: 1px solid #e5e7eb;
                border-radius: 20px;
                outline: none;
                font-size: 14px;
                background: white;
            }

            .chatbot-input:focus {
                border-color: #2e7d32;
            }

            .send-btn {
                background: #2e7d32;
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .send-btn:hover {
                background: #1b5e20;
            }

            /* Responsive */
            @media (max-width: 640px) {
                .chatbot-modal-content {
                    width: 95%;
                    height: 80vh;
                }

                .chatbot-modal-content.fullscreen {
                    width: 100vw;
                    height: 100vh;
                }

                .message-content {
                    max-width: 85%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
