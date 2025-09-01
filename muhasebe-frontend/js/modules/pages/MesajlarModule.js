// Mesajlar Module
export class MesajlarModule {
    constructor() {
        this.name = 'Mesajlar';
        this.currentChat = null;
        this.users = [
            { id: 'muhasebe_uzmani', name: 'Muhasebe Uzmanı', status: 'online', avatar: 'M', color: '#2e7d32' },
            { id: 'proje_yoneticisi', name: 'Proje Yöneticisi', status: 'online', avatar: 'P', color: '#1976d2' },
            { id: 'sistem_yoneticisi', name: 'Sistem Yöneticisi', status: 'online', avatar: 'S', color: '#7b1fa2' }
        ];
        this.messages = {};
        this.initializeMessages();
    }

    show() {
        this.hideWelcomeScreen();
        document.title = 'Mesajlar - İnşaat Muhasebe PRO - NOA YAZILIM';
        
        const moduleContainer = document.getElementById('moduleViewContainer');
        if (moduleContainer) {
            moduleContainer.innerHTML = `
                <div class="mesajlar-container">
                    <div class="mesajlar-sidebar">
                        <div class="mesajlar-header">
                            <h2>Mesajlar</h2>
                        </div>
                        
                        <div class="search-container">
                            <input type="text" placeholder="Kullanıcı veya grup ara..." class="search-input">
                        </div>
                        
                        <div class="users-list">
                            ${this.users.map(user => `
                                <div class="user-item" data-user-id="${user.id}" onclick="window.mesajlarModule.selectUser('${user.id}')">
                                    <div class="user-avatar" style="background-color: ${user.color}">
                                        ${user.avatar}
                                    </div>
                                    <div class="user-info">
                                        <div class="user-name">${user.name}</div>
                                        <div class="user-status">Dosya gönderildi</div>
                                    </div>
                                    <div class="user-status-indicator ${user.status}"></div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mesajlar-chat">
                        <div class="chat-header">
                            <div class="chat-user-info">
                                <div class="chat-user-avatar">M</div>
                                <div class="chat-user-details">
                                    <div class="chat-user-name">Muhasebe Uzmanı</div>
                                    <div class="chat-user-status">Çevrimiçi</div>
                                </div>
                            </div>
                            <div class="chat-actions">
                                <button class="btn-icon" title="Sil">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="chat-messages" id="chatMessages">
                            <!-- Mesajlar buraya yüklenecek -->
                        </div>
                        
                        <div class="chat-input-container">
                            <button class="btn-attachment" title="Dosya Ekle">
                                <i class="fa-solid fa-paperclip"></i>
                            </button>
                            <input type="text" placeholder="Bir mesaj yazın (Enter ile gönderin)" class="chat-input" id="chatInput">
                            <button class="btn-send" onclick="window.mesajlarModule.sendMessage()">
                                <i class="fa-solid fa-paper-plane"></i>
                                Gönder
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="mesajlar-footer">
                    <div class="footer-content">
                        <span id="currentDateTime">Sunucu Tarihi: Yükleniyor...</span>
                        <span>•</span>
                        <span>Lisans: DEMO İNŞAAT</span>
                        <span>•</span>
                        <span>Kullanıcı: Ana Kullanıcı</span>
                    </div>
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
        this.setupEventListeners();
        this.updateDateTime();
        this.selectUser('muhasebe_uzmani'); // Varsayılan olarak ilk kullanıcıyı seç
        
        // Her dakika tarih/saat güncelle
        setInterval(() => this.updateDateTime(), 60000);
        
        // Global referans
        window.mesajlarModule = this;
    }

    setupEventListeners() {
        // Enter tuşu ile mesaj gönderme
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Arama fonksiyonu
        document.querySelector('.search-input').addEventListener('input', (e) => {
            this.filterUsers(e.target.value);
        });
    }

    initializeMessages() {
        this.messages = {
            'muhasebe_uzmani': [
                {
                    id: 1,
                    sender: 'muhasebe_uzmani',
                    text: 'Merhaba! Yeni tedarikçi kayıtları hakkında konuşmak istiyorum.',
                    timestamp: new Date('2025-01-15T09:30:00'),
                    type: 'received'
                },
                {
                    id: 2,
                    sender: 'ana_kullanici',
                    text: 'Tabii, hangi tedarikçiler hakkında?',
                    timestamp: new Date('2025-01-15T09:32:00'),
                    type: 'sent'
                },
                {
                    id: 3,
                    sender: 'muhasebe_uzmani',
                    text: 'XYZ Malzeme Ltd. ve ABC İnşaat firmaları için belgeler eksik.',
                    timestamp: new Date('2025-01-15T09:35:00'),
                    type: 'received'
                }
            ],
            'proje_yoneticisi': [
                {
                    id: 1,
                    sender: 'proje_yoneticisi',
                    text: 'Bahçelievler projesinin bütçe revizyonu hazır.',
                    timestamp: new Date('2025-01-15T10:15:00'),
                    type: 'received'
                },
                {
                    id: 2,
                    sender: 'ana_kullanici',
                    text: 'Harika! Dosyayı paylaşabilir misin?',
                    timestamp: new Date('2025-01-15T10:17:00'),
                    type: 'sent'
                }
            ],
            'sistem_yoneticisi': [
                {
                    id: 1,
                    sender: 'sistem_yoneticisi',
                    text: 'Sistem bakımı bu akşam 22:00\'da başlayacak.',
                    timestamp: new Date('2025-01-15T14:20:00'),
                    type: 'received'
                },
                {
                    id: 2,
                    sender: 'ana_kullanici',
                    text: 'Anladım, ne kadar sürecek?',
                    timestamp: new Date('2025-01-15T14:22:00'),
                    type: 'sent'
                },
                {
                    id: 3,
                    sender: 'sistem_yoneticisi',
                    text: 'Yaklaşık 2 saat sürmesi bekleniyor.',
                    timestamp: new Date('2025-01-15T14:25:00'),
                    type: 'received'
                }
            ]
        };
    }

    selectUser(userId) {
        // Aktif kullanıcıyı güncelle
        document.querySelectorAll('.user-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-user-id="${userId}"]`).classList.add('active');

        // Seçili kullanıcı bilgilerini güncelle
        const user = this.users.find(u => u.id === userId);
        if (user) {
            this.currentChat = userId;
            
            // Chat header'ı güncelle
            document.querySelector('.chat-user-avatar').textContent = user.avatar;
            document.querySelector('.chat-user-avatar').style.backgroundColor = user.color;
            document.querySelector('.chat-user-name').textContent = user.name;
            document.querySelector('.chat-user-status').textContent = user.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı';
            
            // Mesajları yükle
            this.loadMessages(userId);
        }
    }

    loadMessages(userId) {
        const chatMessages = document.getElementById('chatMessages');
        const messages = this.messages[userId] || [];
        
        chatMessages.innerHTML = messages.map(message => {
            const time = message.timestamp.toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return `
                <div class="message ${message.type}">
                    <div class="message-content">
                        <div class="message-text">${message.text}</div>
                        <div class="message-time">${time}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const messageText = input.value.trim();
        
        if (messageText && this.currentChat) {
            // Mesajı ekle
            if (!this.messages[this.currentChat]) {
                this.messages[this.currentChat] = [];
            }
            
            const newMessage = {
                id: Date.now(),
                sender: 'ana_kullanici',
                text: messageText,
                timestamp: new Date(),
                type: 'sent'
            };
            
            this.messages[this.currentChat].push(newMessage);
            
            // Input'u temizle
            input.value = '';
            
            // Mesajları yeniden yükle
            this.loadMessages(this.currentChat);
            
            // Simüle edilmiş otomatik yanıt (5 saniye sonra)
            setTimeout(() => {
                this.simulateResponse();
            }, 5000);
        }
    }

    simulateResponse() {
        if (!this.currentChat) return;
        
        const responses = [
            'Anladım, konuyu inceleyeceğim.',
            'Teşekkürler, bilgi için.',
            'Tamam, gerekli işlemleri yapacağım.',
            'Bu konuda daha detaylı bilgi verebilir misin?',
            'Dosyaları kontrol ettim, her şey uygun görünüyor.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
            id: Date.now(),
            sender: this.currentChat,
            text: randomResponse,
            timestamp: new Date(),
            type: 'received'
        };
        
        this.messages[this.currentChat].push(responseMessage);
        this.loadMessages(this.currentChat);
    }

    filterUsers(searchTerm) {
        const userItems = document.querySelectorAll('.user-item');
        
        userItems.forEach(item => {
            const userName = item.querySelector('.user-name').textContent.toLowerCase();
            if (userName.includes(searchTerm.toLowerCase())) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Istanbul'
        };
        
        const dateTimeString = now.toLocaleString('tr-TR', options);
        const dateTimeElement = document.getElementById('currentDateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = `Sunucu Tarihi: ${dateTimeString}`;
        }
    }

    addStyles() {
        const existingStyles = document.getElementById('mesajlar-styles');
        if (existingStyles) existingStyles.remove();

        const style = document.createElement('style');
        style.id = 'mesajlar-styles';
        style.textContent = `
            .mesajlar-container {
                display: flex;
                height: calc(100vh - 200px);
                background: #f5f5f5;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .mesajlar-sidebar {
                width: 350px;
                background: white;
                border-right: 1px solid #e5e7eb;
                display: flex;
                flex-direction: column;
            }

            .mesajlar-header {
                padding: 20px;
                border-bottom: 1px solid #e5e7eb;
            }

            .mesajlar-header h2 {
                margin: 0;
                font-size: 20px;
                color: #1f2937;
            }

            .search-container {
                padding: 16px 20px;
                border-bottom: 1px solid #e5e7eb;
            }

            .search-input {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }

            .search-input:focus {
                border-color: #2e7d32;
            }

            .users-list {
                flex: 1;
                overflow-y: auto;
            }

            .user-item {
                display: flex;
                align-items: center;
                padding: 12px 20px;
                cursor: pointer;
                transition: background-color 0.2s;
                position: relative;
            }

            .user-item:hover {
                background-color: #f8f9fa;
            }

            .user-item.active {
                background-color: #e8f5e8;
                border-right: 3px solid #2e7d32;
            }

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                margin-right: 12px;
            }

            .user-info {
                flex: 1;
                min-width: 0;
            }

            .user-name {
                font-weight: 500;
                color: #1f2937;
                margin-bottom: 2px;
            }

            .user-status {
                font-size: 12px;
                color: #6b7280;
            }

            .user-status-indicator {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-left: 8px;
            }

            .user-status-indicator.online {
                background-color: #10b981;
            }

            .user-status-indicator.offline {
                background-color: #6b7280;
            }

            .mesajlar-chat {
                flex: 1;
                display: flex;
                flex-direction: column;
                background: white;
            }

            .chat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                border-bottom: 1px solid #e5e7eb;
                background: white;
            }

            .chat-user-info {
                display: flex;
                align-items: center;
            }

            .chat-user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #2e7d32;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                margin-right: 12px;
            }

            .chat-user-name {
                font-weight: 500;
                color: #1f2937;
                margin-bottom: 2px;
            }

            .chat-user-status {
                font-size: 12px;
                color: #10b981;
            }

            .chat-actions .btn-icon {
                width: 36px;
                height: 36px;
                border: none;
                background: none;
                color: #6b7280;
                cursor: pointer;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .chat-actions .btn-icon:hover {
                background-color: #f3f4f6;
                color: #ef4444;
            }

            .chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8f9fa;
            }

            .message {
                margin-bottom: 16px;
                display: flex;
            }

            .message.sent {
                justify-content: flex-end;
            }

            .message.received {
                justify-content: flex-start;
            }

            .message-content {
                max-width: 70%;
                background: white;
                padding: 12px 16px;
                border-radius: 12px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }

            .message.sent .message-content {
                background: #2e7d32;
                color: white;
            }

            .message-text {
                margin-bottom: 4px;
                line-height: 1.4;
            }

            .message-time {
                font-size: 11px;
                opacity: 0.7;
            }

            .chat-input-container {
                display: flex;
                align-items: center;
                padding: 16px 20px;
                border-top: 1px solid #e5e7eb;
                background: white;
                gap: 12px;
            }

            .btn-attachment {
                width: 40px;
                height: 40px;
                border: 1px solid #e5e7eb;
                background: white;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #6b7280;
                transition: all 0.2s;
            }

            .btn-attachment:hover {
                border-color: #2e7d32;
                color: #2e7d32;
            }

            .chat-input {
                flex: 1;
                padding: 10px 16px;
                border: 1px solid #e5e7eb;
                border-radius: 20px;
                outline: none;
                font-size: 14px;
                transition: border-color 0.2s;
            }

            .chat-input:focus {
                border-color: #2e7d32;
            }

            .btn-send {
                background: #2e7d32;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: background-color 0.2s;
            }

            .btn-send:hover {
                background: #1b5e20;
            }

            .mesajlar-footer {
                background: #f8f9fa;
                border-top: 1px solid #e5e7eb;
                padding: 12px 0;
                margin-top: 20px;
            }

            .footer-content {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 16px;
                font-size: 12px;
                color: #6b7280;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .mesajlar-container {
                    height: calc(100vh - 150px);
                }
                
                .mesajlar-sidebar {
                    width: 300px;
                }
                
                .message-content {
                    max-width: 85%;
                }
                
                .chat-input-container {
                    padding: 12px 16px;
                }
            }

            @media (max-width: 640px) {
                .mesajlar-sidebar {
                    width: 250px;
                }
                
                .chat-header {
                    padding: 12px 16px;
                }
                
                .chat-user-name {
                    font-size: 14px;
                }
                
                .message-content {
                    max-width: 90%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
