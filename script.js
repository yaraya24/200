// Authentication Demo JavaScript

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.sessionStartTime = null;
        this.initializeEventListeners();
        this.checkExistingSession();
    }

    initializeEventListeners() {
        const signinForm = document.getElementById('signin-form');
        const signoutBtn = document.getElementById('signout-btn');

        signinForm.addEventListener('submit', (e) => this.handleSignin(e));
        signoutBtn.addEventListener('click', () => this.handleSignout());
    }

    checkExistingSession() {
        // Check if user is already signed in (using localStorage for demo)
        const storedUser = localStorage.getItem('currentUser');
        const storedSessionTime = localStorage.getItem('sessionStartTime');

        if (storedUser && storedSessionTime) {
            this.currentUser = storedUser;
            this.sessionStartTime = new Date(storedSessionTime);
            this.showDashboard();
        }
    }

    handleSignin(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Simple validation (in a real app, this would be server-side)
        if (!username || !password) {
            this.showMessage('Please enter both username and password.', 'error');
            return;
        }

        if (password.length < 3) {
            this.showMessage('Password must be at least 3 characters long.', 'error');
            return;
        }

        // Simulate authentication (in a real app, this would call an API)
        this.signin(username);
    }

    signin(username) {
        this.currentUser = username;
        this.sessionStartTime = new Date();

        // Store session info (in a real app, this would be handled by secure tokens)
        localStorage.setItem('currentUser', username);
        localStorage.setItem('sessionStartTime', this.sessionStartTime.toISOString());

        this.showMessage('Successfully signed in!', 'success');
        setTimeout(() => this.showDashboard(), 1000);
    }

    handleSignout() {
        // Clear session data
        this.currentUser = null;
        this.sessionStartTime = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionStartTime');

        this.showMessage('Successfully signed out!', 'info');
        setTimeout(() => this.showSigninForm(), 1000);
    }

    showDashboard() {
        const signinSection = document.getElementById('signin-section');
        const dashboardSection = document.getElementById('dashboard-section');
        const currentUserSpan = document.getElementById('current-user');
        const sessionTimeSpan = document.getElementById('session-time');

        // Update user info
        currentUserSpan.textContent = this.currentUser;
        sessionTimeSpan.textContent = this.formatDateTime(this.sessionStartTime);

        // Switch sections
        signinSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');

        // Clear any existing messages
        this.clearMessage();
    }

    showSigninForm() {
        const signinSection = document.getElementById('signin-section');
        const dashboardSection = document.getElementById('dashboard-section');
        const signinForm = document.getElementById('signin-form');

        // Reset form
        signinForm.reset();

        // Switch sections
        dashboardSection.classList.add('hidden');
        signinSection.classList.remove('hidden');

        // Clear any existing messages
        this.clearMessage();
    }

    showMessage(text, type = 'info') {
        const messageElement = document.getElementById('message');
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
    }

    clearMessage() {
        const messageElement = document.getElementById('message');
        messageElement.textContent = '';
        messageElement.className = 'message';
    }

    formatDateTime(date) {
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

// Initialize the authentication manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});

// Demo users for testing (in a real app, this would be handled server-side)
console.log('Demo Authentication System');
console.log('You can sign in with any username and password (minimum 3 characters)');
console.log('The signout functionality will clear your session and return you to the signin page.');