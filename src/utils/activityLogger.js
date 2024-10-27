// src/utils/activityLogger.js

function getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
    };
  }

async function getUserIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (response.ok) {
        const data = await response.json();
        return data.ip;
      }
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
    return 'Unknown';
  }

export async function logActivity(eventType, eventData = {}) {
    const ipAddress = await getUserIP();
    const deviceInfo = getDeviceInfo();
    const activity = {
      eventType, // e.g., 'PAGE_VIEW', 'PRODUCT_VIEW', 'ADD_TO_CART'
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem('userId') || 'anonymous', // Adjust based on your auth system
      sessionId: localStorage.getItem('sessionId') || generateSessionId(),
      ipAddress,
      deviceInfo,
      ...eventData,
    };
  
    // Send the activity to the backend
    sendActivityToBackend(activity);
  }
  
  function generateSessionId() {
    const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('sessionId', sessionId);
    return sessionId;
  }
  
  async function sendActivityToBackend(activity) {
    try {
      const response = await fetch('https://your-api-endpoint.amazonaws.com/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication tokens if required
        },
        body: JSON.stringify(activity),
      });
  
      if (!response.ok) {
        console.error('Failed to log activity:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending activity to backend:', error);
    }
  }
  