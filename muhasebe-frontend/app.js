// Import modules
import { MenuManager } from './js/modules/MenuManager.js';
import { ToolbarManager } from './js/modules/ToolbarManager.js';
import { ButtonManager } from './js/modules/ButtonManager.js';
import { AccessibilityManager } from './js/modules/AccessibilityManager.js';
import { ReportManager } from './js/modules/ReportManager.js';

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

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
    const toolbarManager = new ToolbarManager();
    new ButtonManager();
    new AccessibilityManager();
    const reportManager = new ReportManager();

    // Make managers globally accessible
    window.toolbarManager = toolbarManager;
    window.reportManager = reportManager;

    // Initialize sidebar functionality for the main page
    toolbarManager.initSidebar();

    // Initialize modal functionality
    initModalFunctionality();
    
    // Initialize support functionality
    initSupportFunctionality();
    
    // Initialize floating help assistant
    initFloatingHelpAssistant();

    // No default active menu - let users choose what they want to access
});

// Modal functionality
function initModalFunctionality() {
    const modal = document.getElementById('cikisModal');
    const cikisBtn = document.getElementById('cikisBtn');
    const modalClose = document.getElementById('modalClose');
    const kaydetmedenCik = document.getElementById('kaydetmedenCik');
    const kaydetVeCik = document.getElementById('kaydetVeCik');
    const iptalCikis = document.getElementById('iptalCikis');

    // Show modal when çıkış button is clicked
    cikisBtn.addEventListener('click', () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close modal when X button is clicked
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal when Escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Handle "Kaydetmeden Çık" button
    kaydetmedenCik.addEventListener('click', () => {
        console.log('Kaydetmeden çıkılıyor...');
        // Here you would typically show a confirmation or just close the app
        alert('Kaydedilmemiş değişiklikler kaybolacak. Çıkış yapılıyor...');
        closeModal();
        // You can add actual logout logic here
    });

    // Handle "Kaydet ve Çık" button
    kaydetVeCik.addEventListener('click', () => {
        console.log('Değişiklikler kaydediliyor ve çıkış yapılıyor...');
        // Here you would typically save all changes first
        alert('Değişiklikler kaydediliyor...');
        setTimeout(() => {
            alert('Değişiklikler kaydedildi. Çıkış yapılıyor...');
            closeModal();
            // You can add actual logout logic here
        }, 1000);
    });

    // Handle "İptal" button
    iptalCikis.addEventListener('click', closeModal);
}

// Support functionality
function initSupportFunctionality() {
    // Acil Destek Modal
    const acilDestekModal = document.getElementById('acilDestekModal');
    const acilDestekBtn = document.getElementById('acilDestekBtn');
    const acilDestekClose = document.getElementById('acilDestekClose');
    const callBtns = document.querySelectorAll('.call-btn');

    // Show Acil Destek modal
    acilDestekBtn.addEventListener('click', () => {
        acilDestekModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Close Acil Destek modal
    acilDestekClose.addEventListener('click', () => {
        acilDestekModal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    acilDestekModal.addEventListener('click', (e) => {
        if (e.target === acilDestekModal) {
            acilDestekModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Handle call buttons
    callBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const contactCard = btn.closest('.contact-card');
            const phoneNumber = contactCard.querySelector('.contact-phone span').textContent;
            const contactName = contactCard.querySelector('h4').textContent;
            
            alert(`${contactName} aranıyor: ${phoneNumber}`);
            // Here you would typically initiate a phone call
        });
    });

    // Chat Bot Modal
    const chatBotModal = document.getElementById('chatBotModal');
    const chatBotBtn = document.getElementById('chatBotBtn');
    const chatBotClose = document.getElementById('chatBotClose');
    const chatBotExpand = document.getElementById('chatBotExpand');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const fileInput = document.getElementById('fileInput');
    const quickQuestions = document.querySelectorAll('.quick-question');

    // Show Chat Bot modal
    chatBotBtn.addEventListener('click', () => {
        chatBotModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        chatInput.focus();
    });

    // Close Chat Bot modal
    chatBotClose.addEventListener('click', () => {
        chatBotModal.classList.remove('show');
        document.body.style.overflow = '';
        // Reset fullscreen and show floating assistant
        const modalContent = chatBotModal.querySelector('.modal-content');
        modalContent.classList.remove('fullscreen');
        const icon = chatBotExpand.querySelector('i');
        icon.className = 'fa-solid fa-expand';
        floatingHelpAssistant.style.display = 'flex';
    });

    // Close modal when clicking outside
    chatBotModal.addEventListener('click', (e) => {
        if (e.target === chatBotModal) {
            chatBotModal.classList.remove('show');
            document.body.style.overflow = '';
            // Reset fullscreen and show floating assistant
            const modalContent = chatBotModal.querySelector('.modal-content');
            modalContent.classList.remove('fullscreen');
            const icon = chatBotExpand.querySelector('i');
            icon.className = 'fa-solid fa-expand';
            floatingHelpAssistant.style.display = 'flex';
        }
    });

    // Handle expand/collapse for modal chat bot
    chatBotExpand.addEventListener('click', () => {
        const modalContent = chatBotModal.querySelector('.modal-content');
        modalContent.classList.toggle('fullscreen');
        const icon = chatBotExpand.querySelector('i');
        if (modalContent.classList.contains('fullscreen')) {
            icon.className = 'fa-solid fa-compress';
            // Hide floating assistant when modal is fullscreen
            floatingHelpAssistant.style.display = 'none';
        } else {
            icon.className = 'fa-solid fa-expand';
            // Show floating assistant when modal is not fullscreen
            floatingHelpAssistant.style.display = 'flex';
        }
    });

    // Handle quick questions
    quickQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            addUserMessage(question);
            setTimeout(() => {
                addBotResponse(getBotResponse(question));
            }, 500);
        });
    });

    // Handle send message
    sendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Handle file upload
    fileInput.addEventListener('change', handleFileUpload);

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatInput.value = '';
            setTimeout(() => {
                addBotResponse(getBotResponse(message));
            }, 500);
        }
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotResponse(response) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="muhasebeci.png" alt="Muhasebe Asistanı" class="message-robot-icon">
            </div>
            <div class="message-content">
                <p>${response}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Global function for scrolling to bottom
    window.scrollToBottom = function() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('puantaj') || lowerMessage.includes('hesapla')) {
            return 'Puantaj hesaplaması için şu adımları takip edin:\n1. Puantaj modülüne gidin\n2. Personel seçin\n3. Ay ve yıl belirleyin\n4. Günlük çalışma saatlerini girin\n5. Sistem otomatik hesaplayacaktır.';
        } else if (lowerMessage.includes('e-fatura') || lowerMessage.includes('fatura')) {
            return 'E-Fatura göndermek için:\n1. E-Fatura modülüne gidin\n2. "Gönderme İşlemi" sekmesini seçin\n3. Fatura bilgilerini doldurun\n4. "Gönder" butonuna tıklayın.';
        } else if (lowerMessage.includes('çek') || lowerMessage.includes('cek')) {
            return 'Çek işlemleri için:\n1. Çekler modülüne gidin\n2. Gelen/Giden çekleri seçin\n3. Çek bilgilerini girin\n4. Vade tarihlerini belirleyin.';
        } else if (lowerMessage.includes('rapor') || lowerMessage.includes('rapor al')) {
            return 'Rapor almak için:\n1. Raporlar menüsüne gidin\n2. İstediğiniz rapor türünü seçin\n3. Tarih aralığını belirleyin\n4. "Rapor Al" butonuna tıklayın.';
        } else if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam')) {
            return 'Merhaba! Size nasıl yardımcı olabilirim? Puantaj, E-Fatura, Çek işlemleri veya raporlar hakkında soru sorabilirsiniz.';
        } else {
            return 'Bu konuda size yardımcı olmak için teknik destek ekibimizle iletişime geçmenizi öneririm. Acil Destek butonunu kullanabilirsiniz.';
        }
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            window.addFileMessage(file, chatMessages);
            // Reset file input
            event.target.value = '';
        }
    }

    // Global function for floating file upload
    window.handleFloatingFileUpload = function(event) {
        const file = event.target.files[0];
        if (file) {
            window.addFileMessage(file, floatingChatMessages);
            // Reset file input
            event.target.value = '';
        }
    }

    // Global function for adding file messages
    window.addFileMessage = function(file, messagesContainer) {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'message user-message';
        
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg'].includes(fileExtension);
        const isPdf = fileExtension === 'pdf';
        
        let fileIcon, fileType;
        if (isPdf) {
            fileIcon = 'fa-solid fa-file-pdf';
            fileType = 'pdf';
        } else if (isImage) {
            fileIcon = 'fa-solid fa-file-image';
            fileType = 'image';
        } else {
            fileIcon = 'fa-solid fa-file';
            fileType = 'document';
        }

        const fileSize = window.formatFileSize(file.size);
        
        fileDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="message-content">
                <div class="file-message">
                    <div class="file-icon ${fileType}">
                        <i class="${fileIcon}"></i>
                    </div>
                    <div class="file-info">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${fileSize}</div>
                    </div>
                    <div class="file-actions">
                        <button class="file-action-btn" onclick="downloadFile('${file.name}', '${fileSize}')">
                            <i class="fa-solid fa-download"></i> İndir
                        </button>
                        <button class="file-action-btn" onclick="viewFile('${file.name}')">
                            <i class="fa-solid fa-eye"></i> Görüntüle
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(fileDiv);
        window.scrollToBottom();
    }

    // Global function for formatting file size
    window.formatFileSize = function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Global functions for file actions
    window.downloadFile = function(fileName, fileSize) {
        alert(`Dosya indiriliyor: ${fileName} (${fileSize})`);
        // Here you would implement actual file download logic
    };

    window.viewFile = function(fileName) {
        alert(`Dosya görüntüleniyor: ${fileName}`);
        // Here you would implement actual file viewing logic
    };
}

// Floating Help Assistant functionality
function initFloatingHelpAssistant() {
    const floatingHelpAssistant = document.getElementById('floatingHelpAssistant');
    const floatingChatBot = document.getElementById('floatingChatBot');
    const floatingChatClose = document.getElementById('floatingChatClose');
    const floatingChatExpand = document.getElementById('floatingChatExpand');
    const floatingChatMessages = document.getElementById('floatingChatMessages');
    const floatingChatInput = document.getElementById('floatingChatInput');
    const floatingSendMessage = document.getElementById('floatingSendMessage');
    const floatingFileInput = document.getElementById('floatingFileInput');
    const floatingQuickQuestions = floatingChatBot.querySelectorAll('.quick-question');

    // Show floating chat bot when help assistant is clicked
    floatingHelpAssistant.addEventListener('click', () => {
        floatingHelpAssistant.style.display = 'none'; // Hide the button
        floatingChatBot.classList.add('show'); // Show the chat bot
        floatingChatInput.focus();
    });

    // Close floating chat bot
    floatingChatClose.addEventListener('click', () => {
        floatingChatBot.classList.remove('show'); // Hide the chat bot
        floatingChatBot.classList.remove('fullscreen'); // Exit fullscreen
        floatingHelpAssistant.style.display = 'flex'; // Show the button again
        // Reset expand icon
        const icon = floatingChatExpand.querySelector('i');
        icon.className = 'fa-solid fa-expand';
    });

    // Handle expand/collapse for floating chat bot
    floatingChatExpand.addEventListener('click', () => {
        floatingChatBot.classList.toggle('fullscreen');
        const icon = floatingChatExpand.querySelector('i');
        if (floatingChatBot.classList.contains('fullscreen')) {
            icon.className = 'fa-solid fa-compress';
            // Hide floating assistant when floating chat is fullscreen
            floatingHelpAssistant.style.display = 'none';
        } else {
            icon.className = 'fa-solid fa-expand';
            // Show floating assistant when floating chat is not fullscreen
            floatingHelpAssistant.style.display = 'flex';
        }
    });

    // Handle quick questions in floating chat
    floatingQuickQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            addFloatingUserMessage(question);
            setTimeout(() => {
                addFloatingBotResponse(getBotResponse(question));
            }, 500);
        });
    });

    // Handle send message in floating chat
    floatingSendMessage.addEventListener('click', sendFloatingChatMessage);
    floatingChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendFloatingChatMessage();
        }
    });

    // Handle file upload in floating chat
    floatingFileInput.addEventListener('change', handleFloatingFileUpload);

    function sendFloatingChatMessage() {
        const message = floatingChatInput.value.trim();
        if (message) {
            addFloatingUserMessage(message);
            floatingChatInput.value = '';
            setTimeout(() => {
                addFloatingBotResponse(getBotResponse(message));
            }, 500);
        }
    }

    function addFloatingUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        floatingChatMessages.appendChild(messageDiv);
        scrollFloatingToBottom();
    }

    function addFloatingBotResponse(response) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="muhasebeci.png" alt="Muhasebe Asistanı" class="message-robot-icon">
            </div>
            <div class="message-content">
                <p>${response}</p>
            </div>
        `;
        floatingChatMessages.appendChild(messageDiv);
        scrollFloatingToBottom();
    }

    function scrollFloatingToBottom() {
        floatingChatMessages.scrollTop = floatingChatMessages.scrollHeight;
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
